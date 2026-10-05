import { expect, test, type Page } from '@playwright/test';

const ids = ['hero', 'about', 'skills', 'projects', 'soft-skills', 'contact'];
const revealed = (page: Page) =>
  page.evaluate(() => [...document.querySelectorAll<HTMLElement>('[data-section]')].map((s) => s.dataset.revealed));

test('text is in the initial HTML, motion waits for the section', async ({ page, request }) => {
  const html = await (await request.get('/')).text();
  expect(html).toContain('Secret Santa Management System');
  expect(html).toContain('amirali.porhonar@gmail.com');

  await page.goto('/');
  await expect(page.locator('#hero')).toHaveAttribute('data-revealed', 'true');
  // far below the first screen: still waiting, items not yet animated
  await expect(page.locator('#contact')).toHaveAttribute('data-revealed', 'false');
  await expect(page.locator('#contact .links li').first()).toHaveCSS('opacity', '0');
  // nothing in a waiting section is animating yet (not even the blinking cursor)
  expect(await page.evaluate(() => document.querySelector('#contact')!.getAnimations({ subtree: true }).length)).toBe(0);

  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('#contact')).toHaveAttribute('data-revealed', 'true');
  await expect(page.locator('#contact .links li').first()).toHaveCSS('opacity', '1');
});

test('a section never un-reveals', async ({ page }) => {
  await page.goto('/');
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('#projects')).toHaveAttribute('data-revealed', 'true');
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(300);
  await expect(page.locator('#projects')).toHaveAttribute('data-revealed', 'true');
});

test('jumping to #contact leaves no blank sections behind', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /contact/ }).first().click();
  await expect.poll(() => revealed(page)).toEqual(ids.map(() => 'true'));
});

test('reloading mid-page shows the sections above', async ({ page }) => {
  await page.goto('/#skills');
  await page.waitForFunction(() => document.querySelector('#skills')!.getBoundingClientRect().top < innerHeight); // let the (smooth) anchor jump finish
  await page.reload();
  await page.waitForFunction(() => document.querySelector('#skills')!.getBoundingClientRect().top < innerHeight);
  await expect.poll(async () => (await revealed(page)).slice(0, 3)).toEqual(['true', 'true', 'true']);
  for (const id of ['about', 'skills']) {
    await expect(page.locator(`#${id} [data-r]`).first()).toHaveCSS('opacity', '1');
  }
});
