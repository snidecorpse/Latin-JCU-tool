import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (name) => readFile(join(root, name), "utf8");

test("the install manifest describes the complete Book I course and all icons exist", async () => {
  const manifest = JSON.parse(await read("manifest.webmanifest"));
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "./");
  assert.equal(manifest.scope, "./");
  assert.match(manifest.name, /Book I Study/);
  assert.match(manifest.description, /Vocabulary 1–10/);
  assert.ok(manifest.icons.length >= 2);
  for (const icon of manifest.icons) {
    const info = await stat(join(root, icon.src));
    assert.ok(info.size > 0, `${icon.src} should not be empty`);
  }
});

test("HTML loads the static app and contains no phone-hosting instructions", async () => {
  const html = await read("index.html");
  assert.match(html, /rel="manifest" href="manifest\.webmanifest"/);
  assert.match(html, /rel="stylesheet" href="styles\.css"/);
  assert.match(html, /type="module" src="app\.js"/);
  assert.match(html, /data-action="sound-settings"/);
  assert.match(html, /Book I · Ch\. I–X/);
  assert.match(html, /id="feedback-live"[^>]*role="status"[^>]*aria-live="assertive"/);
  assert.doesNotMatch(html, /use on your phone|phone-help|install app|local ip|zip/i);
});

test("the application exposes both study modes and the requested practice controls", async () => {
  const [app, vocabulary] = await Promise.all([read("app.js"), read("vocab-data.js")]);
  const interfaceText = `${app}\n${vocabulary}`;
  for (const text of [
    "Vocabulary",
    "Book Exercises",
    "Latin → English",
    "English → Latin",
    "Multiple choice",
    "I don’t know",
    "Got it",
    "Review again",
    "Review missed items"
  ]) assert.match(interfaceText, new RegExp(text));

  assert.match(app, /latin-study-state-v4/);
  assert.match(app, /latin-vocab-state-v3/);
  assert.match(app, /selection:\s*\{[\s\S]*vocabulary:[\s\S]*exercises:/);
  assert.match(app, /VOCAB_ROUND_SIZE = 10/);
  assert.match(app, /EXERCISE_ROUND_SIZE = 8/);
  assert.match(app, /completedBase < session\.totalBase/);
  assert.match(app, /session\.unresolved\.size/);
  assert.match(app, /retryQueue/);
  assert.match(app, /gap: 2/);
  assert.match(app, /entry\.gap <= 0/);
  assert.match(app, /firstTryResult/);
  assert.match(app, /answerMode: "typed"/);
  assert.match(app, /data-action="select-answer-mode"/);
  assert.match(app, /data-action="mcq-answer"/);
  assert.match(app, /createMultipleChoiceOptions/);
  assert.match(app, /role="tab"[\s\S]*aria-controls="mode-panel-vocabulary"/);
  assert.match(app, /role="tabpanel"[\s\S]*aria-labelledby="mode-tab-vocabulary"/);
  assert.match(app, /role="tabpanel"[\s\S]*aria-labelledby="mode-tab-exercises"/);
  assert.match(app, /lang="\$\{spec\.promptLanguage === "latin" \? "la" : "en"\}"/);
  assert.match(app, /announceFeedback/);
});

test("audio policy resumes effects, supports two speeds, and gates prompt autoplay to Latin", async () => {
  const app = await read("app.js");
  assert.match(app, /this\.context\.state !== "running"/);
  assert.match(app, /await this\.context\.resume\(\)/);
  assert.match(app, /startsWith\("la"\)/);
  assert.match(app, /startsWith\("it"\)/);
  assert.match(app, /data-speed="normal"/);
  assert.match(app, /data-speed="slow"/);
  assert.match(app, /spec\.promptLanguage === "latin" && spec\.promptAudio/);
  assert.match(app, /promptLanguage === "english" \? item\.audioText : ""/);
  assert.match(app, /await audio\.unlock\(\);\s*nextQuestion\(\)/);
  assert.doesNotMatch(app, /beforeinstallprompt/);
});

test("the v4 worker caches every module, cleans only Latin Sprint caches, and handles only same-origin GET", async () => {
  const worker = await read("sw.js");
  for (const filename of [
    "index.html",
    "styles.css",
    "app.js",
    "vocab-data.js",
    "exercise-data.js",
    "exercise-data-1-5.js",
    "exercise-data-6-10.js",
    "manifest.webmanifest",
    "assets/icon.svg",
    "assets/apple-touch-icon.png"
  ]) assert.match(worker, new RegExp(filename.replaceAll(".", "\\.")));

  assert.match(worker, /CACHE_PREFIX = "latin-sprint-"/);
  assert.match(worker, /`\$\{CACHE_PREFIX\}v4`/);
  assert.match(worker, /key\.startsWith\(CACHE_PREFIX\)/);
  assert.match(worker, /event\.request\.method !== "GET"/);
  assert.match(worker, /requestUrl\.origin !== self\.location\.origin/);
  assert.match(worker, /caches\.match/);
  assert.doesNotMatch(worker, /filter\(\(key\) => key !== CACHE\)/);
});

test("Vercel configuration is zero-build, has no SPA rewrite, and sets deployment headers", async () => {
  const config = JSON.parse(await read("vercel.json"));
  assert.equal(config.framework, null);
  assert.equal(config.rewrites, undefined);
  const serialized = JSON.stringify(config);
  assert.match(serialized, /sw\.js/);
  assert.match(serialized, /max-age=0, must-revalidate/);
  assert.match(serialized, /application\/manifest\+json/);
  assert.match(serialized, /X-Content-Type-Options/);
  assert.match(serialized, /Referrer-Policy/);
  assert.match(serialized, /Permissions-Policy/);

  const ignored = await read(".vercelignore");
  for (const entry of ["tests/", "README.md", "latin-sprint-site.zip", "*.pdf"]) {
    assert.match(ignored, new RegExp(entry.replaceAll(".", "\\.").replaceAll("*", ".*")));
  }
});

test("README is limited to development, tests, and Vercel deployment", async () => {
  const readme = await read("README.md");
  assert.match(readme, /Local development/);
  assert.match(readme, /npm test/);
  assert.match(readme, /Vercel/);
  assert.doesNotMatch(readme, /phone|wi-?fi|\[::\]|zip|add to home|install on/i);
});

test("responsive and accessibility styles include safe areas, reduced motion, and no retired phone steps", async () => {
  const css = await read("styles.css");
  assert.match(css, /env\(safe-area-inset-bottom/);
  assert.match(css, /\.sticky-launch\s*\{/);
  assert.match(css, /@media \(max-width: 390px\)/);
  assert.match(css, /@media \(max-width: 330px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.sr-only\s*\{/);
  assert.match(css, /--muted: #58665b/);
  assert.match(css, /--green: #358700/);
  assert.match(css, /\.chapter-strip button\s*\{[\s\S]*?min-height: 44px/);
  assert.match(css, /\.mcq-choice\s*\{[\s\S]*?min-height: 72px/);
  assert.match(css, /\.mcq-grid\s*\{[\s\S]*?grid-template-columns: 1fr 1fr/);
  assert.doesNotMatch(css, /\.phone-steps/);
});
