import { expect, test } from '@playwright/test';
import { revealAll } from './helpers';

test('contact links and copy confirmation', async ({ page, context, browserName }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
  await page.goto('/');
  await revealAll(page);
  const c = page.locator('#contact');

  await expect(c.getByRole('link', { name: /github\.com\/ATPJ/ })).toHaveAttribute('href', 'https://github.com/ATPJ');
  await expect(c.getByRole('link', { name: /linkedin\.com/ })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/amirali-porhonar-920b0b266/',
  );
  await expect(c.getByRole('link', { name: /gmail\.com/ })).toHaveAttribute('href', 'mailto:amirali.porhonar@gmail.com');
  await expect(c.getByText(/telegram/i)).toHaveCount(0);

  await c.getByRole('button', { name: 'Copy email' }).click();
  await expect(c.locator('[data-copy-status]')).toHaveText('Email copied');
  await expect(c.locator('[data-copy-status]')).toHaveAttribute('aria-live', 'polite');
  if (browserName === 'chromium') {
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('amirali.porhonar@gmail.com');
  }
});

test('soft skills show only the three stated traits', async ({ page }) => {
  await page.goto('/');
  await revealAll(page);
  await expect(page.locator('#soft-skills .traits li')).toHaveText([/Teamwork/, /growth/, /solving problems/]);
});
