/**
 * API route that retrieves top news headlines from NewsAPI.org.
 *
 * This handler runs on the server (Vercel serverless function) and is
 * responsible for fetching trending news stories and returning a
 * simplified payload. It expects a `NEWS_API_KEY` environment
 * variable to be configured in Vercel. If the key is missing or the
 * external request fails, the handler responds with an error message
 * and a 500 status code. Only the first few stories are returned to
 * minimize payload size.
 */

/**
 * API route that fetches trending news stories using the GNews API.  The
 * GNews service aggregates articles from a wide range of sources and
 * provides a simple REST API with a generous free tier (100 requests per
 * day).  To authenticate requests, create an API token at gnews.io and
 * assign it to the `GNEWS_API_KEY` environment variable.  If the
 * environment variable is not defined, a default token may be provided
 * directly in the code (not recommended for production).
 */
export default async function handler(req, res) {
  const token = process.env.GNEWS_API_KEY || '5afe492a9d267af9b343dbba68bbc9d8';
  try {
    // Fetch the top headlines.  We request English‑language articles and
    // restrict the maximum number of results to 8.  You can adjust the
    // `country` parameter (e.g. `country=in`) to customise the news feed.
    const url = `https://gnews.io/api/v4/top-headlines?token=${token}&lang=en&max=8&country=in`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`GNews API returned status ${response.status}`);
    }
    const data = await response.json();
    const articles = Array.isArray(data.articles) ? data.articles : [];
    // Map GNews articles to our unified format.  Some articles may not
    // include an image; handle missing fields gracefully.
    const curated = articles.map((a) => ({
      title: a.title || '',
      summary: a.description || '',
      image: a.image || '',
      url: a.url || '',
      source: a.source?.name || 'Unknown'
    }));
    res.status(200).json({ articles: curated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news', details: err.message });
  }
}