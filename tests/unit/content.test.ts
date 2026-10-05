import { describe, expect, it } from 'vitest';
import { assertUnique, categories, linkSchema, profileSchema, projectSchema, skillGroupSchema } from '../../src/content/schema';
import { profile } from '../../src/content/profile';
import { skillGroups } from '../../src/content/skills';
import { projects } from '../../src/content/projects';
import { softSkills } from '../../src/content/soft-skills';
import { en } from '../../src/content/i18n/en';
import { fa } from '../../src/content/i18n/fa';
import { url } from '../../src/lib/i18n';
import { readFileSync } from 'node:fs';

const loc = (s: string) => ({ en: s, fa: s });

describe('content schema', () => {
  it('rejects a Localized value that lacks fa', () => {
    const bad = { ...profile, role: { en: 'x' } };
    expect(profileSchema.safeParse(bad).success).toBe(false);
  });

  it('rejects a link with neither url nor placeholder', () => {
    expect(linkSchema.safeParse({ kind: 'github', label: 'GitHub' }).success).toBe(false);
    expect(linkSchema.safeParse({ kind: 'telegram', label: 'Telegram', placeholder: true }).success).toBe(true);
  });

  it('requires stack and contributions on verified projects', () => {
    const base = { id: 'p', kind: 'verified', title: loc('t'), summary: loc('s') };
    expect(projectSchema.safeParse(base).success).toBe(false);
  });

  it('forbids a url on general projects', () => {
    const general = { id: 'g', kind: 'general', title: loc('t'), summary: loc('s'), url: 'https://example.com' };
    expect(projectSchema.safeParse(general).success).toBe(false);
  });

  it('rejects duplicate ids', () => {
    expect(() => assertUnique(['a', 'b', 'a'], 'x')).toThrow(/duplicate/);
  });

  it('rejects a skill with an unknown category', () => {
    const g = { id: 'g', title: loc('t'), summary: loc('s'), items: [{ name: loc('n'), category: 'magic' }] };
    expect(skillGroupSchema.safeParse(g).success).toBe(false);
  });
});

describe('real content', () => {
  it('has the three verified contact links', () => {
    const urls = profile.links.map((l) => l.url);
    expect(urls).toContain('https://github.com/ATPJ');
    expect(urls).toContain('mailto:amirali.porhonar@gmail.com');
    expect(urls).toContain('https://www.linkedin.com/in/amirali-porhonar-920b0b266/');
  });

  it('keeps two verified projects and no links on general ones', () => {
    expect(projects.filter((p) => p.kind === 'verified')).toHaveLength(2);
    for (const p of projects.filter((p) => p.kind === 'general')) expect(p.url).toBeUndefined();
  });

  it('has the three stated soft skills', () => {
    expect(softSkills.map((s) => s.id)).toEqual(['teamwork', 'growth', 'problem-solving']);
  });

  it('maps every skill category to a color token', () => {
    const css = readFileSync('src/styles/tokens.css', 'utf8');
    for (const c of categories) expect(css).toContain(`--c-${c}:`);
    for (const g of skillGroups) for (const i of g.items) expect(categories).toContain(i.category);
  });
});

describe('i18n', () => {
  const keys = (o: unknown, prefix = ''): string[] =>
    Object.entries(o as Record<string, unknown>).flatMap(([k, v]) =>
      typeof v === 'object' && v !== null ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
    );

  it('has the same UI string keys in en and fa', () => {
    expect(keys(fa).sort()).toEqual(keys(en).sort());
  });

  it('sets direction per language', () => {
    expect(en.dir).toBe('ltr');
    expect(fa.dir).toBe('rtl');
  });
});

describe('url helper', () => {
  it('joins the base path without double slashes', () => {
    expect(url('')).toBe('/');
    expect(url('fa/')).toBe('/fa/');
    expect(url('/favicon.svg')).toBe('/favicon.svg');
  });
});
