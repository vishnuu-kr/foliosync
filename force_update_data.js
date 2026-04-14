const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function forceUpdate() {
  const username = 'vishnuu-kr';
  console.log(`Force updating data for ${username}...`);

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      console.error("User not found in DB.");
      return;
    }

    // 1. Update Headline and Bio
    await prisma.user.update({
      where: { id: user.id },
      data: {
        headline: "VISHNU K R - UI/UX Expert | Digital Creator | Developer",
        bio: "Passionate Developer and Creative Digital Creator with 2+ years of experience in UI/UX design, app redesign, and high-quality digital content creation. I specialize in building innovative technical projects like NoseTrack and Cinelore, blending design aesthetics with robust development.",
      }
    });

    // 2. Clear and Insert Experience
    await prisma.experience.deleteMany({ where: { userId: user.id } });
    await prisma.experience.createMany({
      data: [
        {
          userId: user.id,
          source: "manual-recovery",
          company: "Freelance",
          role: "Thumbnail Designer & Creative Content Creator",
          description: "Specialized in creating high-quality digital assets and visual identity for digital platforms.",
          startDate: "2022",
          current: true
        },
        {
          userId: user.id,
          source: "manual-recovery",
          company: "Self-Employed",
          role: "UI/UX Designer",
          description: "Expert in redesigning mobile and web applications to improve user experience and interface aesthetics.",
          startDate: "2021",
          current: false
        }
      ]
    });

    // 3. Update Skills
    await prisma.skill.deleteMany({ where: { userId: user.id } });
    await prisma.skill.createMany({
      data: [
        { userId: user.id, name: "UI/UX Design", level: 9, evidence: "App Redesign Projects" },
        { userId: user.id, name: "Thumbnail Design", level: 10, evidence: "Digital Creator" },
        { userId: user.id, name: "TypeScript", level: 8, evidence: "Cinelore Project" },
        { userId: user.id, name: "Python", level: 7, evidence: "NoseTrack (Computer Vision)" },
        { userId: user.id, name: "Next.js", level: 8, evidence: "FolioSync" },
        { userId: user.id, name: "Figma", level: 9, evidence: "Design Expert" }
      ]
    });

    console.log("✅ Successfully injected recovered data into the database!");
  } catch (e) {
    console.error("Error during force update:", e);
  } finally {
    await prisma.$disconnect();
  }
}

forceUpdate();
