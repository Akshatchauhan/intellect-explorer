import fm from 'front-matter';

// 1. Load Projects
export const getProjects = () => {
  // "import.meta.glob" is a Vite magic spell that finds files
  const modules = import.meta.glob('/src/content/projects/*.md', { as: 'raw', eager: true });
  
  const projects = Object.keys(modules).map((path) => {
    const { attributes, body } = fm(modules[path]); // Split Top (Attributes) from Bottom (Body)
    return { ...attributes, content: body };
  });

  return projects;
};

// 2. Load Posts (Journal)
export const getPosts = () => {
  const modules = import.meta.glob('/src/content/posts/*.md', { as: 'raw', eager: true });
  
  const posts = Object.keys(modules).map((path) => {
    const { attributes, body } = fm(modules[path]);
    return { ...attributes, content: body };
  });

  // Sort by Date (Newest First)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};
