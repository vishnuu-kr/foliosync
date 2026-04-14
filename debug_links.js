const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const user = await prisma.user.findFirst({
    where: { username: 'vishnuu-kr' },
    include: { socialLinks: true, experiences: true, scrapedData: true }
  });

  if (!user) {
    console.log("User vishnuu-kr not found");
    return;
  }

  console.log("Social Links:", user.socialLinks.map(l => `${l.platform}: ${l.url}`));
  console.log("Experiences:", user.experiences.length);

  if (user.scrapedData) {
    const data = JSON.parse(user.scrapedData.data);
    console.log("Data Keys:", Object.keys(data));
    console.log("LinkedIn Value Type:", typeof data.linkedin);
    console.log("LinkedIn Value:", data.linkedin);
    console.log("X Value Type:", typeof data.twitter);
    console.log("LinkedIn Data Present:", !!data.linkedin);
    console.log("X Data Present:", !!data.twitter);
  }
}

check().catch(console.error).finally(() => prisma.$disconnect());
