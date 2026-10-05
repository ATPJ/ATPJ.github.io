import { expect, test } from '@playwright/test';

test('role and focus are visible on the first screen', async ({ page }) => {
  await page.goto('/');
  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toHaveText('ATPJ');
  await expect(page.getByText('Back-end developer · Freelancer')).toBeVisible();
  await expect(page.getByText('on top of LLMs')).toBeVisible();
  // the identity prints within a few seconds and sits inside the first screen
  await expect(h1).toBeInViewport({ timeout: 4000 });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('shows the final state immediately, with no animation', async ({ page }) => {
    await page.goto('/');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveCSS('opacity', '1', { timeout: 300 });
    const animated = await page.evaluate(
      () => document.getAnimations().filter((a) => a instanceof CSSAnimation && a.animationName === 'rise').length,
    );
    expect(animated).toBe(0);
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('all text is still there', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Secret Santa Management System').first()).toBeVisible();
    await expect(page.getByText('amirali.porhonar@gmail.com')).toBeVisible();
  });
});
