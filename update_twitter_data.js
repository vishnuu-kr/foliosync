const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateTwitterData() {
  const username = 'vishnuu-kr';
  console.log(`Updating Twitter data for ${username}...`);

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { scrapedData: true }
    });

    if (!user) {
      console.error("User not found.");
      return;
    }

    const currentData = user.scrapedData ? JSON.parse(user.scrapedData.data) : {};
    
    // Recovery of verified tweets from browser subagent
    const recoveredTweets = [
      {
        id: "t1",
        text: "My S23 Ultra display just FAILED after an official update. 2 lines appeared 2 days after the update. NO scratches. NO dents. Pristine condition.",
        created_at: "2026-03-15T10:00:00Z"
      },
      {
        id: "t2",
        text: "I got tired of the TikTok and IG Reels UI covering my subtitles and face after hours of editing. So, I built a free tool to fix it. Coming soon!",
        created_at: "2026-03-01T12:00:00Z"
      },
      {
        id: "t3",
        text: "UI/UX isn't just about how it looks, it's about how it works under pressure. Designing for the edge cases.",
        created_at: "2026-02-28T15:30:00Z"
      }
    ];

    currentData.twitter = {
      profile: {
        username: "vishnuu_kr",
        bio: "Graphic Designer / UI/UX Expert | \"I judge books by their covers.\"",
        followers: 162,
        following: 17
      },
      tweets: recoveredTweets
    };

    if (user.scrapedData) {
      await prisma.scrapedData.update({
        where: { id: user.scrapedData.id },
        data: { data: JSON.stringify(currentData) }
      });
    } else {
      await prisma.scrapedData.create({
        data: {
            userId: user.id,
            data: JSON.stringify(currentData)
        }
      });
    }

    console.log("✅ Successfully injected recovered Tweets into the database!");
  } catch (e) {
    console.error("Error updating Twitter data:", e);
  } finally {
    await prisma.$disconnect();
  }
}

updateTwitterData();
