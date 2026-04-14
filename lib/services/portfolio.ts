import { scrapeGitHub } from "@/lib/scrapers/github";
import { scrapeDevTo } from "@/lib/scrapers/devto";
import { scrapeMedium } from "@/lib/scrapers/medium";
import { scrapeTwitter } from "@/lib/scrapers/twitter";
import { scrapeLinkedIn } from "@/lib/scrapers/linkedin";
import { generatePortfolio } from "@/lib/ai/portfolio-generator";
import { prisma } from "@/lib/prisma";
import { searchProfessionalDetails } from "@/lib/scrapers/search";

interface SocialInputs {
  github?: string;
  devto?: string;
  medium?: string;
  twitter?: string;
  linkedin?: string;
}

export async function createPortfolioForUser(socials: SocialInputs) {
  if (!socials.github) {
    throw new Error("GitHub username is required");
  }

  const username = socials.github;

  // 1. Scrape all platforms in parallel
  console.log("Scraping all platforms...");
  const githubData = await scrapeGitHub(username);
  const [devtoArticles, mediumArticles, twitterData, linkedinData, webRecon] = await Promise.all([
    socials.devto ? scrapeDevTo(socials.devto) : Promise.resolve([]),
    socials.medium ? scrapeMedium(socials.medium) : Promise.resolve([]),
    socials.twitter ? scrapeTwitter(undefined, socials.twitter) : Promise.resolve(null),
    socials.linkedin ? scrapeLinkedIn(`https://linkedin.com/in/${socials.linkedin}`) : Promise.resolve(null),
    Promise.all([
      socials.linkedin ? searchProfessionalDetails(socials.linkedin, 'LinkedIn') : '',
      socials.twitter ? searchProfessionalDetails(socials.twitter, 'Twitter / X') : '',
      searchProfessionalDetails(username, 'Software Developer')
    ]).then(res => res.join('\n\n'))
  ]);

  // 2. Merge all data for AI
  const allScrapedData = {
    ...githubData,
    twitter: twitterData,
    linkedin: linkedinData,
    webContext: webRecon,
    blogPosts: [
      ...devtoArticles.map((a: any) => ({ ...a, source: "devto" })),
      ...mediumArticles.map((a: any) => ({ ...a, source: "medium" })),
    ],
  };

  console.log(
    `Scraped: ${githubData.repos.length} repos, ${devtoArticles.length} Dev.to articles, ${mediumArticles.length} Medium articles, Twitter: ${!!twitterData}, LinkedIn: ${!!linkedinData}`
  );

  // 3. Generate portfolio with AI
  console.log("Running AI generation...");
  const aiDetails = await generatePortfolio(allScrapedData);
  console.log("AI Details extracted Experience count:", aiDetails.experience?.length || 0);

  // 4. Save to database
  console.log("Saving to database...");
  const user = await prisma.$transaction(async (tx) => {
    const dbUser = await tx.user.upsert({
      where: { username },
      update: {
        name: githubData.profile.name,
        image: githubData.profile.avatar_url,
        bio: aiDetails.bio,
        headline: aiDetails.headline,
        tagline: aiDetails.tagline,
        theme: aiDetails.theme,
        githubUsername: socials.github,
        devtoUsername: socials.devto || null,
        mediumUsername: socials.medium || null,
        twitterUsername: socials.twitter || null,
        linkedinUsername: socials.linkedin || null,
        lastSyncedAt: new Date(),
      },
      create: {
        username,
        name: githubData.profile.name,
        image: githubData.profile.avatar_url,
        bio: aiDetails.bio,
        headline: aiDetails.headline,
        tagline: aiDetails.tagline,
        theme: aiDetails.theme,
        githubUsername: socials.github,
        devtoUsername: socials.devto || null,
        mediumUsername: socials.medium || null,
        twitterUsername: socials.twitter || null,
        linkedinUsername: socials.linkedin || null,
        lastSyncedAt: new Date(),
      },
    });

    // Save full data blobs for production/debug
    await tx.scrapedData.upsert({
      where: { userId: dbUser.id },
      create: { userId: dbUser.id, data: JSON.stringify(allScrapedData) },
      update: { data: JSON.stringify(allScrapedData) },
    });

    await tx.portfolio.upsert({
      where: { userId: dbUser.id },
      create: { userId: dbUser.id, data: JSON.stringify(aiDetails) },
      update: { data: JSON.stringify(aiDetails) },
    });

    // Clear old data
    await tx.skill.deleteMany({ where: { userId: dbUser.id } });
    await tx.project.deleteMany({ where: { userId: dbUser.id } });
    await tx.blogPost.deleteMany({ where: { userId: dbUser.id } });
    await tx.socialLink.deleteMany({ where: { userId: dbUser.id } });
    await tx.experience.deleteMany({ where: { userId: dbUser.id } });

    // Featured project IDs
    const featuredIds = (aiDetails.featuredProjects || []).map(
      (p: any) => p.sourceId
    );

    // Insert skills
    if (aiDetails.skills?.length > 0) {
      await tx.skill.createMany({
        data: aiDetails.skills.map((skill: any) => ({
          userId: dbUser.id,
          name: skill.name,
          level: skill.level || 5,
          evidence: skill.evidence || "",
        })),
      });
    }

    // Insert projects
    if (githubData.repos?.length > 0) {
      await tx.project.createMany({
        data: githubData.repos.map((repo: any) => {
          const aiProject = (aiDetails.featuredProjects || []).find(
            (p: any) => p.sourceId === repo.sourceId
          );
          return {
            userId: dbUser.id,
            source: "github",
            sourceId: repo.sourceId,
            title: repo.name,
            description: aiProject ? aiProject.description : repo.description,
            url: repo.url,
            stars: repo.stars,
            language: repo.language,
            tags: repo.topics?.join(", ") || "",
            featured: featuredIds.includes(repo.sourceId),
          };
        }),
      });
    }

    // Insert blog posts
    const allBlogPosts = [
      ...devtoArticles.map((a: any) => ({
        userId: dbUser.id,
        source: "devto",
        title: a.title,
        url: a.url,
        summary: a.description || "",
        coverImage: a.coverImage || null,
        publishedAt: a.publishedAt ? new Date(a.publishedAt) : null,
        tags: Array.isArray(a.tags) ? a.tags.join(", ") : a.tags || "",
      })),
      ...mediumArticles.map((a: any) => ({
        userId: dbUser.id,
        source: "medium",
        title: a.title,
        url: a.url,
        summary: a.description || a.summary || "",
        coverImage: null,
        publishedAt: a.publishedAt ? new Date(a.publishedAt) : null,
        tags: Array.isArray(a.categories) ? a.categories.join(", ") : a.categories || "",
      })),
    ];

    if (allBlogPosts.length > 0) {
      await tx.blogPost.createMany({ data: allBlogPosts });
    }

    // Insert experiences (from LinkedIn or AI extraction fallback)
    const experiencesToSave = (linkedinData && linkedinData.experience?.length > 0) 
      ? linkedinData.experience.map((exp: any) => ({
          userId: dbUser.id,
          source: "linkedin",
          company: exp.company,
          role: exp.title,
          description: exp.description,
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: !exp.endDate || exp.endDate.toLowerCase() === "present" || exp.current,
        }))
      : (aiDetails.experience || []).map((exp: any) => ({
          userId: dbUser.id,
          source: "ai-extraction",
          company: exp.company,
          role: exp.role,
          description: exp.description,
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current || !exp.endDate,
        }));

    if (experiencesToSave.length > 0) {
      await tx.experience.createMany({ data: experiencesToSave });
    }

    const sanitizeHandle = (h: string) => h.replace(/^https?:\/\/(www\.)?(twitter|x|linkedin|github|dev\.to|medium)\.com\//, "").replace(/^@/, "").replace(/\/$/, "");

    // Insert social links
    const links: any[] = [];
    if (socials.github)
      links.push({
        userId: dbUser.id,
        platform: "github",
        url: `https://github.com/${sanitizeHandle(socials.github)}`,
        label: "GitHub",
      });
    if (socials.devto)
      links.push({
        userId: dbUser.id,
        platform: "devto",
        url: `https://dev.to/${sanitizeHandle(socials.devto)}`,
        label: "Dev.to",
      });
    if (socials.medium)
      links.push({
        userId: dbUser.id,
        platform: "medium",
        url: `https://medium.com/@${sanitizeHandle(socials.medium)}`,
        label: "Medium",
      });
    if (socials.twitter)
      links.push({
        userId: dbUser.id,
        platform: "twitter",
        url: `https://x.com/${sanitizeHandle(socials.twitter)}`,
        label: "Twitter",
      });
    if (socials.linkedin)
      links.push({
        userId: dbUser.id,
        platform: "linkedin",
        url: `https://linkedin.com/in/${sanitizeHandle(socials.linkedin)}`,
        label: "LinkedIn",
      });

    if (links.length > 0) {
      await tx.socialLink.createMany({ data: links });
    }

    return dbUser;
  });

  return user;
}
