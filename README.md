# Mostafa Atef Mohamed — portfolio

A static, single-page portfolio for a .NET Backend Developer. Written in
TypeScript, rendered to plain HTML at build time, no runtime framework.

## Stack, and why

- **TypeScript + esbuild, no framework.** The page is one document with typed,
  reusable component functions. esbuild runs the template in Node and writes a
  complete `dist/index.html`, so the site ships as static HTML — good for search
  engines, readable with JavaScript switched off, and fast on mobile.
- **Two dependencies**, both dev-only: `esbuild` (bundle + render) and
  `typescript` (type checking). Nothing ships to the browser except your own code.
- **~3 kB of JavaScript**, and everything it does is optional: the mobile menu,
  active-section highlighting, project dialogs, and section reveals. Smooth
  scrolling and sticky-header offsets are handled in CSS.

## Run it

```bash
npm install
npm run build     # writes dist/
npm run serve     # build, then serve dist/ on a local port
npx tsc --noEmit  # type check
```

Or just open `dist/portfolio-standalone.html` in a browser — that's the same
site with CSS and JS inlined into one file, useful for previewing or emailing.
The real deployable is `dist/` (upload the whole folder to any static host:
Netlify, Vercel, GitHub Pages, Cloudflare Pages, an S3 bucket, IIS).

## Project layout

```
src/
  types.ts              content model
  content.ts            ← every word, link and tag on the site
  render.ts             page template: <head>, SEO, structured data
  components/
    header.ts           sticky nav + hero
    sections.ts         about, experience, skills, education, contact, footer
    projects.ts         project cards, compact rows, detail dialogs
    visuals.ts          conceptual SVGs, MA monogram, favicon
    icons.ts            inline SVG icons
    html.ts             escaping and shared markup helpers
  runtime/main.ts       menu, dialogs, active link, reveals
static/styles.css       design tokens + all styling
build.mjs               render + bundle + copy
dist/                   build output
```

## Updating content

Almost every change is a one-line edit in **`src/content.ts`**, then `npm run build`.
Add a project to `projects.items`, a skill to `skills.groups`, a bullet to a role.
Featured projects (`featured: true`) render as large cards; the rest render as
compact rows. Both get a detail dialog.

Colours, type scale, spacing and radii are CSS custom properties at the top of
`static/styles.css` — change them there and they propagate.

## The CV download

**The CV PDF was not supplied with this build, so every CV download control is
omitted** rather than shipped broken. In its place the header shows "Email me"
and the hero shows "Get in touch".

To switch the downloads on:

1. Put `Mostafa-Atef-Mohamed-CV.pdf` in `static/`.
2. In `src/content.ts`, change `cv: null` to:
   ```ts
   cv: {
     file: 'assets/Mostafa-Atef-Mohamed-CV.pdf',
     downloadName: 'Mostafa-Atef-Mohamed-CV.pdf',
   },
   ```
3. `npm run build`. The header, hero and contact panel download buttons appear.

The build prints a warning whenever no PDF is present in `static/`.

## Before going live

`src/content.ts` → `seo.canonicalUrl` is intentionally empty. Set it to the real
domain and the build adds `<link rel="canonical">`, `og:url`, and the `url` field
in the Person structured data. Nothing else is domain-dependent.

## Accessibility notes

- Skip link, semantic landmarks, one `h1`, no skipped heading levels.
- Mobile menu: `aria-expanded` and label kept in sync, Escape closes and returns
  focus to the toggle, focus is kept inside the open panel, closed panel is
  `display: none` so its links stay out of the tab order.
- Project details use native `<dialog>` + `showModal()`, so focus trapping and
  Escape come from the platform; focus returns to the button that opened it.
- Focus rings switch between deep green and gold so the indicator always has
  enough contrast against whatever is behind it.
- `prefers-reduced-motion` disables reveals, transitions and smooth scrolling.
- Decorative SVGs are `aria-hidden`; the hero diagram has a descriptive
  `aria-label` and a visible caption saying it is conceptual, not a screenshot.
- Verified at 360, 768, 1024 and 1440 px with no horizontal overflow.

## Content accuracy

This site claims only what was supplied. There are no invented employers, job
titles, metrics, certifications, testimonials, repository links or demo links.
The three Ultimate Solutions products appear as workstreams inside one Backend
Developer role, not as separate jobs. AngularJS is never described as Angular.
Flutter is described as an integration target, not something built here. The
project visuals are abstract compositions labelled as conceptual.

Keep it that way when editing `src/content.ts`.
