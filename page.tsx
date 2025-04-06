import { FC, useState } from 'react';
import Layout from '../../components/Layout';
import HeroSection from '../../components/HeroSection';
import Card from '../../components/Card';
import FilterBar from '../../components/FilterBar';
import Newsletter from '../../components/Newsletter';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: number;
  imageSrc?: string;
  author: string;
}

const TutorialsPage: FC = () => {
  // Sample data for tutorials
  const tutorials: Tutorial[] = [
    {
      id: 'getting-started-with-chatgpt',
      title: 'Getting Started with ChatGPT',
      description: 'Learn how to use ChatGPT effectively for your studies and research.',
      category: 'AI Tools',
      difficulty: 'Beginner',
      estimatedTime: 15,
      author: 'Sarah Johnson',
      imageSrc: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'advanced-notion-templates',
      title: 'Advanced Notion Templates',
      description: 'Discover how to create and use advanced Notion templates for better organization.',
      category: 'Productivity',
      difficulty: 'Intermediate',
      estimatedTime: 25,
      author: 'Michael Chen',
      imageSrc: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'ai-powered-research-techniques',
      title: 'AI-Powered Research Techniques',
      description: 'Learn how to leverage AI tools to enhance your research capabilities.',
      category: 'Study Techniques',
      difficulty: 'Advanced',
      estimatedTime: 30,
      author: 'Dr. Emily Rodriguez',
      imageSrc: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'mastering-grammarly',
      title: 'Mastering Grammarly for Academic Writing',
      description: 'How to use Grammarly to improve your essays and research papers.',
      category: 'AI Tools',
      difficulty: 'Beginner',
      estimatedTime: 20,
      author: 'James Wilson',
      imageSrc: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'effective-study-planning',
      title: 'Effective Study Planning with AI Tools',
      description: 'Create better study plans using AI-powered scheduling and planning tools.',
      category: 'Study Techniques',
      difficulty: 'Intermediate',
      estimatedTime: 25,
      author: 'Lisa Thompson',
      imageSrc: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'zotero-citation-management',
      title: 'Zotero for Citation Management',
      description: 'Master Zotero to organize your research sources and automate citations.',
      category: 'Technology',
      difficulty: 'Intermediate',
      estimatedTime: 35,
      author: 'Prof. Robert Brown',
      imageSrc: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'digital-note-taking',
      title: 'Digital Note-Taking Strategies',
      description: 'Learn effective digital note-taking methods to improve retention and organization.',
      category: 'Productivity',
      difficulty: 'Beginner',
      estimatedTime: 20,
      author: 'Emma Davis',
      imageSrc: 'https://images.unsplash.com/photo-1517842264405-72bb906a1936?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'ai-image-generation',
      title: 'AI Image Generation for Projects',
      description: 'How to use AI image generation tools to create visuals for your academic projects.',
      category: 'AI Tools',
      difficulty: 'Intermediate',
      estimatedTime: 30,
      author: 'Alex Martinez',
      imageSrc: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'spaced-repetition',
      title: 'Spaced Repetition Learning Techniques',
      description: 'Implement spaced repetition with digital tools to improve long-term memory retention.',
      category: 'Study Techniques',
      difficulty: 'Advanced',
      estimatedTime: 25,
      author: 'Dr. Thomas Lee',
      imageSrc: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ];

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortOption, setSortOption] = useState('Newest');

  // Categories and difficulty options
  const categories = ['All', 'AI Tools', 'Productivity', 'Study Techniques', 'Technology', 'Other'];
  const difficultyOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const sortOptions = ['Newest', 'Oldest', 'Time: Short to Long', 'Time: Long to Short', 'A-Z', 'Z-A'];

  // Filter tutorials based on selected filters
  const filteredTutorials = tutorials.filter(tutorial => {
    const categoryMatch = selectedCategory === 'All' || tutorial.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || tutorial.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  // Sort tutorials based on selected sort option
  const sortedTutorials = [...filteredTutorials].sort((a, b) => {
    switch (sortOption) {
      case 'Oldest':
        return -1; // In a real app, would sort by date
      case 'Time: Short to Long':
        return a.estimatedTime - b.estimatedTime;
      case 'Time: Long to Short':
        return b.estimatedTime - a.estimatedTime;
      case 'A-Z':
        return a.title.localeCompare(b.title);
      case 'Z-A':
        return b.title.localeCompare(a.title);
      default:
        // Default sorting by newest (pre-defined order)
        return 0;
    }
  });

  return (
    <Layout>
      <HeroSection
        title="Learn How to Use AI Tools Effectively"
        subtitle="Step-by-step tutorials to help you master AI tools and boost your productivity"
        primaryButtonText="Browse Tutorials"
        primaryButtonLink="#tutorials-section"
      />

      <section id="tutorials-section" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterBar
            categories={categories}
            onCategoryChange={setSelectedCategory}
            selectedCategory={selectedCategory}
            additionalFilters={[
              {
                title: 'Difficulty',
                options: difficultyOptions,
                selectedOption: selectedDifficulty,
                onChange: setSelectedDifficulty
              }
            ]}
            sortOptions={sortOptions}
            onSortChange={setSortOption}
            selectedSortOption={sortOption}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTutorials.map((tutorial) => (
              <Card
                key={tutorial.id}
                title={tutorial.title}
                description={tutorial.description}
                link={`/tutorials/${tutorial.id}`}
                imageSrc={tutorial.imageSrc}
                tags={[tutorial.category, tutorial.difficulty]}
                footer={
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Estimated time: {tutorial.estimatedTime} min
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      By: {tutorial.author}
                    </span>
                  </div>
                }
              />
            ))}
          </div>

          {sortedTutorials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No tutorials found matching your filters. Try adjusting your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Tutorial</h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Our most popular tutorial this month</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img 
                  className="h-48 w-full object-cover md:h-full md:w-48" 
                  src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Getting Started with ChatGPT" 
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">AI Tools • Beginner</div>
                <a href="/tutorials/getting-started-with-chatgpt" className="block mt-1 text-2xl font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                  Getting Started with ChatGPT for Students
                </a>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Learn how to use ChatGPT to improve your research and writing skills. This comprehensive guide covers everything from basic prompts to advanced techniques.
                </p>
                <div className="mt-4">
                  <a href="/tutorials/getting-started-with-chatgpt" className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300">
                    Read Now
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Newsletter
            title="Get new tutorials in your inbox"
            description="Subscribe to receive notifications when we publish new tutorials."
          />
        </div>
      </section>
    </Layout>
  );
};

export default TutorialsPage;
