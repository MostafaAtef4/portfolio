import { content } from './content.js';
import { header, hero } from './components/header.js';
import {
  about,
  contact,
  education,
  experience,
  footer,
  skills,
} from './components/sections.js';
import { projectDialogs, projects } from './components/projects.js';
import { faviconSvg } from './components/visuals.js';
import { esc } from './components/html.js';

/** Person structured data. Only facts that appear in the content file. */
function structuredData(): string {
  const d = content.contact.details;
  const person: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.meta.name,
    jobTitle: '.NET Backend Developer',
    email: `mailto:${d.email}`,
    telephone: '+201022163403',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nasr City',
      addressRegion: 'Cairo',
      addressCountry: 'EG',
    },
    worksFor: { '@type': 'Organization', name: 'Ultimate Solutions' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Menoufia University' },
    knowsLanguage: content.education.languages,
    knowsAbout: [
      'ASP.NET Core',
      'Entity Framework Core',
      'RESTful API design',
      'PostgreSQL',
      'MongoDB',
      'SQL Server',
      'Multi-tenant SaaS',
      'ERP systems',
      'Point of sale systems',
    ],
    sameAs: [d.github, d.linkedin],
  };
  if (content.seo.canonicalUrl) person.url = content.seo.canonicalUrl;
  return JSON.stringify(person, null, 2).replace(/</g, '\\u003c');
}

export function renderPage(): string {
  const { seo } = content;
  const favicon = `data:image/svg+xml,${encodeURIComponent(faviconSvg())}`;
  const canonical = seo.canonicalUrl
    ? `\n  <link rel="canonical" href="${esc(seo.canonicalUrl)}" />\n  <meta property="og:url" content="${esc(seo.canonicalUrl)}" />`
    : '\n  <!-- canonical and og:url are added once a production domain exists -->';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(seo.title)}</title>
  <meta name="description" content="${esc(seo.description)}" />
  <meta name="author" content="${esc(content.meta.name)}" />
  <meta name="theme-color" content="#123F36" />
  <meta name="color-scheme" content="light" />${canonical}

  <meta property="og:type" content="profile" />
  <meta property="og:title" content="${esc(seo.title)}" />
  <meta property="og:description" content="${esc(seo.description)}" />
  <meta property="og:site_name" content="${esc(seo.siteName)}" />
  <meta property="og:locale" content="en_US" />
  <meta property="profile:first_name" content="Mostafa" />
  <meta property="profile:last_name" content="Atef Mohamed" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${esc(seo.title)}" />
  <meta name="twitter:description" content="${esc(seo.description)}" />

  <link rel="icon" href="${favicon}" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" />
  <link rel="stylesheet" href="assets/styles.css" />

  <script>document.documentElement.classList.add('js');</script>
  <script type="application/ld+json">
${structuredData()}
  </script>
</head>
<body>
${header(content)}
<main id="main">
${hero(content)}
${about(content)}
${experience(content)}
${projects(content)}
${skills(content)}
${education(content)}
${contact(content)}
</main>
${footer(content)}
${projectDialogs(content)}
<script src="assets/main.js" defer></script>
</body>
</html>
`;
}
