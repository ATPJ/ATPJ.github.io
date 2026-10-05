// Pointer-driven extras: hero parallax, trailing cursor ring, card tilt, wordmark scramble, character squish.
// Pure decoration; everything is skipped for reduced motion.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const $$ = <T extends HTMLElement>(s: string) => [...document.querySelectorAll<T>(s)];
  const hero = document.getElementById('hero');
  const fine = matchMedia('(pointer: fine)').matches;

  if (hero && fine) {
    addEventListener(
      'pointermove',
      (e) => {
        hero.style.setProperty('--mx', (e.clientX / innerWidth - 0.5).toFixed(3));
        hero.style.setProperty('--my', (e.clientY / innerHeight - 0.5).toFixed(3));
      },
      { passive: true },
    );
  }

  const ring = document.querySelector<HTMLElement>('.cur-ring');
  if (ring && fine) {
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    addEventListener('pointermove', (e) => ((x = e.clientX), (y = e.clientY)), { passive: true });
    document.documentElement.classList.add('has-ring');
    (function loop() {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    })();
    $$('a, button, .char, .group, .trait').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('big'));
      el.addEventListener('mouseleave', () => ring.classList.remove('big'));
    });
  }

  // 3D tilt toward the pointer
  if (fine) {
    $$('.group, .trait').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const b = c.getBoundingClientRect();
        c.style.setProperty('--rx', ((e.clientX - b.left) / b.width - 0.5) * 8 + 'deg');
        c.style.setProperty('--ry', ((e.clientY - b.top) / b.height - 0.5) * -8 + 'deg');
      });
      c.addEventListener('pointerleave', () => {
        c.style.removeProperty('--rx');
        c.style.removeProperty('--ry');
      });
    });
  }

  // wordmark scrambles back into place on hover
  const glyphs = '01<>/{}#$%&*';
  $$('[data-scramble]').forEach((el) => {
    const final = el.textContent ?? '';
    let busy = false;
    el.addEventListener('mouseenter', () => {
      if (busy) return;
      busy = true;
      let f = 0;
      const tick = () => {
        el.textContent = [...final].map((c, i) => (i < f / 3 ? c : glyphs[(Math.random() * glyphs.length) | 0])).join('');
        if (f++ < final.length * 3) requestAnimationFrame(tick);
        else {
          el.textContent = final;
          busy = false;
        }
      };
      tick();
    });
  });

  // click the character: squash and bounce
  const char = document.querySelector<HTMLElement>('.char');
  char?.addEventListener('click', () => {
    char.classList.remove('squish');
    void char.offsetWidth;
    char.classList.add('squish');
  });
}
