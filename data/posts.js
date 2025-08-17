/*
 * posts.js
 *
 * This file defines the data used throughout the Studyify blog. Each post
 * is represented as an object containing metadata and the full HTML content.
 * When creating new articles you can add additional objects to the exported
 * `posts` array. Slugs should remain unique and serve as stable identifiers.
 */

// Generate a nicely formatted ISO date string (e.g. 2025-07-26)
function formatDate(year, month, day) {
  const dt = new Date(year, month - 1, day);
  return dt.toISOString().split('T')[0];
}

// Posts array exported as a global variable so it can be consumed by other scripts
const posts = [
  {
    id: 'rise-of-aiml',
    title: 'Rise of AI & Machine Learning',
    category: 'AI',
    subcategory: 'Machine Learning',
    image: 'aiml.png',
    date: formatDate(2025, 8, 1),
    excerpt: 'AI and machine learning are reshaping industries from healthcare to finance.',
    content: `
      <p>Artificial intelligence and machine learning have moved from research labs into everyday products. Companies are using predictive algorithms to enhance decision‑making and automate routine tasks.</p>
      <p>As data availability grows, these technologies will continue to evolve, unlocking new possibilities and raising important ethical questions.</p>
    `,
    tags: ['ai', 'machine-learning', 'innovation']
  },
  {
    id: 'ai-agents-autonomy',
    title: 'AI Agents and Autonomous Programs',
    category: 'AI',
    subcategory: 'Agents',
    image: 'ai-agents.png',
    date: formatDate(2025, 8, 2),
    excerpt: 'Autonomous AI agents are beginning to handle complex tasks with minimal supervision.',
    content: `
      <p>From customer support bots to trading algorithms, AI agents operate with increasing independence. These programs can plan, reason and act based on high‑level goals.</p>
      <p>Developers must design careful safeguards to ensure agents remain aligned with human values as their capabilities grow.</p>
    `,
    tags: ['ai', 'agents', 'autonomy']
  },
  {
    id: 'gpt5-next-gen',
    title: 'GPT‑5: Next-generation language models',
    category: 'AI',
    subcategory: 'Language Models',
    image: 'gpt5.png',
    date: formatDate(2025, 8, 3),
    excerpt: 'GPT‑5 promises more accurate and context‑aware text generation.',
    content: `
      <p>The upcoming GPT‑5 model is expected to push the boundaries of natural language understanding. With larger training datasets and improved architectures, it aims to deliver more reliable outputs.</p>
      <p>Researchers are also focusing on reducing hallucinations and enhancing reasoning abilities, making the model suitable for a wider range of applications.</p>
    `,
    tags: ['gpt5', 'language-models', 'nlp']
  },
  {
    id: 'claude-code-assistants',
    title: 'Claude Code and AI-powered coding assistants',
    category: 'Tech',
    subcategory: 'Development',
    image: 'claude-code.png',
    date: formatDate(2025, 8, 4),
    excerpt: 'New AI coding tools like Claude Code are transforming software development workflows.',
    content: `
      <p>AI coding assistants can generate boilerplate code, suggest fixes and even write entire functions based on natural language prompts. Claude Code joins the growing list of tools helping developers stay productive.</p>
      <p>While these assistants accelerate development, engineers still need to review outputs carefully to maintain code quality and security.</p>
    `,
    tags: ['coding', 'ai-assistants', 'development']
  }
];

// Expose posts globally (important for inline script tags)
// Export the posts array so it can be imported in Next.js pages
export default posts;
