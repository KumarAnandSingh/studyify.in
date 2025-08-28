/**
 * Enhanced AI Newsletter Content Discovery API
 * 
 * Aggregates content from multiple sources including:
 * - AI/Tech news from RSS feeds and Reddit
 * - Indian and World news from GNews and RSS
 * - Entertainment content from TMDB and other sources
 * 
 * Features:
 * - Image validation and broken link filtering
 * - Content deduplication
 * - Multi-source aggregation
 * - Hourly content refresh capability
 */

import { aggregateContent } from '../../lib/contentAggregator';

export default async function handler(req, res) {
  // Enable CORS for client-side requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get category filter from query params
    const { categories, limit = 50 } = req.query;
    const requestedCategories = categories ? 
      categories.split(',') : 
      ['ai_news', 'tech_news', 'indian_news', 'world_news', 'entertainment'];

    // Aggregate content from multiple sources
    const articles = await aggregateContent(requestedCategories);
    
    // Limit results based on query param
    const limitedArticles = articles.slice(0, parseInt(limit));
    
    // Add metadata about the aggregation
    const response = {
      articles: limitedArticles,
      metadata: {
        total: limitedArticles.length,
        categories: requestedCategories,
        lastUpdated: new Date().toISOString(),
        sources: [...new Set(limitedArticles.map(a => a.source))].length
      }
    };
    
    // Cache for 1 hour
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).json(response);
    
  } catch (err) {
    console.error('Content aggregation error:', err);
    
    // Fallback to basic GNews if aggregation fails
    try {
      const token = process.env.GNEWS_API_KEY || '5afe492a9d267af9b343dbba68bbc9d8';
      const fallbackUrl = `https://gnews.io/api/v4/top-headlines?token=${token}&lang=en&max=20&country=in`;
      const response = await fetch(fallbackUrl);
      const data = await response.json();
      
      const fallbackArticles = (data.articles || []).map((a) => ({
        title: a.title || '',
        summary: a.description || '',
        image: a.image || '/images/default-placeholder.png',
        url: a.url || '',
        source: a.source?.name || 'GNews',
        category: 'FALLBACK',
        publishedAt: a.publishedAt || new Date().toISOString()
      }));
      
      res.status(200).json({ 
        articles: fallbackArticles,
        metadata: {
          total: fallbackArticles.length,
          fallback: true,
          error: 'Primary aggregation failed, using fallback'
        }
      });
      
    } catch (fallbackErr) {
      res.status(500).json({ 
        error: 'Failed to fetch content', 
        details: err.message,
        fallbackError: fallbackErr.message 
      });
    }
  }
}