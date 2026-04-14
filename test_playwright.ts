import { scrapeLinkedInPlaywright } from './lib/scrapers/linkedin';

async function testPlaywright() {
  const username = "viishnuu"; // User's handle from debug_links
  console.log(`🚀 Starting Playwright test for ${username}...`);
  try {
    const data = await scrapeLinkedInPlaywright(username);
    if (data && data.profile) {
      console.log("✅ Success! Scraper results:");
      console.log("- Name:", data.profile.firstName, data.profile.lastName);
      console.log("- Headline:", data.profile.headline);
      console.log("- Experiences found:", data.experience.length);
      if (data.experience.length > 0) {
        console.log("- Top Experience:", data.experience[0].title, "at", data.experience[0].company);
      }
    } else {
      console.log("❌ Failed: LinkedIn blocked the automated browser today.");
    }
  } catch (error) {
    console.error("❌ Fatal error during Playwright scrape:", error);
  }
}

testPlaywright();
