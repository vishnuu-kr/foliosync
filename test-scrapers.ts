import { scrapeTwitter } from './lib/scrapers/twitter';
import { scrapeLinkedIn } from './lib/scrapers/linkedin';
import { searchProfessionalDetails } from './lib/scrapers/search';
import dotenv from 'dotenv';

dotenv.config();

async function test() {
  console.log('--- Testing Twitter (torvalds) ---');
  try {
    const twitterData = await scrapeTwitter(undefined, 'torvalds');
    console.log('Twitter Profile:', twitterData.profile.username, '-', twitterData.profile.name);
    console.log('Tweets Found:', twitterData.tweets.length);
    if (twitterData.tweets.length > 0) {
      console.log('Latest Tweet Snippet:', twitterData.tweets[0].text.substring(0, 100));
    }
  } catch (e: any) {
    console.error('Twitter Test Failed:', e.message);
  }

  console.log('\n--- Testing LinkedIn (linustorvalds) ---');
  try {
    // Note: This might return null if no cookie/API key and public page is limited
    const linkedinData = await scrapeLinkedIn('https://www.linkedin.com/in/linustorvalds');
    if (linkedinData) {
      console.log('LinkedIn Profile:', linkedinData.profile.firstName, linkedinData.profile.lastName);
      console.log('Experience Found:', linkedinData.experience.length);
      if (linkedinData.experience.length > 0) {
        console.log('Latest Experience:', linkedinData.experience[0].title, '@', linkedinData.experience[0].company);
      }
    } else {
      console.log('LinkedIn Scraper returned null (likely blocked or no data found)');
    }
  } catch (e: any) {
    console.error('LinkedIn Test Failed:', e.message);
  }

  console.log('\n--- Testing Web Recon (DuckDuckGo Lite) ---');
  try {
     const recon = await searchProfessionalDetails('Linus Torvalds', 'LinkedIn');
     console.log('Recon Found Snippets (First 150 chars):');
     console.log(recon.substring(0, 150), '...');
  } catch (e: any) {
     console.error('Web Recon Failed:', e.message);
  }
}

test();
