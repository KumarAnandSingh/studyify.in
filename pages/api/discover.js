/**
 * API route that retrieves top news headlines from NewsAPI.org.
 *
 * This handler runs on the server (Vercel serverless function) and is
 * responsible for fetching trending news stories and returning a
 * simplified payload. It expects a `NEWS_API_KEY` environment
 * variable to be configured in Vercel. If the key is missing or the
 * external request fails, the handler responds with an error message
 * and a 500 status code. Only the first few stories are returned to
 * minimise payload size.
 */

export default async function handler(req, res) {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'News API key not configured' });
  }
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(`News API returned status ${response.status}`);
    }
    const data = await response.json();
    const articles = Array.isArray(data.articles) ? data.articles : [];
    const curated = articles.slice(0, 8).map((a) => ({
      title: a.title,
      summary: a.description,
      image: a.urlToImage,
      url: a.url,
      source: a.source?.name || 'Unknown'
    }));
    res.status(200).json({ articles: curated });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch news', details: err.message });
  }
}