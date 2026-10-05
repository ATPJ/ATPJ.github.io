import { z } from 'astro/zod';

/** Every user-visible string exists in both languages; a missing one fails the build. */
export const localized = <T extends z.ZodTypeAny>(inner: T) => z.object({ en: inner, fa: inner });
const text = localized(z.string().min(1));

export const categories = ['language', 'framework', 'ai', 'automation', 'infra', 'data'] as const;
export const categorySchema = z.enum(categories);
export type Category = z.infer<typeof categorySchema>;

export const linkSchema = z
  .object({
    kind: z.enum(['github', 'email', 'linkedin', 'telegram']),
    label: z.string().min(1),
    url: z.string().min(1).optional(),
    placeholder: z.boolean().optional(),
  })
  .refine((l) => Boolean(l.url) || l.placeholder === true, {
    message: 'a link needs a url or placeholder: true',
  });

export const profileSchema = z.object({
  handle: z.string().min(1),
  role: text,
  tagline: text,
  about: z.array(text).min(1),
  links: z.array(linkSchema).min(1),
});

export const skillGroupSchema = z.object({
  id: z.string().min(1),
  title: text,
  summary: text,
  items: z.array(z.object({ name: text, category: categorySchema })).min(1),
});

export const projectSchema = z
  .object({
    id: z.string().min(1),
    kind: z.enum(['verified', 'general']),
    title: text,
    summary: text,
    stack: z.array(z.string().min(1)).optional(),
    contributions: z.array(text).optional(),
    status: text.optional(),
    url: z.string().optional(),
  })
  .superRefine((p, ctx) => {
    if (p.kind === 'verified' && (!p.stack?.length || !p.contributions?.length)) {
      ctx.addIssue({ code: 'custom', message: `verified project "${p.id}" needs stack and contributions` });
    }
    if (p.kind === 'general' && p.url) {
      ctx.addIssue({ code: 'custom', message: `general project "${p.id}" must not have a url` });
    }
  });

export const softSkillSchema = z.object({ id: z.string().min(1), title: text, text });

/** Throws when ids repeat; ids are used as anchors and keys. */
export function assertUnique(ids: string[], what: string) {
  const dup = ids.find((id, i) => ids.indexOf(id) !== i);
  if (dup) throw new Error(`duplicate ${what} id: ${dup}`);
}
