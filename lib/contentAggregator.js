/**
 * AI Newsletter Content Aggregation System
 * Fetches content from multiple free APIs and RSS feeds
 */

const GNEWS_API_KEY = '5afe492a9d267af9b343dbba68bbc9d8';

// Content sources configuration
const CONTENT_SOURCES = {
  ai_news: {
    reddit: ['r/artificial', 'r/MachineLearning', 'r/OpenAI', 'r/ChatGPT'],
    rss: [
      'https://feeds.feedburner.com/oreilly/radar',
      'https://blog.google/technology/ai/rss/',
      'https://openai.com/blog/rss.xml'
    ]
  },
  tech_news: {
    apis: ['hackernews', 'gnews'],
    rss: [
      'https://feeds.feedburner.com/TechCrunch',
      'https://www.theverge.com/rss/index.xml',
      'https://feeds.arstechnica.com/arstechnica/index'
    ]
  },
  indian_news: {
    rss: [
      'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
      'https://www.thehindu.com/feeder/default.rss',
      'https://indianexpress.com/print/front-page/feed/',
      'https://economictimes.indiatimes.com/rssfeedsdefault.cms'
    ]
  },
  world_news: {
    rss: [
      'https://feeds.reuters.com/reuters/topNews',
      'https://feeds.bbci.co.uk/news/world/rss.xml',
      'https://rss.cnn.com/rss/edition.rss',
      'https://feeds.npr.org/1001/rss.xml'
    ]
  },
  entertainment: {
    apis: ['tmdb', 'lastfm'],
    rss: [
      'https://variety.com/feed/',
      'https://www.rollingstone.com/feed/'
    ]
  }
};

// RSS Feed Parser
async function parseRSSFeed(url) {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}&api_key=free&count=10`);
    const data = await response.json();
    
    if (data.status === 'ok') {
      return data.items.map(item => ({
        title: item.title,
        summary: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        url: item.link,
        image: item.enclosure?.link || item.thumbnail || extractImageFromContent(item.content),
        source: data.feed.title,
        publishedAt: new Date(item.pubDate),
        category: 'rss'
      }));
    }
  } catch (error) {
    console.error(`RSS parsing error for ${url}:`, error);
    return [];
  }
  return [];
}

// Extract image from HTML content
function extractImageFromContent(content) {
  if (!content) return null;
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
}

// GNews API fetcher
async function fetchGNewsContent(category = 'technology', country = 'in') {
  try {
    const url = `https://gnews.io/api/v4/top-headlines?token=${GNEWS_API_KEY}&lang=en&max=15&category=${category}&country=${country}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.articles) {
      return data.articles.map(article => ({
        title: article.title,
        summary: article.description,
        url: article.url,
        image: article.image,
        source: article.source?.name || 'GNews',
        publishedAt: new Date(article.publishedAt),
        category: category
      }));
    }
  } catch (error) {
    console.error('GNews API error:', error);
    return [];
  }
  return [];
}

// HackerNews API fetcher
async function fetchHackerNewsContent() {
  try {
    const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const topStoryIds = await topStoriesResponse.json();
    
    const stories = await Promise.all(
      topStoryIds.slice(0, 15).map(async (id) => {
        const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return await storyResponse.json();
      })
    );
    
    return stories
      .filter(story => story && story.title && story.url)
      .map(story => ({
        title: story.title,
        summary: `Score: ${story.score} | Comments: ${story.descendants || 0}`,
        url: story.url,
        image: null, // HackerNews doesn't provide images
        source: 'Hacker News',
        publishedAt: new Date(story.time * 1000),
        category: 'tech'
      }));
  } catch (error) {
    console.error('HackerNews API error:', error);
    return [];
  }
}

