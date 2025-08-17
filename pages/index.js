import { useEffect, useState } from 'react';
import Link from 'next/link';
import posts from '../data/posts';
import { resolveImagePath } from '../utils/image';

// Define the order of categories shown on the home page. The "All"
// category is implicit and handled in component state.
const CATEGORY_ORDER = [
  'Popular',
  'AI',
  'Tech',
  'Finance',
  'Politics',
  'Exam',
  'Lifestyle'
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [trending, setTrending] = useState([]);

  // Fetch trending news from our API route once on mount. If the
  // request fails or returns an error, the trending array stays empty
  // and the section remains hidden on the page.
  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch('/api/discover');
        if (!res.ok) return;
        const data = await res.json();
        if (data && Array.isArray(data.articles)) {
          setTrending(data.articles);
        }
      } catch (err) {
        // Silently fail – trending news is an enhancement only
        console.error('Failed to fetch trending news:', err);
      }
    }
    fetchTrending();
  }, []);

  // Filter posts based on the selected category. For the Exam
  // category, we treat all exam subcategories as Exam for the
  // top‑level filter. When "All" is selected, return all posts.
  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Exam') {
      return post.category === 'Exam';
    }
    return post.category === selectedCategory;
  });

  return (
    <div>
      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea' }}>
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
          <Link href="/" legacyBehavior>
            <a style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--primary)' }}>Studyify</a>
          </Link>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/" legacyBehavior><a>Home</a></Link>
            <a href="#categories" style={{ cursor: 'pointer' }}>Categories</a>
            <a href="#subscribe" style={{ cursor: 'pointer' }}>Subscribe</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0a66c2, #f8991d)',
          color: '#fff',
          padding: '4rem 1rem'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem' }}>
            Explore Insights & News on Competitive Exams & Tech
          </h1>
          <p style={{ maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.5' }}>
            Discover strategies, stories and technology trends that will give your preparation an
            edge. From UPSC and SSC to banking and tech innovations, we cover it all.
          </p>
        </div>
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

      {/* Categories Section */}
      <section id="categories" style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Categories</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button
            onClick={() => setSelectedCategory('All')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--border-radius)',
              border: selectedCategory === 'All' ? 'none' : '1px solid var(--muted)',
              backgroundColor: selectedCategory === 'All' ? 'var(--primary)' : 'transparent',
              color: selectedCategory === 'All' ? '#fff' : 'var(--text)',
              cursor: 'pointer'
            }}
          >
            All
          </button>
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--border-radius)',
                border: selectedCategory === cat ? 'none' : '1px solid var(--muted)',
                backgroundColor: selectedCategory === cat ? 'var(--primary)' : 'transparent',
                color: selectedCategory === cat ? '#fff' : 'var(--text)',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}
            >
              <img
                src={resolveImagePath(post.image)}
                alt={post.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1rem' }}>
                <small style={{ color: 'var(--muted)' }}>
                  {post.category}
                  {post.subcategory ? ` • ${post.subcategory}` : ''} • {post.date}
                </small>
                <h3 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{post.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--muted)', minHeight: '4.5em' }}>{post.excerpt}</p>
                <Link href={`/article/${post.id}`} legacyBehavior>
                  <a
                    style={{
                      display: 'inline-block',
                      marginTop: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'var(--primary)',
                      color: '#fff',
                      borderRadius: 'var(--border-radius)',
                      textDecoration: 'none'
                    }}
                  >
                    Read More
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
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
    </div>
  );
}