import type { PortfolioContent, Project } from '../types.js';
import { esc, sectionHeader, tagList } from './html.js';
import { icons } from './icons.js';
import { projectMotif } from './visuals.js';

const detailsButton = (p: Project): string =>
  `<button class="btn btn-quiet" type="button" data-project-open="${esc(p.id)}"
           aria-haspopup="dialog">View details<span class="visually-hidden"> for ${esc(p.name)}</span></button>`;

function featuredCard(p: Project): string {
  const shown = p.technologies.slice(0, 5);
  const rest = p.technologies.length - shown.length;
  return `
  <article class="project-card">
    ${
      p.visual
        ? `<div class="card-visual">${projectMotif(p.visual)}</div>`
        : ''
    }
    <div class="card-body">
      <p class="card-category">${esc(p.category)}</p>
      <h3 class="card-title">${esc(p.name)}</h3>
      <p class="card-desc">${esc(p.description)}</p>
      <p class="card-contrib"><span class="card-key">My contribution</span>${esc(p.contribution)}</p>
      <ul class="tags" aria-label="Technologies used in ${esc(p.name)}">
        ${shown.map((t) => `<li class="tag">${esc(t)}</li>`).join('')}
        ${rest > 0 ? `<li class="tag tag-more">+${rest} more</li>` : ''}
      </ul>
      ${detailsButton(p)}
    </div>
  </article>`;
}

function compactRow(p: Project): string {
  return `
  <article class="project-row">
    <div class="project-row-main">
      <p class="card-category">${esc(p.category)}</p>
      <h3 class="card-title card-title-sm">${esc(p.name)}</h3>
      <p class="card-desc">${esc(p.description)}</p>
      ${tagList(p.technologies, `Technologies used in ${p.name}`)}
    </div>
    <div class="project-row-action">${detailsButton(p)}</div>
  </article>`;
}

function dialog(p: Project): string {
  return `
<dialog class="project-dialog" id="dialog-${esc(p.id)}" aria-labelledby="dialog-${esc(p.id)}-title">
  <div class="dialog-panel">
    <div class="dialog-head">
      <div>
        <p class="card-category">${esc(p.category)}</p>
        <h2 class="dialog-title" id="dialog-${esc(p.id)}-title">${esc(p.name)}</h2>
      </div>
      <button class="dialog-close" type="button" data-project-close aria-label="Close ${esc(p.name)} details">${icons.close}</button>
    </div>

    <div class="dialog-body">
      <section class="dialog-block">
        <h3 class="dialog-label">Overview</h3>
        <p>${esc(p.description)}</p>
      </section>

      <section class="dialog-block">
        <h3 class="dialog-label">My contribution</h3>
        <p>${esc(p.contribution)}</p>
      </section>

      <section class="dialog-block">
        <h3 class="dialog-label">Technologies</h3>
        ${tagList(p.technologies, `Technologies used in ${p.name}`)}
      </section>

      ${(p.details ?? [])
        .map(
          (g) => `
      <section class="dialog-block">
        <h3 class="dialog-label">${esc(g.label)}</h3>
        ${tagList(g.items, g.label)}
      </section>`,
        )
        .join('')}

      ${
        p.notes && p.notes.length
          ? `<section class="dialog-block dialog-note">
               <h3 class="dialog-label">Scope note</h3>
               ${p.notes.map((n) => `<p>${esc(n)}</p>`).join('')}
             </section>`
          : ''
      }
    </div>
  </div>
</dialog>`;
}

export function projects(c: PortfolioContent): string {
  const p = c.projects;
  const featured = p.items.filter((i) => i.featured);
  const compact = p.items.filter((i) => !i.featured);

  return `
<section class="section section-projects" id="projects" aria-labelledby="projects-title" data-reveal>
  <div class="shell">
    ${sectionHeader(p.number, p.heading, p.intro, 'projects-title')}

    <div class="project-grid">
      ${featured.map(featuredCard).join('')}
    </div>

    <h3 class="subhead">Also built</h3>
    <div class="project-rows">
      ${compact.map(compactRow).join('')}
    </div>
  </div>
</section>`;
}

export function projectDialogs(c: PortfolioContent): string {
  return c.projects.items.map(dialog).join('\n');
}
