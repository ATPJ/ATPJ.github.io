import type { Page } from '@playwright/test';

/** Scroll through the whole page so every section reveals. */
export async function revealAll(page: Page) {
  await page.evaluate(async () => {
    const step = Math.max(200, window.innerHeight * 0.6);
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
}
