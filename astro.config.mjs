import { defineConfig } from 'astro/config';

// SITE/BASE come from the environment so the same build works at the root of a
// user site (default), under a repository subpath, or on a custom domain.
const site = process.env.SITE || 'https://atpj.github.io';
const base = process.env.BASE || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
});
