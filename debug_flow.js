require('dotenv').config();
const { scrapeGitHub } = require('./lib/scrapers/github');
const { generatePortfolio } = require('./lib/ai/portfolio-generator');

async function debugFlow() {
  const username = "torvalds";
  console.log(`--- Debugging Flow for ${username} ---`);

  try {
    console.log("1. Testing Scraper...");
    const scrapedData = await scrapeGitHub(username);
    console.log("✅ Scraper Success:", scrapedData.profile.name);

    console.log("2. Testing AI Generator...");
    const aiDetails = await generatePortfolio(scrapedData);
    console.log("✅ AI Success. Headline:", aiDetails.headline);
    console.log("✅ Full Flow logic passed (excluding DB).");

  } catch (err) {
    console.error("❌ FLOW FAILED:", err);
  }
}

debugFlow();
