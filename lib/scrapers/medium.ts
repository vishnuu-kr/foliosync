import Parser from "rss-parser";

const parser = new Parser();

export async function scrapeMedium(username: string) {
  try {
    const feed = await parser.parseURL(
      `https://medium.com/feed/@${username}`
    );

    return feed.items.map((item: any) => ({
      title: item.title || "",
      url: item.link || "",
      publishedAt: item.pubDate || null,
      summary: item.contentSnippet?.slice(0, 250) || "",
      categories: item.categories?.join(", ") || "",
    }));
  } catch (error) {
    console.error("Error scraping Medium:", error);
    return [];
  }
}
