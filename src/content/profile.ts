import { profileSchema } from './schema';

export const profile = profileSchema.parse({
  handle: 'ATPJ',
  role: {
    en: 'Back-end developer · Freelancer',
    fa: 'برنامه‌نویس بک‌اند · فریلنسر',
  },
  tagline: {
    en: 'I build tools and automation systems on top of LLMs, and ship them in Docker on Linux servers.',
    fa: 'ابزار و سیستم‌های اتوماسیون مبتنی بر LLM می‌سازم و با Docker روی سرورهای لینوکسی deploy می‌کنم.',
  },
  about: [
    {
      en: 'I work as a freelancer on a variety of Python projects. My focus is tools and automation systems driven by AI, and I use modern tooling and AI assistance to move each project forward.',
      fa: 'به‌عنوان فریلنسر روی پروژه‌های مختلف Python کار می‌کنم. تمرکزم روی ساخت ابزارها و سیستم‌های اتوماسیون مبتنی بر هوش مصنوعی است و برای پیشبرد پروژه‌ها از ابزارهای مدرن و کمک هوش مصنوعی استفاده می‌کنم.',
    },
    {
      en: 'Many of my projects have an LLM at the core. I know how to run offline and open-source models and build tools on top of them, such as generating content for Telegram channels automatically, then improving the automation each time the details change.',
      fa: 'در بسیاری از پروژه‌هایم LLM هسته‌ی اصلی است. با مدل‌های آفلاین و متن‌باز کار می‌کنم و روی آن‌ها ابزار می‌سازم؛ مثلاً تولید خودکار محتوا برای کانال‌های تلگرام، و بهتر کردن نتیجه‌ی اتوماسیون با هر تغییر در جزئیات.',
    },
    {
      en: 'I am a computer science graduate.',
      fa: 'فارغ‌التحصیل علوم کامپیوتر هستم.',
    },
  ],
  links: [
    { kind: 'github', label: 'GitHub', url: 'https://github.com/ATPJ' },
    { kind: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/amirali-porhonar-920b0b266/' },
    { kind: 'email', label: 'Email', url: 'mailto:amirali.porhonar@gmail.com' },
  ],
});

export const email = 'amirali.porhonar@gmail.com';
