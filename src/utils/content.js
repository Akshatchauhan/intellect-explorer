import fm from 'front-matter';

// Markdown is compiled in at build time by Vite's import.meta.glob, so the
// parsed result never changes at runtime — parse once at module load rather
// than on every call. (Logo and the page components each call these on every
// route change.)

const parseAll = (modules) =>
  Object.keys(modules).map((path) => {
    const { attributes, body } = fm(modules[path]);
    return { ...attributes, content: body };
  });

// Anything with `draft: true` in its front matter stays out of the built site.
const isPublished = (entry) => entry.draft !== true;

// 1. Projects (Archive)
const PROJECTS = parseAll(
  import.meta.glob('/src/content/projects/*.md', { query: '?raw', import: 'default', eager: true })
).filter(isPublished);

// 2. Posts (Manifesto) — newest first
const POSTS = parseAll(
  import.meta.glob('/src/content/posts/*.md', { query: '?raw', import: 'default', eager: true })
)
  .filter(isPublished)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getProjects = () => PROJECTS;
export const getPosts = () => POSTS;
