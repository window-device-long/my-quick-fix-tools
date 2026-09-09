# JSNify production checklist

Validated in this revision:
- No Git merge-conflict markers remain.
- ESLint passes.
- TypeScript `tsc --noEmit` passes.
- Core smoke tests pass for SQL formatting, CSV quoted/multiline parsing, CSS minification, and MD5 known vectors.
- Unfinished SEO cluster generator/routes were removed from production source and sitemap.
- Next.js 16 uses `proxy.ts` and Turbopack root is pinned to the project directory.
- Railway start command uses `$PORT` with a 3000 fallback.

Before deploy on your machine:
```bash
rm -rf .next
npm install
npm run lint
npx tsc --noEmit
npm run build
```

Do not run `npm audit fix --force` before reviewing the audit report because it can introduce breaking dependency upgrades.
