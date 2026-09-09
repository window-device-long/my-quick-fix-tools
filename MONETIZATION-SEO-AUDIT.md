# JSNify monetization & SEO audit

## Changes applied in this revision

- Unified public brand references to **JSNify** and default production URL to `https://jsnify.online`.
- Added `metadataBase`, Open Graph, Twitter metadata, crawler directives, and consistent site description.
- Added `src/app/robots.ts` with sitemap/host declarations and 404 exclusions.
- Rebuilt `sitemap.ts`:
  - removed `/404` from the sitemap;
  - included all six active locales for core pages;
  - added localized alternate URLs;
  - limited keyword-cluster sitemap exposure to EN/VI because those cluster definitions only contain original EN/VI copy.
- Added canonical + hreflang alternates to the six primary tool pages.
- Fixed JSON-LD generation in `SeoToolLanding`:
  - valid absolute page URL;
  - separate `SoftwareApplication`, `FAQPage`, and `BreadcrumbList` nodes;
  - free Offer metadata.
- Replaced the stale Create Next App root page with a redirect fallback.
- Replaced catch-all redirect-to-404 behavior with Next.js `notFound()` so missing URLs return a real 404 response.
- Added a route-level `not-found.tsx` and explicitly noindexed the legacy localized `/404` page.

## Highest priority before adding more tools

1. Deploy this revision and verify `/robots.txt`, `/sitemap.xml`, primary canonicals, and real 404 status codes.
2. In Google Search Console, resubmit `https://jsnify.online/sitemap.xml` and inspect the six primary tool URLs.
3. Do not publish dozens of keyword-variant landing pages until each one contains materially different, human-reviewed content and a clear path to the real tool.
4. Keep the interactive tool above the fold. Publisher content must remain the focal point; avoid ad units immediately beside Copy/Download/Execute buttons.
5. Start monetization with Auto Ads or a very small number of manually placed units. Optimize after traffic data exists rather than maximizing ad density at launch.

## Recommended revenue roadmap

### Phase 1: prove search demand
Focus on the six working tools already in production. Measure impressions, queries, CTR, country, and tool usage. Prioritize EN and JA pages after the current technical cleanup, but only publish localized pages after proofreading their visible copy.

### Phase 2: expand by adjacent intent
Add tools that share the same user intent and can be implemented fully client-side:
- JSON Formatter / Minifier
- JSON Diff
- JSON to TypeScript
- JSON to YAML
- Base64 Encoder / Decoder
- JWT Decoder (decode only; clearly state it does not verify trust by itself)
- UUID Generator
- Unix Timestamp Converter

Each new tool should have one canonical utility URL, a unique explanation, examples, edge cases, and internal links to 2–4 adjacent tools.

### Phase 3: monetize beyond display ads
Once a tool has repeat usage or meaningful organic traffic, test:
- sponsorship/affiliate links relevant to developer hosting, API, database, observability, or SaaS workflows;
- a lightweight ad-free supporter plan only if repeat users justify it;
- optional saved presets/history stored locally before introducing accounts or a backend.

## Important code/content follow-ups

- The keyword cluster generator currently creates many pages from keyword variants. Keep these out of non-EN/VI sitemaps until original translations exist; consider consolidating near-duplicate variants into stronger guide pages.
- Several localized dictionary strings appear machine-translated or partially untranslated (for example some Japanese content contains Vietnamese text). Review JA before pushing it as a growth market.
- The current AdSense publisher ID and GA ID remain unchanged from the uploaded source. Confirm both belong to the intended production accounts.
- `ads.txt` is present and contains the same AdSense publisher ID used by the page script.

## Verification note

A clean dependency install/build could not be completed in the sandbox because `npm ci` exceeded the environment transport timeout. The modified files were checked statically, but run the following locally before deployment:

```bash
npm ci
npm run lint
npm run build
```
