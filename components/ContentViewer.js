import { useState, useEffect } from 'react';

export default function ContentViewer({ article, onClose, onNext, hasNext }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!article) return null;

  return (
    <div className="content-viewer-overlay">
      <div className="content-viewer">
        {/* Header with title and controls */}
        <div className="viewer-header">
          <div className="article-meta">
            <h2>{article.title}</h2>
            <div className="meta-info">
              <span className="source">{article.source}</span>
              <span className="category">{article.category}</span>
              <span className="date">{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close viewer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Content iframe */}
        <div className="iframe-container">
          {loading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Loading content...</p>
            </div>
          )}
          
          {error ? (
            <div className="error-fallback">
              <h3>Content Preview</h3>
              <img 
                src={article.image} 
                alt={article.title}
                onError={(e) => e.target.src = '/images/default-placeholder.png'}
              />
              <p>{article.summary}</p>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="external-link-btn"
              >
                Read Full Article →
              </a>
            </div>
          ) : (
            <iframe
              src={article.url}
              title={article.title}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          )}
        </div>

        {/* Navigation controls */}
        <div className="viewer-controls">
          <button onClick={onClose} className="control-btn secondary">
            🏠 Home
          </button>
          
          <div className="reading-progress">
            <div className="progress-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          
          <button 
            onClick={onNext} 
            className="control-btn primary"
            disabled={!hasNext}
          >
            Next Article →
          </button>
        </div>
      </div>

      <style jsx>{`
        .content-viewer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease-out;
        }

        .content-viewer {
          width: 95vw;
          height: 95vh;
          background: var(--light);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease-out;
        }

        .viewer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--secondary);
          background: var(--light);
        }

        .article-meta h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          color: var(--text);
          line-height: 1.3;
        }

        .meta-info {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--muted);
        }

        .source {
          font-weight: 600;
          color: var(--primary);
        }

        .category {
          background: var(--secondary);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 600;
        }

        .close-btn {
          background: var(--secondary);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          color: var(--text);
        }

        .close-btn:hover {
          background: var(--primary);
          color: white;
          transform: scale(1.05);
        }

        .iframe-container {
          flex: 1;
          position: relative;
          background: var(--secondary);
        }

        .iframe-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--light);
          z-index: 10;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--secondary);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        .error-fallback {
          padding: 2rem;
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }

        .error-fallback img {
          max-width: 300px;
          max-height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }

        .external-link-btn {
          background: var(--primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: var(--transition);
        }

        .external-link-btn:hover {
          background: var(--accent);
          transform: translateY(-2px);
        }

        .viewer-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--secondary);
          background: var(--light);
        }

        .control-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .control-btn.primary {
          background: var(--primary);
          color: white;
        }

        .control-btn.secondary {
          background: var(--secondary);
          color: var(--text);
        }

        .control-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        .control-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .reading-progress {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .progress-dots {
          display: flex;
          gap: 0.25rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--muted);
          transition: var(--transition);
        }

        .dot.active {
          background: var(--primary);
          transform: scale(1.2);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .content-viewer {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
          }

          .viewer-header {
            padding: 1rem;
          }

          .article-meta h2 {
            font-size: 1.1rem;
          }

          .meta-info {
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .viewer-controls {
            padding: 1rem;
          }

          .control-btn {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}