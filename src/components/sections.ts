import type { PortfolioContent, Role } from '../types.js';
import { esc, sectionHeader } from './html.js';
import { icons } from './icons.js';
import { monogram } from './visuals.js';

export function about(c: PortfolioContent): string {
  const a = c.about;
  return `
<section class="section section-about" id="about" aria-labelledby="about-title" data-reveal>
  <div class="shell">
    ${sectionHeader(a.number, a.heading, undefined, 'about-title')}
    <div class="about-grid">
      <p class="about-intro">${esc(a.intro)}</p>
      <ul class="theme-list">
        ${a.themes
          .map(
            (t) => `
        <li class="theme">
          <h3 class="theme-title">${esc(t.title)}</h3>
          <p class="theme-body">${esc(t.body)}</p>
        </li>`,
          )
          .join('')}
      </ul>
    </div>
  </div>
</section>`;
}

function roleEntry(role: Role, index: number): string {
  const workstreams = role.workstreams
    ? `
      ${role.workstreamsNote ? `<p class="workstream-note">${esc(role.workstreamsNote)}</p>` : ''}
      <div class="workstreams">
        ${role.workstreams
          .map(
            (w, i) => `
        <details class="workstream"${i === 0 ? ' open' : ''}>
          <summary class="workstream-summary">
            <span class="workstream-heads">
              <span class="workstream-name">${esc(w.name)}</span>
              <span class="workstream-line">${esc(w.summary)}</span>
            </span>
            <span class="workstream-chevron" aria-hidden="true">${icons.chevron}</span>
          </summary>
          <ul class="bullets">
            ${w.points.map((p) => `<li>${esc(p)}</li>`).join('')}
          </ul>
        </details>`,
          )
          .join('')}
      </div>`
    : '';

  const bullets = role.points
    ? `<ul class="bullets bullets-loose">${role.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`
    : '';

  return `
  <li class="timeline-item">
    <div class="timeline-marker" aria-hidden="true"></div>
    <article class="role">
      <p class="role-period">${esc(role.period)}</p>
      <h3 class="role-title">${esc(role.title)}</h3>
      <p class="role-employer">${esc(role.employer)}</p>
      ${workstreams}
      ${bullets}
    </article>
  </li>`;
}

export function experience(c: PortfolioContent): string {
  const e = c.experience;
  return `
<section class="section section-experience" id="experience" aria-labelledby="experience-title" data-reveal>
  <div class="shell">
    ${sectionHeader(e.number, e.heading, e.intro, 'experience-title')}
    <ol class="timeline">
      ${e.roles.map((r, i) => roleEntry(r, i)).join('')}
    </ol>
  </div>
</section>`;
}

export function skills(c: PortfolioContent): string {
  const s = c.skills;
  return `
<section class="section section-skills" id="skills" aria-labelledby="skills-title" data-reveal>
  <div class="shell">
    ${sectionHeader(s.number, s.heading, s.intro, 'skills-title')}
    <div class="skill-grid">
      ${s.groups
        .map(
          (g) => `
      <section class="skill-group" aria-label="${esc(g.label)}">
        <h3 class="skill-group-title">${esc(g.label)}</h3>
        <ul class="skill-items">
          ${g.skills.map((k) => `<li>${esc(k)}</li>`).join('')}
        </ul>
      </section>`,
        )
        .join('')}
    </div>
  </div>
</section>`;
}

