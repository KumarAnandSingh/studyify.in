/**
 * Vercel Cron Job: Hourly Content Refresh
 * 
 * This API route is triggered every hour by Vercel to refresh
 * the content cache and preload new articles. It helps ensure
 * fresh content is always available for users.
 */

import { aggregateContent } from '../../../lib/contentAggregator';

export default async function handler(req, res) {
  // Verify this is a cron request (Vercel adds this header)
  const authHeader = req.headers.authorization;
  
  // In production, Vercel automatically adds the correct auth header
  // In development, we'll allow any request for testing
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('🔄 Starting hourly content refresh...', new Date().toISOString());
    
    // Aggregate fresh content from all sources
    const freshContent = await aggregateContent([
      'ai_news', 
      'tech_news', 
      'indian_news', 
      'world_news', 
      'entertainment'
    ]);
    
    // Log statistics
    const stats = {
      totalArticles: freshContent.length,
      sources: [...new Set(freshContent.map(a => a.source))].length,
      categories: [...new Set(freshContent.map(a => a.category))],
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ Content refresh completed:', stats);
    
    // Return success with stats
    res.status(200).json({
      success: true,
      message: 'Content refreshed successfully',
      stats: stats,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Content refresh failed:', error);
    
    res.status(500).json({
      success: false,
      error: 'Content refresh failed',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}