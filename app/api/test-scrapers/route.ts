import { NextResponse } from 'next/server';
import { scrapeTwitter } from '@/lib/scrapers/twitter';
import { scrapeLinkedIn } from '@/lib/scrapers/linkedin';
import { searchProfessionalDetails } from '@/lib/scrapers/search';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('u') || 'elonmusk';
  const linkedin = searchParams.get('li') || 'linustorvalds';

  console.log(`--- API Scrapers Test for: ${user} / ${linkedin} ---`);

  const results: any = {
    twitter: null,
    linkedin: null,
    webRecon: null
  };

  try {
    results.twitter = await scrapeTwitter(undefined, user);
  } catch (e: any) {
    results.twitter = { error: e.message };
  }

  try {
    results.linkedin = await scrapeLinkedIn(`https://www.linkedin.com/in/${linkedin}`);
  } catch (e: any) {
    results.linkedin = { error: e.message };
  }

  try {
    results.webRecon = await searchProfessionalDetails(user, 'Software');
  } catch (e: any) {
    results.webRecon = { error: e.message };
  }

  return NextResponse.json({
    success: true,
    user,
    linkedinTarget: linkedin,
    results: {
      twitter: {
        username: results.twitter?.profile?.username,
        name: results.twitter?.profile?.name,
        tweetsCount: results.twitter?.tweets?.length || 0,
        firstTweet: results.twitter?.tweets?.[0]?.text?.substring(0, 50)
      },
      linkedin: {
        name: results.linkedin ? `${results.linkedin.profile.firstName} ${results.linkedin.profile.lastName}` : 'Not Found',
        experienceCount: results.linkedin?.experience?.length || 0,
        currentRole: results.linkedin?.experience?.[0]?.title
      },
      webRecon: {
        length: results.webRecon?.length || 0,
        peek: results.webRecon?.substring(0, 100)
      }
    }
  });
}
