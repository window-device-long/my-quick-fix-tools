# JSNify programmatic SEO

## URL model

Landing pages live under:

`/{locale}/tools/{tool}/{intent}`

There are 18 intent pages for each of the six tools and six supported locales:

- 18 intents × 6 locales = 108 localized URLs per tool
- 108 × 6 tools = 648 generated landing-page URLs

Each landing page embeds the working browser tool on the page and includes its own canonical, hreflang set, metadata, FAQ schema, WebApplication schema, breadcrumb schema, contextual copy, and related intent links.

## Indexing rollout

The default is intentionally conservative:

`PROGRAMMATIC_SEO_MODE=pilot`

Pilot mode indexes the first six high-intent landing pages for every tool across all six locales. The remaining generated routes return `robots: noindex, follow` and are excluded from the sitemap.

After reviewing Search Console data and page quality, Railway can be configured with:

`PROGRAMMATIC_SEO_MODE=all`

This enables indexing and sitemap inclusion for all 648 landing pages. Do not enable `all` merely to increase page count. Review translations, query impressions, engagement, and duplicate-intent risk first.

## Why the gate exists

Google's spam policies treat large amounts of low-value pages created mainly to manipulate rankings as scaled content abuse, and substantially similar pages created to rank for similar queries can be treated as doorway abuse. The landing architecture therefore keeps the real interactive tool on every page and supports staged indexing rather than publishing every generated URL to Search immediately.
