(() => {
  'use strict';
  const body = document.body;
  const viewport = document.querySelector('#reading-viewport');
  // 300px sidebars + 720px article + 64px reading gutters; never squeeze the article.
  const mobile = window.matchMedia('(max-width:1399px)');
  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {}
    },
  };
  const scrim = document.querySelector('.sidebar-scrim');
  const toggles = {
    notes: document.querySelector('#notes-toggle'),
    outline: document.querySelector('#outline-toggle'),
  };
  function setSidebar(name, open, save = true) {
    if (body.dataset[`has${name[0].toUpperCase()}${name.slice(1)}`] !== 'true') open = false;
    body.dataset[`${name}Open`] = String(open);
    toggles[name].setAttribute('aria-expanded', String(open));
    const panel = document.querySelector(`#${name}-sidebar`);
    panel.inert = !open;
    panel.setAttribute('aria-hidden', String(!open));
    if (save && !mobile.matches) storage.set(`quiet-reader-${name}`, String(open));
    scrim.hidden =
      !mobile.matches || !(body.dataset.notesOpen === 'true' || body.dataset.outlineOpen === 'true');
    if (name === 'outline' && open) requestAnimationFrame(() => updateOutline());
  }
  function initializePanels() {
    for (const name of ['notes', 'outline'])
      setSidebar(name, !mobile.matches && storage.get(`quiet-reader-${name}`) !== 'false', false);
  }
  initializePanels();
  for (const folder of document.querySelectorAll('.folder-node')) {
    const row = folder.querySelector(':scope > .folder-row');
    const children = folder.querySelector(':scope > .tree-children');
    const buttons = row.querySelectorAll('.tree-toggle');
    const key = `quiet-reader-folder:${folder.dataset.folder}`;
    function setExpanded(open, save = true) {
      children.hidden = !open;
      for (const button of buttons) button.setAttribute('aria-expanded', String(open));
      if (save) storage.set(key, String(open));
    }
    setExpanded(folder.dataset.activeBranch === 'true' || storage.get(key) === 'true', false);
    for (const button of buttons) button.addEventListener('click', () => setExpanded(children.hidden));
  }
  const scrollTimers = new WeakMap();
  document.addEventListener(
    'scroll',
    (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      target.classList.add('is-scrolling');
      clearTimeout(scrollTimers.get(target));
      scrollTimers.set(
        target,
        setTimeout(() => target.classList.remove('is-scrolling'), 800),
      );
    },
    { capture: true, passive: true },
  );
  mobile.addEventListener('change', initializePanels);
  for (const name of ['notes', 'outline'])
    toggles[name].addEventListener('click', () => {
      const open = body.dataset[`${name}Open`] !== 'true';
      if (mobile.matches) setSidebar(name === 'notes' ? 'outline' : 'notes', false, false);
      setSidebar(name, open);
    });
  scrim.addEventListener('click', () => {
    setSidebar('notes', false, false);
    setSidebar('outline', false, false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const dialog = document.querySelector('dialog[open]');
    if (dialog) {
      event.preventDefault();
      dialog.close();
      return;
    }
    if (mobile.matches) {
      setSidebar('notes', false, false);
      setSidebar('outline', false, false);
    }
  });
  const outlineFold = document.querySelector('#outline-fold');
  outlineFold?.addEventListener('click', () => {
    const items = document.querySelector('#outline-items');
    items.hidden = !items.hidden;
    outlineFold.setAttribute('aria-expanded', String(!items.hidden));
    updateOutline();
  });
  const outlinePanel = document.querySelector('#outline-sidebar');
  const outlineContents = document.querySelector('#outline-contents');
  const outlineProgress = document.querySelector('#outline-progress');
  const outlineLinks = [...document.querySelectorAll('.outline-sidebar ol a')];
  const pairs = outlineLinks
    .map((link) => ({ link, heading: document.getElementById(decodeURIComponent(link.hash.slice(1))) }))
    .filter((pair) => pair.heading);
  let pending = false;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  function updateOutline() {
    pending = false;
    if (!pairs.length) return;
    const top = viewport.getBoundingClientRect().top + 90;
    const maxScroll = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    const scroll = clamp(viewport.scrollTop, 0, maxScroll);
    const atEnd =
      viewport.scrollHeight > viewport.clientHeight &&
      viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 2;
    const active = atEnd
      ? pairs.at(-1)
      : pairs.filter((pair) => pair.heading.getBoundingClientRect().top <= top).at(-1) || pairs[0];
    for (const pair of pairs) {
      pair.link.classList.toggle('is-active', pair === active);
      if (pair === active) pair.link.setAttribute('aria-current', 'location');
      else pair.link.removeAttribute('aria-current');
    }
    if (!outlineProgress) return;
    const percent = maxScroll ? Math.round((scroll / maxScroll) * 100) : 100;
    outlineProgress.setAttribute('aria-valuenow', String(percent));
    outlineProgress.setAttribute('aria-valuetext', `${percent}% read`);
    outlineProgress.hidden = document.querySelector('#outline-items').hidden;
    if (outlineProgress.hidden || body.dataset.outlineOpen !== 'true') return;

    // Map progress through each prose section onto the space between its TOC entries.
    // The marker travels continuously, rather than jumping only at heading boundaries.
    const next = pairs[pairs.indexOf(active) + 1];
    const start = clamp(active.heading.getBoundingClientRect().top - top + scroll, 0, maxScroll);
    const end = next
      ? clamp(next.heading.getBoundingClientRect().top - top + scroll, 0, maxScroll)
      : maxScroll;
    const fraction = end > start ? clamp((scroll - start) / (end - start), 0, 1) : 0;
    const contentsTop = outlineContents.getBoundingClientRect().top;
    const center = (pair) => {
      const rect = pair.link.getBoundingClientRect();
      return rect.top - contentsTop + rect.height / 2;
    };
    const from = center(active),
      to = next ? center(next) : from;
    const offset = Math.max(0, from + (to - from) * fraction - 9);
    outlineProgress.style.setProperty('--outline-offset', `${offset}px`);

    // Keep the location marker visible on long outlines, moving only the TOC itself.
    const panel = outlinePanel.getBoundingClientRect();
    const markerTop = contentsTop + offset;
    if (markerTop < panel.top + 24) outlinePanel.scrollTop += markerTop - panel.top - 24;
    else if (markerTop + 18 > panel.bottom - 24) outlinePanel.scrollTop += markerTop + 18 - panel.bottom + 24;
  }
  function scheduleOutline() {
    if (!pending) {
      pending = true;
      requestAnimationFrame(updateOutline);
    }
  }
  viewport.addEventListener('scroll', scheduleOutline, { passive: true });
  window.addEventListener('resize', scheduleOutline);
  const outlineObserver = new ResizeObserver(scheduleOutline);
  outlineObserver.observe(document.querySelector('.article'));
  if (outlineContents) outlineObserver.observe(outlineContents);
  updateOutline();
  for (const link of document.querySelectorAll('.outline-sidebar a'))
    link.addEventListener('click', () => {
      if (mobile.matches) setSidebar('outline', false, false);
    });
  function restoreHash() {
    if (!location.hash) return;
    let id;
    try {
      id = decodeURIComponent(location.hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
  }
  window.addEventListener('load', () => {
    Promise.resolve(window.MathJax?.startup?.promise).then(() => {
      restoreHash();
      updateOutline();
    });
  });

  const appearance = document.querySelector('#appearance-dialog');
  document.querySelector('#appearance-toggle').addEventListener('click', () => appearance.showModal());
  function setFont(font) {
    if (!['termes', 'stix'].includes(font)) font = 'termes';
    document.documentElement.dataset.readerFont = font;
    for (const button of appearance.querySelectorAll('[data-font]'))
      button.setAttribute('aria-pressed', String(button.dataset.font === font));
    storage.set('quiet-reader-font', font);
  }
  setFont(storage.get('quiet-reader-font') || 'termes');
  for (const button of appearance.querySelectorAll('[data-font]'))
    button.addEventListener('click', () => setFont(button.dataset.font));
  function setSize(size) {
    if (![18, 20, 22].includes(size)) size = 18;
    document.documentElement.style.setProperty('--reader-size', `${size}px`);
    for (const button of appearance.querySelectorAll('[data-size]'))
      button.setAttribute('aria-pressed', String(Number(button.dataset.size) === size));
    storage.set('quiet-reader-size', String(size));
  }
  setSize(Number(storage.get('quiet-reader-size')) || 18);
  for (const button of appearance.querySelectorAll('[data-size]'))
    button.addEventListener('click', () => setSize(Number(button.dataset.size)));

  const search = document.querySelector('#search-dialog'),
    input = document.querySelector('#search-input'),
    results = document.querySelector('#search-results'),
    status = document.querySelector('#search-status');
  let indexPromise,
    queryVersion = 0;
  const normalize = (value) => value.normalize('NFKC').toLocaleLowerCase();
  function openSearch() {
    if (!search.open) search.showModal();
    input.focus();
  }
  document.querySelector('#search-toggle').addEventListener('click', openSearch);
  document.addEventListener('keydown', (event) => {
    const editing = /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable;
    if (
      ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') ||
      (event.key === '/' && !editing)
    ) {
      event.preventDefault();
      openSearch();
    }
  });
  input.addEventListener('input', async () => {
    const version = ++queryVersion,
      query = normalize(input.value.trim());
    results.replaceChildren();
    if (!query) {
      status.textContent = 'Search the published notes on this site.';
      return;
    }
    status.textContent = 'Searching…';
    try {
      indexPromise ||= fetch(body.dataset.searchIndex).then((response) => {
        if (!response.ok) throw new Error('Search index unavailable');
        return response.json();
      });
      const index = await indexPromise;
      if (version !== queryVersion) return;
      const words = query.split(/\s+/);
      const matches = index
        .map((item) => ({
          ...item,
          score: words.every((word) => normalize(`${item.title} ${item.text}`).includes(word))
            ? normalize(item.title).includes(query)
              ? 100
              : 10
            : 0,
        }))
        .filter((item) => item.score)
        .sort((a, b) => b.score - a.score)
        .slice(0, 30);
      status.textContent = matches.length
        ? `${matches.length} result${matches.length === 1 ? '' : 's'}`
        : 'No matching notes.';
      for (const item of matches) {
        const li = document.createElement('li'),
          a = document.createElement('a'),
          detail = document.createElement('small');
        a.href = item.url;
        a.textContent = item.title;
        detail.textContent = item.course;
        a.append(detail);
        li.append(a);
        results.append(li);
      }
    } catch {
      indexPromise = null;
      status.textContent = 'Search could not load. Please try again.';
    }
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      const first = results.querySelector('a');
      if (first) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  for (const dialog of [search, appearance])
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          dialog.close();
      }
    });
})();
