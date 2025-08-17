import { useRouter } from 'next/router';
import Link from 'next/link';
import posts from '../../data/posts';
import { resolveImagePath } from '../../utils/image';

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Article not found</h1>
        <p>The article you are looking for does not exist.</p>
        <Link href="/" legacyBehavior>
          <a style={{ color: 'var(--primary)' }}>← Back to Home</a>
        </Link>
      </div>
    );
  }

  // Recommend up to three other posts from the same category (excluding current)
  const recommended = posts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <Link href="/" legacyBehavior>
        <a style={{ color: 'var(--primary)', display: 'inline-block', marginBottom: '1rem' }}>← Back to Home</a>
      </Link>
      <img
        src={resolveImagePath(post.image)}
        alt={post.title}
        style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <h1 style={{ marginTop: '1rem' }}>{post.title}</h1>
      <small style={{ color: 'var(--muted)' }}>
        {post.category}
        {post.subcategory ? ` • ${post.subcategory}` : ''} • {post.date}
      </small>
      <div
        style={{ marginTop: '1rem' }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {recommended.length > 0 && (
        <section style={{ marginTop: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Recommended</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem'
            }}
          >
            {recommended.map((rec) => (
              <Link key={rec.id} href={`/article/${rec.id}`} legacyBehavior>
                <a
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    color: 'inherit',
                    textDecoration: 'none'
                  }}
                >
                  <img
                    src={resolveImagePath(rec.image)}
                    alt={rec.title}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '0.8rem' }}>
                    <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem' }}>{rec.title}</h3>
                    <small style={{ color: 'var(--muted)' }}>
                      {rec.category}
                      {rec.subcategory ? ` • ${rec.subcategory}` : ''} • {rec.date}
                    </small>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}