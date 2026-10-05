// Remembers the visitor's manual language choice. The first-visit redirect to /fa/ runs
// from a tiny inline script in the layout (before paint), not from here.
document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]').forEach((a) => {
  a.addEventListener('click', () => {
    try {
      localStorage.setItem('lang', a.dataset.langSwitch ?? 'en');
    } catch {
      /* storage blocked: the switch still navigates */
    }
  });
});