// Reddit API fetcher (using JSON endpoint)
async function fetchRedditContent(subreddit) {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`);
    const data = await response.json();
    
    return data.data.children
      .filter(post => post.data.url && !post.data.is_self)
      .map(post => ({
        title: post.data.title,
        summary: post.data.selftext.substring(0, 200) || `${post.data.ups} upvotes, ${post.data.num_comments} comments`,
        url: post.data.url,
        image: post.data.thumbnail !== 'self' ? post.data.thumbnail : null,
        source: `Reddit r/${subreddit}`,
        publishedAt: new Date(post.data.created_utc * 1000),
        category: 'reddit'
      }));
  } catch (error) {
    console.error(`Reddit API error for r/${subreddit}:`, error);
    return [];
  }
}

// TMDB API for movie trends
async function fetchMovieTrends() {
  const TMDB_API_KEY = process.env.TMDB_API_KEY || 'demo'; // Will be set in Vercel
  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    
    return data.results?.slice(0, 10).map(movie => ({
      title: movie.title,
      summary: movie.overview,
      url: `https://www.themoviedb.org/movie/${movie.id}`,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      source: 'TMDB',
      publishedAt: new Date(movie.release_date),
      category: 'movies'
    })) || [];
  } catch (error) {
    console.error('TMDB API error:', error);
    return [];
  }
}

// Image validation function
async function validateImage(imageUrl) {
  if (!imageUrl) return false;
  
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.startsWith('image/');
  } catch {
    return false;
  }
}

// Main content aggregation function
export async function aggregateContent(categories = ['ai_news', 'tech_news', 'indian_news', 'world_news']) {
  const allContent = [];
  
  for (const category of categories) {
    try {
      let categoryContent = [];
      
      switch (category) {
        case 'ai_news':
          // Fetch from RSS feeds
          for (const rssUrl of CONTENT_SOURCES.ai_news.rss) {
            const rssContent = await parseRSSFeed(rssUrl);
            categoryContent.push(...rssContent);
          }
          
          // Fetch from Reddit
          for (const subreddit of CONTENT_SOURCES.ai_news.reddit) {
            const redditContent = await fetchRedditContent(subreddit.replace('r/', ''));
            categoryContent.push(...redditContent);
          }
          break;
          
        case 'tech_news':
          const gnewsTech = await fetchGNewsContent('technology');
          const hackerNews = await fetchHackerNewsContent();
          categoryContent.push(...gnewsTech, ...hackerNews);
          
          // Add tech RSS feeds
          for (const rssUrl of CONTENT_SOURCES.tech_news.rss) {
            const rssContent = await parseRSSFeed(rssUrl);
            categoryContent.push(...rssContent);
          }
          break;
          
        case 'indian_news':
          const gnewsIndia = await fetchGNewsContent('general', 'in');
          categoryContent.push(...gnewsIndia);
          
          // Add Indian RSS feeds
          for (const rssUrl of CONTENT_SOURCES.indian_news.rss) {
            const rssContent = await parseRSSFeed(rssUrl);
            categoryContent.push(...rssContent);
          }
          break;
          
        case 'world_news':
          const gnewsWorld = await fetchGNewsContent('world');
          categoryContent.push(...gnewsWorld);
          
          // Add world RSS feeds
          for (const rssUrl of CONTENT_SOURCES.world_news.rss) {
            const rssContent = await parseRSSFeed(rssUrl);
            categoryContent.push(...rssContent);
          }
          break;
          
        case 'entertainment':
          const movieTrends = await fetchMovieTrends();
          categoryContent.push(...movieTrends);
          break;
      }
      
      // Filter valid images and deduplicate
      const validContent = await Promise.all(
        categoryContent.map(async (item) => {
          const hasValidImage = await validateImage(item.image);
          return {
            ...item,
            image: hasValidImage ? item.image : '/images/default-placeholder.png',
            category: category.replace('_', ' ').toUpperCase()
          };
        })
      );
      
      // Remove duplicates based on title similarity
      const uniqueContent = removeDuplicates(validContent);
      allContent.push(...uniqueContent);
      
    } catch (error) {
      console.error(`Error aggregating ${category}:`, error);
    }
  }
  
  // Sort by published date and limit results
  return allContent
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 100);
}

// Remove duplicate content based on title similarity
function removeDuplicates(content) {
  const unique = [];
  const seenTitles = new Set();
  
  for (const item of content) {
    const normalizedTitle = item.title.toLowerCase().replace(/[^\w\s]/g, '').trim();
    if (!seenTitles.has(normalizedTitle)) {
      seenTitles.add(normalizedTitle);
      unique.push(item);
    }
  }
  
  return unique;
}

export { CONTENT_SOURCES };