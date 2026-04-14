export async function scrapeDevTo(username: string) {
  try {
    const response = await fetch(
      `https://dev.to/api/articles?username=${username}&per_page=30`
    );

    if (!response.ok) {
      throw new Error(`Dev.to API returned ${response.status}`);
    }

    const articles = await response.json();

    return articles.map((article: any) => ({
      title: article.title,
      url: article.url,
      coverImage: article.cover_image,
      publishedAt: article.published_at,
      tags: article.tag_list?.join(", ") || "",
      reactions: article.positive_reactions_count,
      description: article.description,
    }));
  } catch (error) {
    console.error("Error scraping Dev.to:", error);
    return [];
  }
}
