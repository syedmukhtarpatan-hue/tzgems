# TZ GEMS approved-wireframe rebuild

## Review scope

This rebuild implements the approved white/navy desktop and mobile design in the
existing Next.js App Router project. Work belongs on `staging`; **do not modify
`main` or deploy to production**. Earlier automatic-main instructions are superseded.
The existing Sites identity is retained, but this phase does not save or deploy a
Sites version. The local static export is the review artifact.

Routes: `/`, `/gemstones/`, `/gemstones/[slug]/`, `/our-story/`, `/events/`,
`/contact/`, `/privacy-policy/`, plus custom error/404 states.

Homepage order: hero, trust strip, story, categories, featured products,
certification, process, clients, events, final contact CTA. Shared navigation and
footer wrap every page. There are no commerce or account flows.

## Configuration and replacement content

- `src/content/brand.ts`: set **only `whatsappNumber`** to the verified official
  business number, including country code, when supplied. `null` currently opens
  a local message preview. Valid configuration switches all enquiry buttons to
  encoded `wa.me` links automatically. No other flag is needed. Invalid numbers
  fail closed. Never use a personal or invented number.
- `brand.logo`: currently `null`. Supply an authorised logo file in `public/`
  and set its URL here. Until then the header/footer show plain business text;
  the official logo has not been recreated. The temporary tab icon is a gemstone
  illustration, not a replacement logo.
- `brand.siteUrl`: retained existing canonical origin. Set to the final review or
  production origin when a host/domain is approved. It is also used in enquiry
  messages. No hosting has been deployed during this rebuild.
- `brand.indexable`: false; all preview pages have noindex, robots disallows
  crawling and the sitemap contains no indexed entries. Set only after factual
  content and the intended public origin have been reviewed.
- `src/content/products.ts`: nine explicitly labelled illustration studies.
  No verified weights, dimensions, treatment, certification or availability have
  been provided; unknown fields are absent. Replace with actual records and
  authorised images before representing live inventory.
- `src/content/images.ts`: asset descriptions and contact-sheet coordinates.
  `Photo` clips each tile in SVG without editing the source or distorting its
  proportions. Replace a sheet record with an ordinary `GemImage` to use a real
  standalone photograph. Existing framework image loading supports lazy loading
  and explicit dimensions; the two small sheets are reused from browser cache.
- `src/content/certifications.ts`: empty; populate only with authorised reports
  tied to an individual product reference.
- Client and event images are generated demonstrations, labelled adjacent to
  each photograph. No actual event attendance, location, year, testimonial,
  client identity or endorsement is implied. Replace these with approved records.
- The privacy page is an editable draft. Legal entity, business privacy contact,
  retention periods and final hosting details need business review.
- There is no contact submission endpoint. The contact page has functional
  Instagram links and a copyable enquiry preview instead of a pretend form.

## Functionality

Catalogue filters intersect, reflect in URL query parameters, survive reload,
and support browser history. Search covers names, references and shapes. Unknown
weights/treatments never satisfy a factual filter. Sorting leaves unknown weights
last. Nine and six item page sizes provide working pagination.

Product pages include a full/detail gallery, accessible information tabs, related
stones and an enquiry containing name, reference and canonical URL. A contact-page
request retains the selected product. Native dialogs make the background inert,
wrap keyboard focus, close with Escape and return focus to their opener.

The client carousel uses native horizontal scrolling, scroll snapping, touch
swipes, labelled arrows and keyboard controls, with reduced-motion support and no
autoplay.

## Local checks

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

An installed Chromium may be selected using
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`.
`pnpm start` serves `out/` at `http://127.0.0.1:3000`.

The browser suite checks every route and its metadata, image loading, console
errors, combined catalogue interactions, pagination, URL history, enquiry text and
copy fallback, modal focus, gallery/tab keyboard controls, mobile menus, touch
swipes, internal links, 404/indexing safeguards and automated WCAG rules. It checks
360, 390, 768, 1024 and 1440 pixel widths and saves desktop/mobile screenshots to
ignored `outputs/screenshots/`. Automated accessibility checks are not a claim of
complete manual WCAG conformance.

## Verified review checkpoint — 12 October 2026

- Production static build: passed (19 generated pages, including framework and metadata routes).
- ESLint: passed with no reported warnings or errors.
- TypeScript: passed.
- Unit tests: 15 passed (catalogue boundaries, unknown data, search/filters, and enquiry encoding).
- Chromium browser tests: 66 passed. All requested widths (360, 390, 768,
  1024 and 1440) passed overflow checks; navigation, catalogue, pagination,
  product enquiries, clipboard fallback, gallery, tabs, modal focus and
  carousel touch/keyboard interactions passed.
- Automated WCAG checks: no violations reported by the included axe rules on
  all primary pages, the product page, mobile menu and enquiry dialog.
- Desktop/mobile screenshots: regenerated under `outputs/screenshots/` and
  visually inspected against the approved layout. The official logo and real
  photography remain client-supplied gaps, so exact branding cannot be finalised.
- Staged source checked for credential patterns and accidental generated files.
- No production deployment or changes to `main` are part of this checkpoint.
