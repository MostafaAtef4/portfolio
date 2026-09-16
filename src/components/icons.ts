/**
 * Inline SVG icons. All are decorative (`aria-hidden`): the surrounding link or
 * button always carries the accessible name, either as visible text or aria-label.
 */

const wrap = (body: string, viewBox = '0 0 24 24'): string =>
  `<svg class="icon" viewBox="${viewBox}" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const icons = {
  github: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.53.1.72-.23.72-.51v-1.8c-2.92.63-3.54-1.4-3.54-1.4-.48-1.22-1.17-1.55-1.17-1.55-.96-.65.07-.64.07-.64 1.06.08 1.61 1.09 1.61 1.09.94 1.6 2.47 1.14 3.07.87.1-.68.37-1.14.67-1.4-2.33-.27-4.78-1.17-4.78-5.19 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.89 1.08a10 10 0 0 1 5.26 0c2-1.36 2.88-1.08 2.88-1.08.58 1.45.22 2.52.11 2.79.68.74 1.08 1.67 1.08 2.82 0 4.03-2.45 4.92-4.79 5.18.38.33.71.97.71 1.95v2.89c0 .28.19.62.73.51A10.5 10.5 0 0 0 12 1.5Z"/></svg>`,
  linkedin: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.25H3V9.75Zm6.5 0h3.83v1.54h.05c.53-.95 1.84-1.95 3.79-1.95 4.05 0 4.8 2.53 4.8 5.82V21h-4v-5.15c0-1.23-.02-2.81-1.77-2.81-1.78 0-2.05 1.34-2.05 2.72V21h-4V9.75Z"/></svg>`,
  mail: wrap(
    '<rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.25"/><path d="m3.5 7.5 7.4 5.1a2 2 0 0 0 2.2 0l7.4-5.1"/>',
  ),
  phone: wrap(
    '<path d="M6.2 3.75h2.6l1.3 3.6-1.9 1.4a11.5 11.5 0 0 0 5.05 5.05l1.4-1.9 3.6 1.3v2.6a2 2 0 0 1-2.2 2A15.9 15.9 0 0 1 4.2 5.95a2 2 0 0 1 2-2.2Z"/>',
  ),
  pin: wrap(
    '<path d="M12 21s6.5-5.4 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.6 12 21 12 21Z"/><circle cx="12" cy="10.6" r="2.4"/>',
  ),
  download: wrap('<path d="M12 4v10.5m0 0 4-4m-4 4-4-4"/><path d="M4.5 18.5h15"/>'),
  arrowUp: wrap('<path d="M12 19.5V5m0 0 6 6m-6-6-6 6"/>'),
  menu: wrap('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: wrap('<path d="M6 6l12 12M18 6 6 18"/>'),
  chevron: wrap('<path d="m7 10 5 5 5-5"/>'),
  code: wrap('<path d="m9 8-4 4 4 4"/><path d="m15 8 4 4-4 4"/>'),
};
