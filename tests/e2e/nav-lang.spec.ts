import { expect, test } from '@playwright/test';

const sections = ['hero', 'about', 'skills', 'projects', 'soft-skills', 'contact'];
const toEnglish = 'تغییر زبان به انگلیسی';

test('every nav item reaches its section and is marked current', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Sections' });
  for (const [i, id] of sections.entries()) {
    await nav.locator('a').nth(i).click();
    await expect(page.locator(`#${id}`)).toBeInViewport();
    await expect(nav.locator('a[aria-current="true"]')).toHaveAttribute('href', `#${id}`);
  }
});

test('language switch moves between routes and the choice is remembered', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await page.getByRole('link', { name: 'Switch language to Persian' }).click();
  await expect(page).toHaveURL(/\/fa\/$/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  // code stays left-to-right on the Persian page
  await expect(page.locator('.log')).toHaveCSS('direction', 'ltr');

  // the choice sticks: opening the root again sends us back to /fa/
  await page.goto('/');
  await expect(page).toHaveURL(/\/fa\/$/);

  await page.getByRole('link', { name: toEnglish }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test.describe('Persian browser', () => {
  test.use({ locale: 'fa-IR' });

  test('first visit to / goes to /fa/', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/fa\/$/);
  });

  test('an explicit English choice is respected', async ({ page }) => {
    await page.goto('/fa/');
    await page.getByRole('link', { name: toEnglish }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

test.describe('English browser', () => {
  test.use({ locale: 'en-US' });

  test('stays on / on first visit', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(300);
    await expect(page).not.toHaveURL(/fa/);
  });
});
