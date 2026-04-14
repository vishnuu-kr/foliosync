import Groq from "groq-sdk";

// Support for local AI if no key is provided
async function callOllama(prompt: string) {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: prompt,
        stream: false,
        format: "json",
      }),
    });
    const data = await response.json();
    return data.response;
  } catch {
    throw new Error("Local Ollama not found. Please provide GROQ_API_KEY or install Ollama.");
  }
}

export async function generatePortfolio(scrapedData: any) {
  const hasBlogPosts = scrapedData.blogPosts?.length > 0;
  const hasLinkedIn = !!scrapedData.linkedin?.experience?.length;

  const prompt = `You are a world-class professional portfolio designer and investigator.
Based on the following data scraped from a developer's profiles and public search results, generate a stunning portfolio structure.

USER DATA:
${JSON.stringify(scrapedData, null, 2)}

CORE MISSION:
Even if specific profile scrapers fail, use the "webContext" (Search Snippets) to INFER their professional history.
- The webContext contains search result snippets for their social handles. 
- Use mentions in search snippets to verify current role, location, and key skills.
- Combine this with their GitHub README, repository organization names, and projects.

Generate:
1. A compelling headline (8 words max)
2. A professional bio (2-3 sentences, first person). Incorporate inferred career highlights.
3. Pick the TOP 6 projects to feature from their repo list (use sourceId to reference them)
4. Extract ALL technical skills and rate them (1-10) based on evidence.
5. Create a "Professional Experience" timeline. ${hasLinkedIn ? "Use the provided LinkedIn data." : "INFER high-probability work history from their GitHub README, bios, and project involvement."}
6. Suggest a color theme ("minimal", "bold", "creative", "developer")
7. Write a punchy tagline

Respond in ONLY valid JSON format matching this schema exactly, no extra text:
{
  "headline": "",
  "bio": "",
  "tagline": "",
  "featuredProjects": [{ "sourceId": "", "reason": "", "title": "", "description": "" }],
  "skills": [{ "name": "", "level": 5, "evidence": "" }],
  "experience": [{ "company": "", "role": "", "startDate": "", "endDate": "", "description": "", "current": false }],
  "theme": "minimal"${hasBlogPosts ? ',\n  "highlightedPosts": [{ "title": "", "summary": "" }]' : ""}
}`;

  try {
    let responseText = "";

    if (process.env.GROQ_API_KEY) {
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Expert portfolio designer. Output only valid raw JSON." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      });
      responseText = completion.choices[0]?.message?.content || "";
    } else {
      console.log("No GROQ_API_KEY found. Attempting local Ollama...");
      responseText = await callOllama(prompt);
    }

    const clean = responseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    return JSON.parse(clean);
  } catch (error: any) {
    console.error("AI Error:", error.message);
    throw new Error(`AI generation failed. ${!process.env.GROQ_API_KEY ? "Try installing Ollama locally or add a GROQ_API_KEY." : ""}`);
  }
}
