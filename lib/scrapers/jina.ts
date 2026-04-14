import axios from 'axios';

/**
 * Universal Jina Reader Scraper (Token-less AI Scraping)
 * Converts any URL to clean Markdown for LLM consumption.
 */
export async function scrapeWithJina(url: string): Promise<string | null> {
  try {
    const readerUrl = `https://r.jina.ai/${url.replace(/^https?:\/\//, '')}`;
    const { data } = await axios.get(readerUrl, {
      headers: {
        'Accept': 'text/plain',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 15000
    });
    return data;
  } catch (e: any) {
    console.warn(`Jina Reader failed for ${url}:`, e.message);
    return null;
  }
}
