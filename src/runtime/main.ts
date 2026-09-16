/**
 * Runtime behaviour for the portfolio.
 *
 * Everything here is progressive: the page is fully readable and navigable with
 * this file absent. Smooth scrolling and heading offsets are handled in CSS
 * (`scroll-behavior` + `scroll-margin-top`), not here.
 */

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ menu -- */

function initMenu(): void {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!header || !toggle || !nav) return;

  const setOpen = (open: boolean): void => {
    header.dataset.navOpen = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
  };

  const isOpen = (): boolean => header.dataset.navOpen === 'true';

  toggle.addEventListener('click', () => {
    const next = !isOpen();
    setOpen(next);
    if (next) {
      const first = nav.querySelector<HTMLAnchorElement>('a');
      first?.focus();
    }
  });

  nav.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('a') && isOpen()) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Keep focus inside the panel while it is open on small screens.
  nav.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || !isOpen()) return;
    const focusables = Array.from(
      nav.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      toggle.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!isOpen()) return;
    const target = event.target as Node;
    if (!header.contains(target)) setOpen(false);
  });

  const desktop = window.matchMedia('(min-width: 900px)');
  const sync = (): void => {
    if (desktop.matches && isOpen()) setOpen(false);
  };
  desktop.addEventListener('change', sync);
}

/* --------------------------------------------------------- active section -- */

function initActiveSection(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'),
  );
  if (!links.length || !('IntersectionObserver' in window)) return;

  const sections = links
    .map((link) => document.getElementById(link.dataset.navLink ?? ''))
    .filter((el): el is HTMLElement => Boolean(el));

  const visible = new Set<string>();

  const paint = (): void => {
    const activeId = sections.find((s) => visible.has(s.id))?.id;
    links.forEach((link) => {
      const on = link.dataset.navLink === activeId;
      link.classList.toggle('is-active', on);
      if (on) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      paint();
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}

/* ----------------------------------------------------------------- reveal -- */

function initReveal(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!items.length) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------------------------------------------------------------- dialogs -- */

function initDialogs(): void {
  const openers = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-project-open]'),
  );
  let lastOpener: HTMLElement | null = null;

  const close = (dialog: HTMLDialogElement): void => {
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
  };

  openers.forEach((opener) => {
    const id = opener.dataset.projectOpen;
    const dialog = document.getElementById(
      `dialog-${id}`,
    ) as HTMLDialogElement | null;
    if (!dialog) {
      opener.hidden = true;
      return;
    }

    opener.addEventListener('click', () => {
      lastOpener = opener;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      dialog
        .querySelector<HTMLElement>('[data-project-close]')
        ?.focus({ preventScroll: true });
    });

    dialog.addEventListener('close', () => {
      lastOpener?.focus();
      lastOpener = null;
    });

    dialog
      .querySelector<HTMLElement>('[data-project-close]')
      ?.addEventListener('click', () => close(dialog));

    // Clicking the backdrop (outside the inner panel) closes the dialog.
    dialog.addEventListener('click', (event) => {
      const panel = dialog.querySelector('.dialog-panel');
      if (panel && !panel.contains(event.target as Node)) close(dialog);
    });
  });
}

/* ------------------------------------------------------------------- boot -- */

function boot(): void {
  initMenu();
  initActiveSection();
  initReveal();
  initDialogs();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
