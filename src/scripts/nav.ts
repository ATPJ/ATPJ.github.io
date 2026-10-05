// Keeps aria-current on the nav link of the section currently being read.
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav] a[href^="#"]'));
const targets = links
  .map((a) => document.getElementById(a.hash.slice(1)))
  .filter((el): el is HTMLElement => Boolean(el));

let queued = false;

function update() {
  queued = false;
  const line = window.innerHeight * 0.35;
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  let current = targets[0];
  for (const t of targets) if (t.getBoundingClientRect().top <= line) current = t;
  if (atBottom) current = targets[targets.length - 1];
  for (const a of links) {
    if (a.hash === `#${current?.id}`) {
      if (a.getAttribute('aria-current') !== 'true') keepVisible(a);
      a.setAttribute('aria-current', 'true');
    } else a.removeAttribute('aria-current');
  }
}

// on narrow screens the nav scrolls sideways: keep the active item in view
function keepVisible(a: HTMLAnchorElement) {
  const ul = a.closest('ul');
  if (ul && ul.scrollWidth > ul.clientWidth) {
    ul.scrollTo({ left: a.offsetLeft - (ul.clientWidth - a.offsetWidth) / 2 });
  }
}

const schedule = () => {
  if (!queued) {
    queued = true;
    requestAnimationFrame(update);
  }
};

addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', schedule);
update();
