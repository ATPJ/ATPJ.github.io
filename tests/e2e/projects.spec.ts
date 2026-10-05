import { expect, test } from '@playwright/test';
import { revealAll } from './helpers';

test('verified project shows stack and contributions; general ones show no names or links', async ({ page }) => {
  await page.goto('/');
  await revealAll(page);
  const commits = page.locator('#projects .commit');
  await expect(commits).toHaveCount(4);
  await expect(commits.locator('h3')).toHaveText([
    'ATPJ Whisper',
    'Telegram content automation',
    'Nginx reverse proxy for web apps',
    'Secret Santa Management System',
  ]);

  const verified = commits.filter({ hasText: 'Secret Santa Management System' });
  await expect(verified.locator('.tags li')).toHaveText(['Python', 'Django', 'PostgreSQL', 'Docker', 'docker-compose', 'Git']);
  await expect(verified.locator('.contrib li')).toHaveCount(3);
  await expect(verified.locator('h3 a')).toHaveAttribute('href', 'https://github.com/ATPJ/django-secretsanta');

  const general = page.locator('#projects .commit.general');
  await expect(general).toHaveCount(2);
  await expect(general.first().locator('.tags li')).toHaveText(['Python', 'aiogram', 'SQLAlchemy', 'SQLite', 'LLM']);
  await expect(general.locator('a')).toHaveCount(0);

  const whisper = commits.filter({ hasText: 'ATPJ Whisper' });
  await expect(whisper.locator('h3 a')).toHaveAttribute('href', 'https://github.com/ATPJ/ATPJ-Whisper');
});

test('no empty or placeholder links anywhere', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page.locator('a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  for (const h of hrefs) expect(h && h !== '#').toBeTruthy();
});
