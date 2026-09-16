/**
 * Conceptual visuals.
 *
 * These are illustrations of the kinds of systems described in the content —
 * never screenshots, and never a claim about a specific production topology.
 * Each one is labelled as conceptual where it appears.
 */

const box = (
  x: number,
  y: number,
  w: number,
  h: number,
  cls: string,
  r = 10,
): string => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${cls}"/>`;

const label = (x: number, y: number, text: string, cls = 'dg-label'): string =>
  `<text x="${x}" y="${y}" class="${cls}" text-anchor="middle">${text}</text>`;

/** Hero diagram: clients, API surface, business modules, messaging, data stores. */
export function heroDiagram(): string {
  const modules = ['Sales', 'Accounting', 'Warehouse', 'HR', 'POS'];
  const modW = 76;
  const modXs = [20, 106, 192, 278, 364];
  const modCenters = modXs.map((x) => x + modW / 2);

  const stores = ['PostgreSQL', 'MongoDB', 'SQL Server'];
  const storeW = 126;
  const storeXs = [20, 167, 314];
  const storeCenters = storeXs.map((x) => x + storeW / 2);

  return `
<svg class="hero-diagram" viewBox="0 0 460 406" role="img"
     aria-label="Conceptual diagram: web and mobile point-of-sale clients call an ASP.NET Core Web API, which serves Sales, Accounting, Warehouse, HR and POS modules, uses RabbitMQ for messaging between them, and stores data in PostgreSQL, MongoDB and SQL Server.">
  <g class="dg-lines">
    <path d="M120 60V84H340V60"/>
    <path d="M230 84v16"/>
    <path d="M230 158v20"/>
    <path d="M58 178h344"/>
    ${modCenters.map((c) => `<path d="M${c} 178v18"/>`).join('')}
    <path d="M58 232v90"/>
    <path d="M402 232v90"/>
    <path d="M58 322h344"/>
    ${storeCenters.map((c) => `<path d="M${c} 322v18"/>`).join('')}
  </g>
  <path d="M230 232v26" class="dg-lines dg-dashed"/>

  ${box(40, 16, 160, 44, 'dg-surface')}
  ${label(120, 43, 'Web client')}
  ${box(260, 16, 160, 44, 'dg-surface')}
  ${label(340, 43, 'Mobile POS client')}

  ${box(20, 100, 420, 58, 'dg-api', 12)}
  ${label(230, 126, 'ASP.NET Core Web API', 'dg-title')}
  ${label(230, 145, 'RESTful endpoints, multi-tenant', 'dg-sub')}

  ${modules
    .map(
      (m, i) =>
        `${box(modXs[i], 196, modW, 36, 'dg-module', 8)}${label(modCenters[i], 219, m, 'dg-small')}`,
    )
    .join('')}

  ${box(150, 258, 160, 36, 'dg-bus', 18)}
  ${label(230, 281, 'RabbitMQ', 'dg-small')}

  ${stores
    .map(
      (s, i) =>
        `${box(storeXs[i], 340, storeW, 46, 'dg-surface')}${label(storeCenters[i], 368, s, 'dg-small')}`,
    )
    .join('')}
</svg>`;
}

/** Small abstract motifs for featured project cards. Decorative only. */
export function projectMotif(kind: 'erp' | 'pos' | 'clinic'): string {
  const open = `<svg class="card-motif" viewBox="0 0 220 72" aria-hidden="true" focusable="false">`;
  const close = `</svg>`;

  if (kind === 'erp') {
    const xs = [20, 68, 116, 164];
    const blocks = xs
      .map((x) => `<rect x="${x}" y="42" width="36" height="22" rx="5" class="mt-fill"/>`)
      .join('');
    const drops = xs
      .map((x) => `<path d="M${x + 18} 32v10" class="mt-line"/>`)
      .join('');
    return `${open}
      <rect x="20" y="6" width="180" height="18" rx="6" class="mt-fill mt-accent"/>
      <path d="M110 24v8" class="mt-line"/>
      <path d="M38 32h144" class="mt-line"/>
      ${drops}${blocks}
    ${close}`;
  }

  if (kind === 'pos') {
    return `${open}
      <rect x="12" y="10" width="86" height="52" rx="6" class="mt-fill"/>
      <path d="M24 26h62M24 36h44M24 46h54" class="mt-line"/>
      <rect x="124" y="10" width="40" height="52" rx="8" class="mt-fill"/>
      <path d="M134 22h20M134 32h20M134 42h20" class="mt-line"/>
      <path d="M180 36h28" class="mt-line mt-accent"/>
      <circle cx="208" cy="36" r="5" class="mt-accent-fill"/>
    ${close}`;
  }

  return `${open}
    <rect x="12" y="10" width="92" height="52" rx="6" class="mt-fill"/>
    <path d="M24 24h68M24 36h48M24 48h58" class="mt-line"/>
    <rect x="124" y="10" width="84" height="52" rx="6" class="mt-fill"/>
    <path d="M124 26h84" class="mt-line"/>
    <path d="M144 10v8M188 10v8" class="mt-line"/>
    <circle cx="144" cy="42" r="6" class="mt-accent-fill"/>
    <path d="M166 42h30" class="mt-line mt-accent"/>
  ${close}`;
}

/** "MA" monogram used in the header, footer and favicon. */
export function monogram(cls = 'monogram'): string {
  return `<svg class="${cls}" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect x="1" y="1" width="46" height="46" rx="12" class="mono-frame"/>
    <path d="M12 33V16l6 10 6-10v17" class="mono-stroke"/>
    <path d="M28 33l6-17 6 17M30.4 27.5h7.2" class="mono-stroke"/>
  </svg>`;
}

/** Favicon: same monogram, self-contained with literal colours for the data URI. */
export function faviconSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="11" fill="#123F36"/><g fill="none" stroke="#C49A45" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 33V16l6 10 6-10v17"/><path d="M28 33l6-17 6 17M30.4 27.5h7.2"/></g></svg>`;
}
