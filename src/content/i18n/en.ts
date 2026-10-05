export const en = {
  htmlLang: 'en',
  dir: 'ltr',
  siteTitle: 'ATPJ · Back-end developer',
  siteDescription:
    'Portfolio of ATPJ: a back-end developer and freelancer building LLM-powered tools and automation, deployed with Docker on Linux servers.',
  skip: 'Skip to content',
  nav: {
    label: 'Sections',
    home: 'home',
    about: 'about',
    skills: 'skills',
    projects: 'projects',
    style: 'style',
    contact: 'contact',
  },
  langSwitch: { label: 'فارسی', aria: 'Switch language to Persian' },
  about: { title: 'About' },
  skills: {
    title: 'Skills',
    legend: 'Color key',
    category: 'category',
    name: 'name',
  },
  categories: {
    language: 'language',
    framework: 'framework',
    ai: 'ai',
    automation: 'automation',
    infra: 'infra',
    data: 'data',
  },
  projects: {
    title: 'Projects',
    stack: 'stack',
    general: 'described in general terms',
    verified: 'in detail',
  },
  style: { title: 'Working style' },
  contact: {
    title: 'Contact',
    intro: 'Find me here.',
    copy: 'Copy email',
    copied: 'Email copied',
    copyFailed: 'Could not copy. Select the address instead.',
  },
  footer: 'Built with Astro. Hosted on GitHub Pages.',
};

export type Strings = typeof en;
