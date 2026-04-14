const { chromium, devices } = require('playwright');
const cheerio = require('cheerio');

async function testPlaywrightStealth(username) {
  const iPhone = devices['iPhone 14 Pro Max'];
  console.log(`🚀 Starting Playwright Stealth (iPhone) test for ${username}...`);
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    // Use iPhone emulation for a more "human" request profile
    const context = await browser.newContext({
      ...iPhone,
      locale: 'en-US',
      timezoneId: 'America/New_York',
    });
    const page = await context.newPage();
    const url = `https://www.linkedin.com/in/${username}`;
    
    console.log(`Navigating to ${url}...`);
    // Wait for networkidle to make sure dynamic content is there
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Add a small human-like delay
    await page.waitForTimeout(3000);

    const html = await page.content();
    const $ = cheerio.load(html);

    const name = $('.top-card-layout__title').text().trim() || $('h1').first().text().trim();
    
    if (name) {
      console.log("✅ SUCCESS! Scraper broke through.");
      console.log("- Name:", name);
      console.log("- Headline:", $('.top-card-layout__headline').text().trim());
      
      const experiences = [];
      $('.experience-item').each((i, el) => {
          experiences.push({
              title: $(el).find('.experience-item__title').text().trim(),
              company: $(el).find('.experience-item__subtitle').text().trim()
          });
      });
      console.log(`Found ${experiences.length} experiences.`);
    } else {
      console.log("❌ BLOCKED: LinkedIn still knows we are a bot.");
      const title = await page.title();
      console.log("Page Title:", title);
      // await page.screenshot({ path: 'blocked.png' });
    }
  } catch (error) {
    console.error("❌ Fatal error:", error.message);
  } finally {
    if (browser) await browser.close();
  }
}

testPlaywrightStealth('viishnuu'); 
