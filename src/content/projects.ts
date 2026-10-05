import { z } from 'astro/zod';
import { assertUnique, projectSchema } from './schema';

// ordered by usefulness, most useful first
export const projects = z.array(projectSchema).parse([
  {
    id: 'atpj-whisper',
    kind: 'verified',
    title: { en: 'ATPJ Whisper', fa: 'ATPJ Whisper' },
    url: 'https://github.com/ATPJ/ATPJ-Whisper',
    summary: {
      en: 'A Windows dictation tool that transcribes speech locally with Whisper and pastes the text into any app.',
      fa: 'ابزار دیکته برای ویندوز که گفتار را به‌صورت محلی با Whisper به متن تبدیل می‌کند و در هر برنامه‌ای paste می‌کند.',
    },
    stack: ['Python', 'faster-whisper', 'PySide6', 'SQLite', 'CUDA'],
    contributions: [
      {
        en: 'Built hold-to-talk dictation with a global hotkey, running fully offline with an optional GPU.',
        fa: 'دیکته با نگه‌داشتن کلید میان‌بر سراسری را ساختم که کاملاً آفلاین و با GPU اختیاری اجرا می‌شود.',
      },
      {
        en: 'Added Persian and English support, a learning system for user corrections, and history with audio playback.',
        fa: 'پشتیبانی از فارسی و انگلیسی، سیستم یادگیری اصلاحات کاربر و تاریخچه همراه با پخش صدا را اضافه کردم.',
      },
    ],
  },
  {
    id: 'telegram-automation',
    kind: 'general',
    title: { en: 'Telegram content automation', fa: 'اتوماسیون تولید محتوا برای تلگرام' },
    summary: {
      en: 'A Telegram bot that collects tech and AI news from primary sources, drafts Persian posts, sends them to an admin for approval, and publishes approved posts to a channel on a schedule.',
      fa: 'ربات تلگرامی که اخبار فناوری و هوش مصنوعی را از منابع دست‌اول جمع می‌کند، پیش‌نویس پست فارسی می‌سازد، برای تأیید ادمین می‌فرستد و پست‌های تأییدشده را طبق زمان‌بندی در کانال منتشر می‌کند.',
    },
    stack: ['Python', 'aiogram', 'SQLAlchemy', 'SQLite', 'LLM'],
    contributions: [
      {
        en: 'The core works without an LLM; an LLM is used only to write a better Persian caption, and it can be switched on or off from the bot.',
        fa: 'بخش اصلی بدون LLM کار می‌کند؛ LLM فقط برای نوشتن کپشن فارسی بهتر است و از داخل ربات روشن یا خاموش می‌شود.',
      },
      {
        en: 'Rule-based filtering keeps low-importance news (such as routine release notes) out of drafts and the daily digest, with admin rules and a review list to correct mistakes.',
        fa: 'فیلتر قانون‌محور خبرهای کم‌اهمیت (مثل نسخه‌های معمولی) را از پیش‌نویس‌ها و خلاصه روزانه کنار می‌گذارد و ادمین با قانون‌ها و فهرست بازبینی اشتباه‌ها را اصلاح می‌کند.',
      },
      {
        en: 'Admins edit each draft section, set a custom post template and a default image, and pick a custom publish time.',
        fa: 'ادمین هر بخش پیش‌نویس را ویرایش می‌کند، قالب پست و تصویر پیش‌فرض را تنظیم می‌کند و زمان انتشار دلخواه انتخاب می‌کند.',
      },
      {
        en: 'Stores all data in SQLite and runs behind a proxy for use inside Iran.',
        fa: 'همه‌ی داده‌ها در SQLite ذخیره می‌شود و برای اجرا داخل ایران پشت پراکسی کار می‌کند.',
      },
    ],
  },
  {
    id: 'nginx-reverse-proxy',
    kind: 'general',
    title: { en: 'Nginx reverse proxy for web apps', fa: 'Nginx به‌عنوان reverse proxy برای اپلیکیشن‌های وب' },
    summary: {
      en: 'Nginx configured as a reverse proxy in front of web apps, with TLS between Cloudflare and the origin server using a Cloudflare origin certificate.',
      fa: 'پیکربندی Nginx به‌عنوان reverse proxy جلوی اپلیکیشن‌های وب، با TLS بین Cloudflare و سرور مبدأ از طریق Cloudflare origin certificate.',
    },
    stack: ['Nginx', 'Reverse proxy', 'Cloudflare origin certificate', 'SSL/TLS', 'Linux (Ubuntu/Debian)'],
    contributions: [
      {
        en: 'Set up Nginx to route traffic to web apps running on the same server.',
        fa: 'Nginx را برای هدایت ترافیک به اپلیکیشن‌های وب روی همان سرور پیکربندی کردم.',
      },
      {
        en: 'Secured the connection between Cloudflare and the origin with a Cloudflare origin certificate.',
        fa: 'اتصال بین Cloudflare و سرور مبدأ را با Cloudflare origin certificate امن کردم.',
      },
    ],
  },
  {
    id: 'secret-santa',
    kind: 'verified',
    title: { en: 'Secret Santa Management System', fa: 'Secret Santa Management System' },
    url: 'https://github.com/ATPJ/django-secretsanta',
    summary: {
      en: 'A web backend that manages users and runs a Secret Santa draw.',
      fa: 'بک‌اند وب برای مدیریت کاربران و اجرای فرآیند قرعه‌کشی Secret Santa.',
    },
    stack: ['Python', 'Django', 'PostgreSQL', 'Docker', 'docker-compose', 'Git'],
    contributions: [
      {
        en: 'Built a REST API with Django for user management and the draw process.',
        fa: 'یک REST API با Django برای مدیریت کاربران و فرآیند قرعه‌کشی توسعه دادم.',
      },
      {
        en: 'Set up the development environment with docker-compose: the API service and a PostgreSQL database.',
        fa: 'محیط توسعه را با docker-compose راه‌اندازی کردم: سرویس API و پایگاه داده‌ی PostgreSQL.',
      },
      {
        en: 'Managed the codebase with Git and GitHub throughout development.',
        fa: 'کدبیس را در طول توسعه با Git و GitHub مدیریت کردم.',
      },
    ],
  },
]);

assertUnique(projects.map((p) => p.id), 'project');
