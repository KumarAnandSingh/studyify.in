/*
 * posts.js
 *
 * This file defines the data used throughout the Studyify blog. Each post
 * is represented as an object containing metadata and the full HTML
 * content. When creating new articles you can add additional objects
 * to the exported `posts` array. Slugs should remain unique and serve
 * as stable identifiers across page reloads.
 */

// Generate a nicely formatted ISO date string (e.g. 2025‑07‑26)
function formatDate(year, month, day) {
  const dt = new Date(year, month - 1, day);
  return dt.toISOString().split('T')[0];
}

// Posts array exported as a global variable so it can be consumed by
// other scripts on both the index page and individual article pages.
const posts = [
  {
    id: 'upsc-tips-success',
    title: 'Mastering UPSC Preparation: 13 Effective Tips for Success',
    category: 'UPSC',
    image: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: formatDate(2025, 7, 20),
    excerpt: 'Preparing for the UPSC Civil Services Exam can feel like a marathon. These simple yet powerful habits will keep you on track and motivated throughout the journey.',
    content: `
      <p>The UPSC Civil Services Examination is arguably one of the toughest tests in India. With lakhs of aspirants and only a few hundred positions, it demands not just hard work but smart strategy. The good news? You can dramatically improve your chances by breaking the preparation process into manageable, daily actions.</p>
      <p>Begin by familiarising yourself with the entire syllabus. Spend time analysing past question papers and understand the pattern of questions. This will give you clarity on what to focus on. Next, integrate newspaper reading into your routine. Make short notes based on relevant articles and revise them frequently. NCERT textbooks lay a solid foundation—read them before moving on to more advanced material.</p>
      <p>Planning is half the battle. Create realistic timelines for both long‑term and daily objectives. Join a test series for both the Prelims and Mains; practice under exam conditions is invaluable. Finally, remember that learning doesn’t happen in isolation. Form small discussion groups, practise answer writing together and share feedback. The journey is demanding, but with these habits you’ll stay disciplined, informed and confident.</p>
    `,
    tags: ['strategy', 'habits', 'motivation']
  },
  {
    id: 'ssc-cgl-strategies',
    title: 'Decoding SSC CGL: Strategies and Resources to Ace the Exam',
    category: 'SSC',
    image: 'https://images.pexels.com/photos/598993/pexels-photo-598993.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: formatDate(2025, 7, 18),
    excerpt: 'The SSC Combined Graduate Level (CGL) exam opens the doors to prestigious government jobs. We outline the key topics, best books and a study plan that works.',
    content: `
      <p>The SSC CGL examination consists of several tiers, each designed to assess different skills. Tier I tests general intelligence, reasoning, quantitative aptitude and English comprehension. Tier II dives deeper into quantitative abilities, statistics, economics and finance depending on the post you’re targeting. Understanding the weight of each section helps you allocate your time wisely.</p>
      <p>Start by mastering the basics of arithmetic and geometry, as these topics dominate the quantitative section. For English, work on reading comprehension, grammar and vocabulary simultaneously—read articles, practise mock tests and learn new words daily. Resources like <em>Quantitative Aptitude</em> by R.S. Aggarwal, <em>Objective General English</em> by S.P. Bakshi and daily current affairs updates from reliable portals will form the backbone of your preparation.</p>
      <p>Finally, create a schedule that mixes concept learning, practice questions and revision. Focus on accuracy first, then speed. As the exam approaches, take full‑length mock tests to simulate the actual experience. Review your mistakes carefully; this iterative process is the key to scoring high. With consistent effort and the right resources, cracking SSC CGL becomes an achievable goal.</p>
    `,
    tags: ['cgl', 'resources', 'study-plan']
  },
  {
    id: 'banking-exams-guide',
    title: 'Banking Exams: A Comprehensive Guide to IBPS PO and RBI Grade B',
    category: 'Banking',
    image: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: formatDate(2025, 7, 16),
    excerpt: 'Thinking about a career in banking? This article demystifies the IBPS PO and RBI Grade B exams, detailing the syllabus, preparation strategies and career prospects.',
    content: `
      <p>Banking exams are known for their competitive nature and structured patterns. IBPS PO and RBI Grade B are two of the most sought‑after posts. While IBPS PO opens opportunities across a range of public sector banks, RBI Grade B places you within India’s central bank. Both require a solid understanding of quantitative aptitude, reasoning, English and general awareness.</p>
      <p>For IBPS PO, the exam is held in three phases—Prelims, Mains and Interview. The Prelims test includes quantitative aptitude, reasoning ability and English language. The Mains adds general/economy awareness, letter writing and a descriptive essay. Meanwhile, RBI Grade B Mains includes subjects like finance and management, economic and social issues, and descriptive English.</p>
      <p>A structured plan begins with learning fundamentals from standard textbooks. Supplement this with daily news analysis and monthly banking awareness compilations. Mock tests help you gauge your speed and accuracy under timed conditions. Importantly, each exam emphasises a slightly different set of skills; tailoring your preparation accordingly will set you apart from the competition.</p>
    `,
    tags: ['banking', 'ibps', 'rbi']
  },
  {
    id: 'edtech-trends',
    title: 'Top EdTech Trends Transforming Exam Preparation',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: formatDate(2025, 7, 12),
    excerpt: 'Technology is reshaping how we learn. Discover the innovations—AI tutoring, adaptive learning platforms and more—that are making exam prep more accessible than ever.',
    content: `
      <p>From personalised learning paths to immersive simulations, EdTech is revolutionising education. Adaptive learning platforms analyse a learner’s strengths and weaknesses and deliver customised content. Artificial intelligence tutors provide instant feedback and adjust the difficulty level based on performance. These tools help students focus on what matters most and reduce wasted effort.</p>
      <p>Virtual reality (VR) and augmented reality (AR) are also making their way into exam preparation. Imagine revising geography with an interactive 3D globe or practising anatomy using an AR overlay. Such experiences deepen understanding and improve retention. Meanwhile, online communities allow students to discuss problems, share resources and stay motivated.</p>
      <p>It’s not just about flashy technology. Simple innovations like spaced repetition apps and digital flashcards make revision more efficient. Video lectures and podcasts give students the flexibility to learn on the go. By embracing these trends, learners can build confidence and achieve better outcomes in less time.</p>
    `,
    tags: ['technology', 'innovation', 'trends']
  },
  {
    id: 'work-study-balance',
    title: 'Balancing Work and Studies: A Modern Approach to Competitive Exams',
    category: 'Lifestyle',
    image: 'https://images.pexels.com/photos/313690/pexels-photo-313690.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: formatDate(2025, 7, 10),
    excerpt: 'Working professionals can clear competitive exams without quitting their jobs. This article shares time‑management hacks, energy boosters and mindset shifts that work.',
    content: `
      <p>Preparing for competitive exams while holding down a full‑time job is challenging but not impossible. The trick lies in optimising your time and energy. Start by setting clear goals for each week and prioritising tasks. Early mornings and late evenings are prime study slots when the mind is fresh and distractions are minimal.</p>
      <p>Incorporate active learning methods to maximise retention. Summarise concepts in your own words, teach a topic to a peer or solve practice questions without looking at solutions. Leverage your commute by listening to relevant podcasts or revising flashcards. On weekends, focus on taking practice tests and reviewing your performance.</p>
      <p>Equally important is maintaining physical and mental well‑being. Short workouts, meditation and healthy meals keep your energy levels stable. Take regular breaks to avoid burnout. Remember that progress is a marathon, not a sprint. With discipline and a balanced lifestyle, success becomes a realistic target.</p>
    `,
    tags: ['work-life', 'time-management', 'motivation']
  }
];

// Expose posts globally (important for inline script tags)
window.posts = posts;