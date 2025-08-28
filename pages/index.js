import { useEffect, useState } from 'react';
import Link from 'next/link';
import posts from '../data/posts';
import ThemeToggle from '../components/ThemeToggle';
import ContentViewer from '../components/ContentViewer';

// Enhanced AI Newsletter categories with priority order based on market research
const CATEGORY_ORDER = [
  'All',
  'AI News',
  'Tech News', 
  'Indian News',
  'World News',
  'Entertainment',
  'Movies',
  'Finance',
  'Popular'
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [trending, setTrending] = useState([]);
  const [viewerArticle, setViewerArticle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [totalSources, setTotalSources] = useState(0);

  // Enhanced content fetching with comprehensive aggregation
  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      try {
        const res = await fetch('/api/discover?limit=100');
        if (!res.ok) return;
        const data = await res.json();
        
        if (data && Array.isArray(data.articles)) {
          setTrending(data.articles);
          setLastUpdated(new Date(data.metadata?.lastUpdated));
          setTotalSources(data.metadata?.sources || 0);
        }
      } catch (err) {
        console.error('Failed to fetch content:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchContent();
    
    // Auto-refresh every hour
    const interval = setInterval(fetchContent, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced filtering for both static posts and dynamic content
  const allContent = [...posts, ...trending];
  const filteredPosts = allContent.filter((post) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'AI News') {
      return post.category?.includes('AI') || post.category === 'AI NEWS';
    }
    if (selectedCategory === 'Tech News') {
      return post.category?.includes('Tech') || post.category === 'TECH_NEWS';
    }
    if (selectedCategory === 'Indian News') {
      return post.category?.includes('Indian') || post.category === 'INDIAN_NEWS';
    }
    if (selectedCategory === 'World News') {
      return post.category?.includes('World') || post.category === 'WORLD_NEWS';
    }
    if (selectedCategory === 'Entertainment') {
      return post.category?.includes('Entertainment') || post.category === 'ENTERTAINMENT';
    }
    return post.category === selectedCategory;
  });

  // Content viewer functions
  const openViewer = (article, index) => {
    setViewerArticle(article);
    setCurrentIndex(index);
  };

  const closeViewer = () => {
    setViewerArticle(null);
  };

  const nextArticle = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < filteredPosts.length) {
      setViewerArticle(filteredPosts[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <div>
      <ThemeToggle />
      
      {/* Enhanced Header */}
      <header style={{ backgroundColor: 'var(--light)', borderBottom: '1px solid var(--secondary)', boxShadow: 'var(--shadow)' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" legacyBehavior>
              <a style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: 'var(--primary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🤖 Studyify AI
              </a>
            </Link>
            {lastUpdated && (
              <div style={{ 
                fontSize: '0.75rem', 
                color: 'var(--muted)',
                background: 'var(--secondary)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px'
              }}>
                Updated: {lastUpdated.toLocaleTimeString()} | {totalSources} sources
              </div>
            )}
          </div>
          
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/" legacyBehavior><a style={{ color: 'var(--text)' }}>Home</a></Link>
            <a href="#categories" style={{ cursor: 'pointer', color: 'var(--text)' }}>Categories</a>
            <a href="#subscribe" style={{ cursor: 'pointer', color: 'var(--text)' }}>Subscribe</a>
            {loading && (
              <div style={{ 
                width: '20px', 
                height: '20px', 
                border: '2px solid var(--secondary)', 
                borderTop: '2px solid var(--primary)', 
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            )}
          </nav>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
          color: '#fff',
          padding: '3rem 1rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem', fontWeight: '800' }}>
            🚀 AI-Powered Newsletter Hub
          </h1>
          <p style={{ maxWidth: '700px', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Your one-stop destination for AI innovations, tech breakthroughs, world news, and trending entertainment. 
            Updated hourly with content from {totalSources}+ premium sources.
          </p>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '1rem', 
            fontSize: '0.9rem',
            opacity: 0.9
          }}>
            <span>✨ Real-time Updates</span>
            <span>🔍 Smart Curation</span>
            <span>📱 Mobile Optimized</span>
            <span>🌙 Dark Mode</span>
            <span>🎯 Personalized</span>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '60px',
          height: '60px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          animation: 'float 4s ease-in-out infinite reverse'
        }}></div>
      </section>

      {/* Trending news section */}
      {trending.length > 0 && (
        <section style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Trending News</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem'
            }}
          >
            {trending.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: '0.8rem' }}>
                  <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem', minHeight: '2.4em' }}>
                    {item.title}
                  </h3>
                  {item.summary && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '0 0 0.5rem' }}>
                      {item.summary}
                    </p>
                  )}
                  <small style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{item.source}</small>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Enhanced Categories Section */}
      <section id="categories" style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: 'var(--text)' }}>
            📂 Categories 
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 'normal' }}>
              ({filteredPosts.length} articles)
            </span>
          </h2>
          <div style={{ 
            fontSize: '0.8rem', 
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {loading ? '🔄 Refreshing...' : '✅ Live'}
          </div>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {CATEGORY_ORDER.map((cat) => {
            const categoryCount = allContent.filter(post => {
              if (cat === 'All') return true;
              if (cat === 'AI News') return post.category?.includes('AI') || post.category === 'AI NEWS';
              if (cat === 'Tech News') return post.category?.includes('Tech') || post.category === 'TECH_NEWS';
              if (cat === 'Indian News') return post.category?.includes('Indian') || post.category === 'INDIAN_NEWS';
              if (cat === 'World News') return post.category?.includes('World') || post.category === 'WORLD_NEWS';
              if (cat === 'Entertainment') return post.category?.includes('Entertainment') || post.category === 'ENTERTAINMENT';
              return post.category === cat;
            }).length;
            
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--border-radius)',
                  border: selectedCategory === cat ? 'none' : '2px solid var(--secondary)',
                  backgroundColor: selectedCategory === cat ? 'var(--primary)' : 'var(--light)',
                  color: selectedCategory === cat ? '#fff' : 'var(--text)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  position: 'relative',
                  boxShadow: selectedCategory === cat ? 'var(--shadow-hover)' : 'var(--shadow)',
                  transform: selectedCategory === cat ? 'translateY(-2px)' : 'none'
                }}
              >
                {cat}
                <span style={{ 
                  fontSize: '0.7rem', 
                  marginLeft: '0.5rem',
                  opacity: 0.8,
                  background: selectedCategory === cat ? 'rgba(255,255,255,0.2)' : 'var(--secondary)',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '12px'
                }}>
                  {categoryCount}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Enhanced Posts Grid */}
      <section style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
        <div className="posts-grid">
          {filteredPosts.map((post, index) => {
            const isNewContent = !post.id; // Dynamic content doesn't have static IDs
            const imageUrl = isNewContent ? 
              (post.image || '/images/default-placeholder.png') : 
              `/images/${post.image}`;
            
            return (
              <article
                key={post.id || `${post.title}-${index}`}
                style={{ 
                  backgroundColor: 'var(--light)', 
                  borderRadius: 'var(--border-radius)', 
                  boxShadow: 'var(--shadow)',
                  overflow: 'hidden',
                  transition: 'var(--transition)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => openViewer(post, index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}
              >
                {isNewContent && (
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    zIndex: 2
                  }}>
                    🔥 LIVE
                  </div>
                )}
                
                <img
                  src={imageUrl}
                  alt={post.title}
                  style={{ 
                    width: '100%', 
                    height: '180px', 
                    objectFit: 'cover',
                    background: 'var(--secondary)'
                  }}
                  onError={(e) => {
                    e.target.src = '/images/default-placeholder.png';
                  }}
                />
                
                <div style={{ padding: '1rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <small style={{ 
                      color: 'var(--primary)',
                      background: 'var(--secondary)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {post.category || 'GENERAL'}
                    </small>
                    <small style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>
                      {isNewContent ? 
                        new Date(post.publishedAt).toLocaleDateString() : 
                        post.date}
                    </small>
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    margin: '0 0 0.5rem 0',
                    lineHeight: '1.3',
                    color: 'var(--text)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: 'var(--muted)', 
                    lineHeight: '1.4',
                    margin: '0 0 1rem 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.summary || post.excerpt}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginTop: 'auto'
                  }}>
                    <small style={{ 
                      color: 'var(--muted)',
                      fontSize: '0.75rem'
                    }}>
                      📰 {post.source || 'Studyify'}
                    </small>
                    
                    <button
                      style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--border-radius)',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openViewer(post, index);
                      }}
                    >
                      📖 Read
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        
        {filteredPosts.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'var(--muted)',
            background: 'var(--secondary)',
            borderRadius: 'var(--border-radius)'
          }}>
            <h3>No articles found in this category</h3>
            <p>Try selecting a different category or check back soon for updates!</p>
          </div>
        )}
      </section>

      {/* Subscribe Section */}
      <section
        id="subscribe"
        style={{
          backgroundColor: 'var(--primary)',
          color: '#fff',
          padding: '2rem 1rem',
          marginTop: '2rem'
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Stay Updated</h2>
          <p style={{ marginBottom: '1rem' }}>
            Subscribe to get the latest articles, study tips and news delivered straight to your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing!');
            }}
            style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              style={{
                padding: '0.5rem',
                borderRadius: 'var(--border-radius)',
                border: 'none',
                flex: '1 1 auto'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#fff',
                color: 'var(--primary)',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer'
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Content Viewer Modal */}
      {viewerArticle && (
        <ContentViewer
          article={viewerArticle}
          onClose={closeViewer}
          onNext={nextArticle}
          hasNext={currentIndex < filteredPosts.length - 1}
        />
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .posts-grid article:hover {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}