export function education(c: PortfolioContent): string {
  const e = c.education;
  return `
<section class="section section-education" aria-labelledby="education-title" data-reveal>
  <div class="shell">
    ${sectionHeader(e.number, e.heading, undefined, 'education-title')}
    <div class="education-grid">
      <div class="edu-block">
        <h3 class="edu-label">Education</h3>
        <p class="edu-degree">${esc(e.education.degree)}</p>
        <p class="edu-meta">${esc(e.education.institution)}</p>
        <p class="edu-meta">${esc(e.education.period)}</p>
        <p class="edu-meta">Grade: ${esc(e.education.grade)}</p>
      </div>
      <div class="edu-block">
        <h3 class="edu-label">Certificates</h3>
        <ul class="edu-list">
          ${e.certificates
            .map(
              (cert) =>
                `<li><span class="edu-degree">${esc(cert.name)}</span><span class="edu-meta">${esc(cert.issuer)}</span></li>`,
            )
            .join('')}
        </ul>
      </div>
      <div class="edu-block">
        <h3 class="edu-label">Languages</h3>
        <ul class="edu-list">
          ${e.languages.map((l) => `<li><span class="edu-degree">${esc(l)}</span></li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
</section>`;
}

export function contact(c: PortfolioContent): string {
  const s = c.contact;
  const d = s.details;
  const cvLine = c.cv
    ? `<a class="btn btn-ghost btn-on-dark" href="${esc(c.cv.file)}" download="${esc(c.cv.downloadName)}">${icons.download}<span>Download CV</span></a>`
    : '';

  return `
<section class="section section-contact" id="contact" aria-labelledby="contact-title" data-reveal>
  <div class="shell">
    <div class="contact-panel">
      <div class="contact-head">
        <p class="section-number section-number-dark" aria-hidden="true">${esc(s.number)}</p>
        <h2 class="contact-title" id="contact-title">${esc(s.heading)}</h2>
        <p class="contact-intro">${esc(s.intro)}</p>
        <div class="contact-actions">
          <a class="btn btn-accent" href="mailto:${esc(d.email)}">${icons.mail}<span>Email me</span></a>
          ${cvLine}
        </div>
      </div>

      <ul class="contact-list">
        <li>
          <span class="contact-key">Email</span>
          <a class="contact-value" href="mailto:${esc(d.email)}">${esc(d.email)}</a>
        </li>
        <li>
          <span class="contact-key">Phone</span>
          <a class="contact-value" href="${esc(d.phoneHref)}">${esc(d.phoneDisplay)}</a>
        </li>
        <li>
          <span class="contact-key">LinkedIn</span>
          <a class="contact-value" href="${esc(d.linkedin)}" rel="noopener noreferrer" target="_blank">linkedin.com/in/mostafa-atef-204m</a>
        </li>
        <li>
          <span class="contact-key">GitHub</span>
          <a class="contact-value" href="${esc(d.github)}" rel="noopener noreferrer" target="_blank">github.com/MostafaAtef4</a>
        </li>
        <li>
          <span class="contact-key">Location</span>
          <span class="contact-value contact-static">${esc(d.location)}</span>
        </li>
      </ul>
    </div>
  </div>
</section>`;
}

export function footer(c: PortfolioContent): string {
  const d = c.contact.details;
  const year = new Date().getFullYear();
  return `
<footer class="site-footer">
  <div class="shell footer-inner">
    <div class="footer-identity">
      ${monogram('footer-mark')}
      <div>
        <p class="footer-name">${esc(c.meta.name)}</p>
        <p class="footer-role">${esc(c.meta.role)}</p>
      </div>
    </div>

    <ul class="footer-links">
      <li><a class="icon-link" href="${esc(d.github)}" rel="noopener noreferrer" target="_blank" aria-label="GitHub profile">${icons.github}<span class="visually-hidden">GitHub</span></a></li>
      <li><a class="icon-link" href="${esc(d.linkedin)}" rel="noopener noreferrer" target="_blank" aria-label="LinkedIn profile">${icons.linkedin}<span class="visually-hidden">LinkedIn</span></a></li>
      <li><a class="icon-link" href="mailto:${esc(d.email)}" aria-label="Email ${esc(d.email)}">${icons.mail}<span class="visually-hidden">Email</span></a></li>
    </ul>

    <div class="footer-end">
      <p class="footer-copy">&copy; ${year} ${esc(c.meta.name)}</p>
      <a class="back-to-top" href="#top">${icons.arrowUp}<span>Back to top</span></a>
    </div>
  </div>
</footer>`;
}
