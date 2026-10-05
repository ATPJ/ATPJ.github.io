import { z } from 'astro/zod';
import { assertUnique, softSkillSchema } from './schema';

// the three traits stated in sources/aboutme.md, phrased from facts already on this site
export const softSkills = z.array(softSkillSchema).parse([
  {
    id: 'teamwork',
    title: { en: 'Teamwork', fa: 'کار تیمی' },
    text: {
      en: 'Teamwork matters to me. I work with clients and teammates, and I build things so others can pick them up and keep going.',
      fa: 'کار تیمی برایم مهم است. با کارفرما و هم‌تیمی‌ها کار می‌کنم و کارها را طوری می‌سازم که دیگران هم بتوانند ادامه‌شان بدهند.',
    },
  },
  {
    id: 'growth',
    title: { en: 'Growth', fa: 'رشد' },
    text: {
      en: 'I care about growth and keep learning. New models, new tools and AI assistance all go into moving each project forward.',
      fa: 'به پیشرفت و یادگیری مداوم علاقه دارم. مدل‌ها و ابزارهای تازه و کمک هوش مصنوعی همگی در پیشبرد پروژه‌ها به کار می‌آیند.',
    },
  },
  {
    id: 'problem-solving',
    title: { en: 'Problem solving', fa: 'حل مسئله' },
    text: {
      en: 'I enjoy solving problems. When the details change, I come back and tune the automation until the result is right again.',
      fa: 'حل مسئله برایم لذت‌بخش است. وقتی جزئیات عوض می‌شود، دوباره سراغ اتوماسیون می‌روم و آن را تنظیم می‌کنم تا نتیجه درست شود.',
    },
  },
]);

assertUnique(softSkills.map((s) => s.id), 'soft skill');
