/** Escapes text before it is interpolated into markup. */
export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Joins fragments, dropping empty ones, so optional blocks compose cleanly. */
export function join(parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join('\n');
}

/** Section header: number, rule, and heading. Shared by every content section. */
export function sectionHeader(
  number: string,
  heading: string,
  intro?: string,
  headingId?: string,
): string {
  return `
    <header class="section-head">
      <p class="section-number" aria-hidden="true">${esc(number)}</p>
      <h2 class="section-title"${headingId ? ` id="${esc(headingId)}"` : ''}>${esc(heading)}</h2>
      ${intro ? `<p class="section-intro">${esc(intro)}</p>` : ''}
    </header>`;
}

/** Inline list of technology tags. */
export function tagList(tags: string[], label: string): string {
  return `
    <ul class="tags" aria-label="${esc(label)}">
      ${tags.map((tag) => `<li class="tag">${esc(tag)}</li>`).join('')}
    </ul>`;
}
