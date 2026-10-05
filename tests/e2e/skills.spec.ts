import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { skillGroups } from '../../src/content/skills';
import { pick, type Lang } from '../../src/lib/i18n';
import { revealAll } from './helpers';

for (const [lang, route] of [
  ['en', '/'],
  ['fa', '/fa/'],
] as [Lang, string][]) {
  test(`every skill renders with a category marker (${lang})`, async ({ page }) => {
    await page.goto(route);
    await revealAll(page);
    const section = page.locator('#skills');
    const total = skillGroups.reduce((n, g) => n + g.items.length, 0);
    await expect(section.locator('tbody tr')).toHaveCount(total);
    await expect(section.locator('td.cat')).toHaveCount(total);
    for (const g of skillGroups) {
      await expect(section.getByRole('heading', { name: pick(g.title, lang) })).toBeVisible();
      for (const it of g.items) {
        await expect(section.getByText(pick(it.name, lang), { exact: true }).first()).toBeVisible();
      }
    }
    // each category color has a legend entry with a text label
    await expect(section.locator('.legend li')).toHaveCount(6);
  });

  test(`skills section has no accessibility violations (${lang})`, async ({ page }) => {
    await page.goto(route);
    await revealAll(page);
    await page.waitForTimeout(1600);
    const r = await new AxeBuilder({ page }).include('#skills').analyze();
    expect(r.violations).toEqual([]);
  });
}
