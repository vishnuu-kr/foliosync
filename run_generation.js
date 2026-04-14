require('dotenv').config();
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    esModuleInterop: true,
    paths: {
      "@/*": ["./*"]
    }
  }
});
require('tsconfig-paths').register();

// Run the generation logic
const { createPortfolioForUser } = require('./lib/services/portfolio');

async function go() {
  console.log("Starting debug generation...");
  try {
    const result = await createPortfolioForUser({
      github: "vishnuu-kr",
      linkedin: "viishnuu",
      twitter: "vishnuu_kr" 
    });
    console.log("✅ Success! Created user:", result.username);
  } catch (e) {
    console.error("❌ Failed:", e);
  }
}

go();
