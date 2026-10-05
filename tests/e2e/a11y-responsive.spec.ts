import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { revealAll } from './helpers';

// axe measures colors, so check the final state, not a frame in the middle of a reveal animation
test.use({ reducedMotion: 'reduce' });

for (const route of ['/', '/fa/']) {
  test(`no accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    await revealAll(page);
    await page.waitForTimeout(1600);
    const r = await new AxeBuilder({ page }).analyze();
    expect(r.violations).toEqual([]);
  });

  for (const width of [320, 768, 1920]) {
    test(`no horizontal scroll at ${width}px on ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await revealAll(page);
      const { sw, cw } = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        cw: document.documentElement.clientWidth,
      }));
      expect(sw).toBeLessThanOrEqual(cw);
    });
  }
}

test('keyboard: every stop has a visible focus indicator and the key controls are reachable', async ({ page }) => {
  await page.goto('/');
  const seen = new Set<string>();
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body || el === document.documentElement) return null; // focus left the page
      const cs = getComputedStyle(el);
      return {
        id: el.tagName + ' ' + (el.textContent?.trim().slice(0, 30) ?? ''),
        outline: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0,
      };
    });
    if (!info) continue;
    expect(info.outline, `focus visible on "${info.id}"`).toBe(true);
    seen.add(info.id);
  }
  expect([...seen].some((t) => t.includes('Copy email'))).toBe(true);
  expect([...seen].some((t) => t.includes('فارسی'))).toBe(true);
});
