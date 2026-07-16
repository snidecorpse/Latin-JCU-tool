# Latin Sprint

Latin Sprint is a zero-build Book I Latin study site. PERONAL USE ONLY

## Local development

From this folder, run:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Tests

```bash
npm test
npm run check
```

## Vercel

Import this directory as a Vercel project or run `vercel` from the project root. There is no build command or output-directory setting. `vercel.json` supplies the service-worker, manifest, and security headers required by the static deployment.
