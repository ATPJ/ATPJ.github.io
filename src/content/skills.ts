import { z } from 'astro/zod';
import { assertUnique, skillGroupSchema, type Category } from './schema';

const both = (s: string) => ({ en: s, fa: s });
const item = (name: string | { en: string; fa: string }, category: Category) => ({
  name: typeof name === 'string' ? both(name) : name,
  category,
});

export const skillGroups = z.array(skillGroupSchema).parse([
  {
    id: 'python',
    title: { en: 'Python & frameworks', fa: 'Python و فریم‌ورک‌ها' },
    summary: {
      en: 'Backends with FastAPI and Django, plus the libraries around them.',
      fa: 'بک‌اند با FastAPI و Django و کتابخانه‌های اطراف آن‌ها.',
    },
    items: [
      item('Python', 'language'),
      item('FastAPI', 'framework'),
      item('Django', 'framework'),
      item('Pydantic', 'framework'),
      item('SQLAlchemy', 'data'),
      item('aiogram', 'framework'),
      item('asyncio', 'language'),
    ],
  },
  {
    id: 'ai-llm',
    title: { en: 'AI & LLM', fa: 'هوش مصنوعی و LLM' },
    summary: {
      en: 'The LLM sits at the core of the project. Offline and open-source models included.',
      fa: 'LLM هسته‌ی اصلی پروژه است. از مدل‌های آفلاین و متن‌باز هم استفاده می‌کنم.',
    },
    items: [
      item({ en: 'LLM-based projects', fa: 'پروژه‌های مبتنی بر LLM' }, 'ai'),
      item({ en: 'Offline models', fa: 'مدل‌های آفلاین' }, 'ai'),
      item({ en: 'Open-source models', fa: 'مدل‌های متن‌باز' }, 'ai'),
    ],
  },
  {
    id: 'automation',
    title: { en: 'Automation', fa: 'اتوماسیون' },
    summary: {
      en: 'Tools that produce results on their own, tuned a little more on every iteration.',
      fa: 'ابزارهایی که خودکار نتیجه تولید می‌کنند و در هر نوبت کمی بهتر تنظیم می‌شوند.',
    },
    items: [
      item({ en: 'Telegram content generation', fa: 'تولید محتوا برای تلگرام' }, 'automation'),
      item({ en: 'Telegram bots', fa: 'ربات‌های تلگرام' }, 'automation'),
      item({ en: 'Iterative output tuning', fa: 'بهبود تکرارشونده‌ی نتیجه' }, 'automation'),
    ],
  },
  {
    id: 'devops',
    title: { en: 'DevOps & deployment', fa: 'DevOps و استقرار' },
    summary: {
      en: 'Docker for everything, Linux servers, deploys through Git, Cloudflare in front.',
      fa: 'Docker برای همه‌چیز، سرور لینوکسی، deploy با Git و Cloudflare در جلو.',
    },
    items: [
      item('Docker', 'infra'),
      item('docker-compose', 'infra'),
      item('Git', 'infra'),
      item('GitHub Actions', 'infra'),
      item({ en: 'Deploy via Git', fa: 'deploy با Git' }, 'infra'),
      item('Linux (Ubuntu/Debian)', 'infra'),
      item('Nginx', 'infra'),
      item('Reverse proxy', 'infra'),
      item('Cloudflare CDN', 'infra'),
      item('Cloudflare origin certificate', 'infra'),
      item('SSL/TLS', 'infra'),
      item('DNS', 'infra'),
    ],
  },
  {
    id: 'data',
    title: { en: 'Data & APIs', fa: 'داده و API' },
    summary: {
      en: 'PostgreSQL and SQL behind REST APIs.',
      fa: 'PostgreSQL و SQL پشت REST API.',
    },
    items: [item('PostgreSQL', 'data'), item('SQL', 'data'), item('REST API', 'framework')],
  },
]);

assertUnique(skillGroups.map((g) => g.id), 'skill group');
