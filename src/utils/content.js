// MDX files are imported eagerly. Each module has a default export (the React component)
// and a frontmatter export (the YAML parsed by remark-mdx-frontmatter).

const parseAll = (modules) =>
  Object.keys(modules).map((path) => {
    const mod = modules[path];
    return { ...mod.frontmatter, Content: mod.default };
  });

// Anything with draft: true in its front matter stays out of the built site.
const isPublished = (entry) => entry.draft !== true;

// 1. Projects (Archive)
const PROJECTS = parseAll(
  import.meta.glob('/src/content/projects/*.mdx', { eager: true })
).filter(isPublished);

// 2. Posts (Manifesto) — newest first
const POSTS = parseAll(
  import.meta.glob('/src/content/posts/*.mdx', { eager: true })
)
  .filter(isPublished)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getProjects = () => PROJECTS;
export const getPosts = () => POSTS;
