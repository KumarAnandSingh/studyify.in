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
 codex/set-article-category-to-popular
    id: 'quantum-computing-beyond-classical',
    title: 'Quantum Computing: A Leap Beyond Classical Limits',
    // Quantum computing is a technology topic but not strictly AI; classify under Tech
    category: 'Tech',
    image: 'quantum-computing.png',
    date: formatDate(2025, 7, 26),
    excerpt: 'Quantum computers leverage the principles of quantum mechanics to solve problems far beyond the reach of classical machines, with implications for cryptography, materials and drug discovery.',
    content: `
      <p>Quantum computing harnesses the strange behaviour of subatomic particles to process information in ways that defy classical logic. Where a traditional bit can be either 0 or 1, a quantum bit—or qubit—can exist in a superposition of states. This allows quantum computers to explore many possibilities simultaneously and tackle problems that would overwhelm today’s fastest supercomputers.</p>
      <p>Analysts note that quantum computing is still “nascent but poised to revolutionize industries”【533093604553966†L160-L169】. Early applications include cracking encryption algorithms, optimising complex logistical problems and accelerating drug discovery by accurately modelling molecular structures【533093604553966†L160-L166】. Although practical quantum machines are limited today, the field is advancing rapidly.</p>
      <p>In the coming years, expect hybrid approaches where classical and quantum processors work together. As hardware improves and error‑correction techniques mature, quantum computing could unlock entirely new industries and redefine what’s computationally possible.</p>
    `,
    tags: ['quantum-computing', 'future-tech', 'computing']
  },
  {
    id: '5g-expansion-connected-world',
    title: '5G Expansion: Powering the Connected World',
    category: 'Tech',
    image: '5g-network.png',
    date: formatDate(2025, 7, 26),
    excerpt: 'The rollout of 5G networks delivers blazing speeds and low latency, enabling the next generation of connected devices—from IoT sensors to augmented reality and autonomous vehicles.',
    content: `
      <p>Fifth‑generation mobile networks promise download and upload speeds up to ten times faster than 4G and latency measured in milliseconds【533093604553966†L173-L186】. This leap isn’t just about streaming high‑definition video more smoothly—it underpins an entire ecosystem of real‑time applications.</p>
      <p>5G’s high‑speed, low‑latency connections allow billions of Internet‑of‑Things devices to communicate efficiently, support immersive augmented‑reality experiences and give autonomous vehicles the split‑second data they need to operate safely【533093604553966†L173-L180】. As networks roll out globally, this connectivity will enable smart factories, remote surgeries and city infrastructures that respond instantly to changing conditions.</p>
      <p>For consumers, 5G will make cloud gaming and mixed‑reality learning seamless. For businesses, it will unlock new business models where sensors and real‑time analytics drive decision‑making. In short, 5G expansion is the connective tissue linking emerging technologies together.</p>
    `,
    tags: ['5g', 'connectivity', 'networks']
  },
  {
    id: 'virtual-augmented-reality-immersive-experiences',
    title: 'Virtual & Augmented Reality: Immersive Experiences',
    category: 'Tech',
    image: 'vr-ar.png',
    date: formatDate(2025, 7, 26),
    excerpt: 'Improved VR and AR hardware is making immersive experiences part of everyday life—from gaming and training to retail and education.',
    content: `
      <p>Virtual reality has come a long way since its early days. New VR systems feature sharper displays, better motion tracking and lighter headsets【533093604553966†L189-L197】, delivering truly immersive simulations for gaming, professional training and therapy.</p>
      <p>Augmented reality overlays digital information onto the real world through glasses and mobile devices. It’s poised to transform industries like retail, real estate and education by helping users visualise products and concepts【533093604553966†L199-L208】. Improved hardware—such as advanced AR glasses—makes these experiences more comfortable and natural.</p>
      <p>As VR and AR merge into extended reality (XR), expect hybrid experiences that blend physical and digital realms. Whether exploring a virtual campus or previewing furniture in your living room, immersive technology will continue to expand how we learn, play and work.</p>
    `,
    tags: ['virtual-reality', 'augmented-reality', 'immersive-tech']
  },
  {
    id: 'iot-smart-cities',
    title: 'Internet of Things: Building Smarter Cities',
    category: 'Tech',
    image: 'iot.png',
    date: formatDate(2025, 7, 26),
    excerpt: 'Networks of sensors and connected devices are turning cities into intelligent systems that manage resources efficiently and improve residents’ quality of life.',
    content: `
      <p>The Internet of Things (IoT) is more than connected gadgets—it’s the nervous system of modern infrastructure. Smart sensors embedded throughout cities collect data on traffic, energy use, air quality and public safety【533093604553966†L214-L219】. By analysing this data, city managers can reduce congestion, optimise power grids and respond quickly to emergencies.</p>
      <p>Worldwide, the number of IoT devices is projected to reach roughly 30&nbsp;billion by 2025【533093604553966†L223-L224】. This explosive growth enables real‑time decision‑making at unprecedented scale, from adaptive street lights that dim when no one is around to connected waste bins that signal when they need emptying.</p>
      <p>For individuals, IoT translates into smarter homes, wearables that monitor health and vehicles that communicate with each other. For society, it paves the way for safer, cleaner and more efficient urban living.</p>
    `,
    tags: ['iot', 'smart-cities', 'connected-devices']
  },
  {
    id: 'edge-computing-real-time',
    title: 'Edge Computing: Real‑Time Processing at the Source',
    category: 'Tech',
    image: 'edge-computing.png',
    date: formatDate(2025, 7, 26),
    excerpt: 'By processing data close to where it’s generated, edge computing reduces latency and makes applications like autonomous vehicles and industrial automation possible.',
    content: `
      <p>Traditional cloud computing requires sending data to distant data centres for processing. Edge computing flips that model by performing computations near the source of data generation. This is crucial for applications that can’t tolerate the delays of round‑trip communications.</p>
      <p>The approach is particularly important for autonomous vehicles, industrial IoT and remote sensors, which need to make split‑second decisions【533093604553966†L258-L264】. By keeping processing local, edge computing improves reliability and reduces bandwidth costs.</p>
      <p>As more devices come online and demand immediate responses, expect edge computing to become an integral part of the digital infrastructure, complementing cloud services rather than replacing them.</p>
    `,
    tags: ['edge-computing', 'real-time', 'iot']
  },
  {
    id: 'ai-cybersecurity-defenses',
    title: 'AI in Cybersecurity: Defending Against Evolving Threats',
    category: 'Popular',
    subcategory: 'AI',
    image: 'ai-cybersecurity.png',
    date: formatDate(2025, 7, 26),
    excerpt: 'With cyber attacks growing in sophistication, AI-driven systems are automating threat detection, predicting attacks and responding in real time.',

    id: 'ai-agents-autonomy',
    title: 'AI Agents and Autonomous Programs',
    category: 'AI',
    subcategory: 'Agents',
    image: 'ai-agents.png',
    date: formatDate(2025, 8, 2),
    excerpt: 'Autonomous AI agents are beginning to handle complex tasks with minimal supervision.',
 main
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
