import type { PortfolioContent } from '../types.js';
import { esc } from './html.js';
import { icons } from './icons.js';
import { heroDiagram, monogram } from './visuals.js';

/**
 * Sticky header. The nav list is a plain list on desktop and a disclosure panel
 * on small screens; when the panel is closed it is display:none, so its links
 * stay out of the tab order without needing extra ARIA bookkeeping.
 */
export function header(c: PortfolioContent): string {
  const cvButton = c.cv
    ? `<a class="btn btn-accent btn-sm header-cta" href="${esc(c.cv.file)}" download="${esc(c.cv.downloadName)}">${icons.download}<span>Download CV</span></a>`
    : `<a class="btn btn-accent btn-sm header-cta" href="mailto:${esc(c.contact.details.email)}">${icons.mail}<span>Email me</span></a>`;

  return `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" id="site-header" data-nav-open="false">
  <div class="shell header-inner">
    <a class="brand" href="#top">
      ${monogram('brand-mark')}
      <span class="brand-name">Mostafa Atef</span>
    </a>

    <nav class="primary-nav" id="primary-nav" aria-label="Primary">
      <ul class="nav-list">
        ${c.nav
          .map(
            (item) =>
              `<li><a class="nav-link" href="#${esc(item.id)}" data-nav-link="${esc(item.id)}">${esc(item.label)}</a></li>`,
          )
          .join('')}
      </ul>
      <div class="nav-panel-cta">${cvButton}</div>
    </nav>

    <div class="header-actions">
      <div class="header-cta-slot">${cvButton}</div>
      <button class="nav-toggle" id="nav-toggle" type="button"
              aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
        <span class="nav-toggle-open" aria-hidden="true">${icons.menu}</span>
        <span class="nav-toggle-close" aria-hidden="true">${icons.close}</span>
      </button>
    </div>
  </div>
</header>`;
}

export function hero(c: PortfolioContent): string {
  const { hero: h, contact } = c;

  const secondary = c.cv
    ? `<a class="btn btn-ghost" href="${esc(c.cv.file)}" download="${esc(c.cv.downloadName)}">${icons.download}<span>Download CV</span></a>`
    : `<a class="btn btn-ghost" href="#contact">${icons.mail}<span>Get in touch</span></a>`;

  return `
<section class="hero" id="top">
  <div class="shell hero-inner">
    <div class="hero-copy">
      <p class="hero-eyebrow">${esc(h.eyebrow)}</p>
      <h1 class="hero-name">${esc(h.name)}</h1>
      <p class="hero-headline">${esc(h.headline)}</p>
      <p class="hero-text">${esc(h.paragraph)}</p>

      <div class="hero-actions">
        <a class="btn btn-accent" href="${esc(h.primaryAction.href)}">${esc(h.primaryAction.label)}</a>
        ${secondary}
      </div>

      <div class="hero-meta">
        <ul class="hero-links">
          <li><a class="icon-link" href="${esc(contact.details.github)}" rel="noopener noreferrer" target="_blank">${icons.github}<span>GitHub</span></a></li>
          <li><a class="icon-link" href="${esc(contact.details.linkedin)}" rel="noopener noreferrer" target="_blank">${icons.linkedin}<span>LinkedIn</span></a></li>
          <li><a class="icon-link" href="mailto:${esc(contact.details.email)}">${icons.mail}<span>Email</span></a></li>
        </ul>
        <p class="hero-location">${icons.pin}<span>${esc(h.location)}</span></p>
      </div>
    </div>

    <figure class="hero-figure">
      ${heroDiagram()}
      <figcaption class="hero-caption">Conceptual illustration of the kind of system described above. Not a screenshot of a production application.</figcaption>
    </figure>
  </div>
</section>`;
}
