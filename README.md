# Personal website — Samir Mahamat Saleh

A static, dependency-free personal site aimed at recruiters, deployed free on GitHub Pages.

**Live:** https://mosaleh47.github.io/

## What's in it

- Hero with availability, role positioning and key numbers
- About, grouped technical skills, experience timeline
- Selected projects with theme filters, linked to their GitHub repos
- Certification and the SSRN preprint
- Education timeline, languages, ways of working
- A CV section offering four role-targeted CVs plus the full one
- Contact section with an email assembled at runtime

## How it's built

Plain HTML, CSS and vanilla JavaScript — no framework, no build step. Open `index.html`
and it works.

| Path | What it is |
|---|---|
| `index.html` | The whole page. English content lives here so search engines index it. |
| `assets/css/styles.css` | Design tokens plus all styling. Light and dark palettes. |
| `assets/js/main.js` | Theme toggle, EN/FR switch (French strings live here), nav state, project filters, scroll reveal, email assembly. |
| `assets/cv/*.pdf` | The downloadable CVs. |
| `assets/img/` | Favicon and the 1200×630 social preview card. |

### Features worth knowing about

- **Dark / light theme** — follows the OS by default, overridable with the header
  button, remembered in `localStorage`. The theme is applied before first paint, so
  there's no flash of the wrong palette.
- **English / French** — English is in the markup; `FR` in `main.js` holds the French
  translation keyed by the `data-i18n` attributes. Visitors with a French browser get
  French automatically; the choice is remembered.
- **Email obfuscation** — the address is assembled in JavaScript rather than sitting in
  the HTML source. There's a `<noscript>` fallback.
- **SEO** — `Person` JSON-LD, Open Graph and Twitter cards, canonical URL.
- **Accessibility** — skip link, keyboard-operable menu, visible focus rings, honours
  `prefers-reduced-motion`.
- Responsive down to 380px, and prints cleanly.

## Editing it

**Text** — edit `index.html` for the English, then update the matching key in the `FR`
object in `assets/js/main.js` for the French. Keys are the `data-i18n` attribute values.

**Colours** — change the custom properties at the top of `assets/css/styles.css`. The
accent is `#0e6e6e` in light mode and `#54d6c8` in dark, matching the CV's accent colour.

**A new project card** — copy an existing `<article class="proj">` block in the projects
section. Its `data-tags` attribute controls which filters it appears under:
`genai`, `eval`, `ml`, `app`.

**Updating a CV** — drop the new PDF in `assets/cv/` under the same filename, commit and
push. The `CVs/` folder at the repo root is a local staging area and is not published.

> **Before publishing a new CV, strip the phone number.** The published PDFs in
> `assets/cv/` deliberately carry no phone number — only the email, which is also a
> working `mailto:` link. The local originals in `CVs/` still contain it, so copying one
> across unchanged would put it back on a public page. Check with:
>
> ```bash
> pdftotext assets/cv/the-file.pdf - | grep -c "+33"
> ```
>
> That must print `0`. For the two CVs built from LaTeX (the English one and the full
> French one) the number was removed at the source and the file recompiled; the three
> role-targeted CVs had it removed from the PDF content stream directly.

## Running it locally

Any static server works, or just open the file:

```bash
python -m http.server 8000
```

Then go to http://localhost:8000.

## Deploying

The site is served by GitHub Pages from the `main` branch of the `MoSaleh47.github.io`
repository. Pushing to `main` redeploys it — usually live within a minute.

```bash
git add -A
git commit -m "Update site"
git push
```

`.nojekyll` is present so GitHub Pages serves the files as-is instead of running them
through Jekyll.
