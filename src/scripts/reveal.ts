// Marks each [data-section] as revealed once it is near the viewport (never reverts).
// Sections already above the viewport (reload mid-page, anchor jumps) are revealed at once,
// so no blank gaps are left behind. All text is in the HTML already; this only starts motion.
const sections = document.querySelectorAll<HTMLElement>('[data-section]');

const reveal = (el: Element) => ((el as HTMLElement).dataset.revealed = 'true');

try {
  if (!('IntersectionObserver' in window)) throw new Error('no IntersectionObserver');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting || e.boundingClientRect.bottom <= 0) {
          reveal(e.target);
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px 200px 0px' },
  );
  sections.forEach((s) => io.observe(s));
} catch {
  // never leave content hidden if the observer is unavailable
  sections.forEach(reveal);
  document.documentElement.classList.remove('js');
}
