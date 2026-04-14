const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const lastUser = await prisma.user.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { scrapedData: true }
  });

  if (!lastUser) {
    console.log("No users found");
    return;
  }

  console.log("User:", lastUser.username);
  if (lastUser.scrapedData) {
    const data = JSON.parse(lastUser.scrapedData.data);
    console.log("LinkedIn Profile:", data.linkedin?.profile?.firstName || "MISSING");
    console.log("X Tweets Count:", data.twitter?.tweets?.length || 0);
    console.log("X Profile:", data.twitter?.profile?.username || "MISSING");
  } else {
    console.log("No ScrapedData blob found for this user");
  }
}

check().catch(console.error).finally(() => prisma.$disconnect());
