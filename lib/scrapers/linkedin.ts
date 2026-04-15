import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { searchProfessionalDetails } from './search'

export interface LinkedInData {
  profile: {
    firstName: string
    lastName: string
    headline: string
    summary: string
    profilePicture: string | null
    location: string | null
    connections: number
    profileUrl: string
  }
  experience: Array<{
    title: string
    company: string
    companyLogo: string | null
    location: string | null
    startDate: string
    endDate: string | null
    current: boolean
    description: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    startYear: number
    endYear: number | null
    logo: string | null
  }>
  skills: string[]
  certifications: Array<{
    name: string
    authority: string
    date: string
  }>
  recommendations: Array<{
    text: string
    author: string
    title: string
  }>
}

// ─────────────────────────────────────────────
// STRATEGY 1: Proxycurl API
//   Sign up at proxycurl.com → 10 FREE credits
//   Each profile lookup = 1 credit
//   After that: $0.01/request (very cheap)
// ─────────────────────────────────────────────
export async function scrapeLinkedInProxycurl(
  profileUrl: string
): Promise<LinkedInData> {
  const apiKey = process.env.PROXYCURL_API_KEY

  if (!apiKey) {
    throw new Error('PROXYCURL_API_KEY not set')
  }

  // Clean the URL
  const cleanUrl = profileUrl
    .replace(/\/$/, '')
    .replace('http://', 'https://')

  const { data } = await axios.get(
    'https://nubela.co/proxycurl/api/v2/linkedin',
    {
      params: {
        linkedin_profile_url: cleanUrl,
        use_cache: 'if-present',
        skills: 'include',
        inferred_salary: 'false',
        personal_email: 'false',
        personal_contact_number: 'false',
        twitter_profile_id: 'false',
        facebook_profile_id: 'false',
        github_profile_id: 'include',
        extra: 'include',
      },
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  )

  return {
    profile: {
      firstName: data.first_name || '',
      lastName: data.last_name || '',
      headline: data.headline || '',
      summary: data.summary || '',
      profilePicture: data.profile_pic_url || null,
      location: data.city
        ? `${data.city}, ${data.state}, ${data.country_full_name}`
        : data.country_full_name || null,
      connections: data.connections || 0,
      profileUrl: cleanUrl,
    },
    experience: (data.experiences || []).map((exp: any) => ({
      title: exp.title || '',
      company: exp.company || '',
      companyLogo: exp.company_linkedin_profile_url || null,
      location: exp.location || null,
      startDate: exp.starts_at
        ? `${exp.starts_at.year}-${String(exp.starts_at.month || 1).padStart(2, '0')}`
        : '',
      endDate: exp.ends_at
        ? `${exp.ends_at.year}-${String(exp.ends_at.month || 1).padStart(2, '0')}`
        : null,
      current: !exp.ends_at,
      description: exp.description || '',
    })),
    education: (data.education || []).map((edu: any) => ({
      school: edu.school || '',
      degree: edu.degree_name || '',
      field: edu.field_of_study || '',
      startYear: edu.starts_at?.year || 0,
      endYear: edu.ends_at?.year || null,
      logo: edu.logo_url || null,
    })),
    skills: (data.skills || []).map((s: any) =>
      typeof s === 'string' ? s : s.name || ''
    ),
    certifications: (data.certifications || []).map((cert: any) => ({
      name: cert.name || '',
      authority: cert.authority || '',
      date: cert.starts_at
        ? `${cert.starts_at.year}-${cert.starts_at.month || 1}`
        : '',
    })),
    recommendations: (data.recommendations || []).map((rec: any) => ({
      text: typeof rec === 'string' ? rec : rec.description || '',
      author: rec.author || '',
      title: rec.title || '',
    })),
  }
}

// ─────────────────────────────────────────────
// STRATEGY 2: Parse LinkedIn Data Export (FREE!)
//   User goes to:
//   LinkedIn → Settings → Data Privacy
//   → Get a copy of your data → Request archive
//   Then uploads the CSV files
//
//   Key files in the export:
//   - Profile.csv
//   - Positions.csv
//   - Education.csv
//   - Skills.csv
//   - Certifications.csv
// ─────────────────────────────────────────────
export function parseLinkedInExport(files: {
  profile?: string      // CSV content
  positions?: string    // CSV content
  education?: string    // CSV content
  skills?: string       // CSV content
  certifications?: string
}): LinkedInData {
  const parseCSV = (csv: string): Record<string, string>[] => {
    const lines = csv.split('\n')
    const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''))
    return lines.slice(1).filter(Boolean).map((line) => {
      const values = line.match(/(".*?"|[^,]+)/g) || []
      const obj: Record<string, string> = {}
      headers.forEach((h, i) => {
        obj[h] = (values[i] || '').replace(/^"|"$/g, '').trim()
      })
      return obj
    })
  }

  // Parse Profile
  const profileRows = files.profile ? parseCSV(files.profile) : []
  const p = profileRows[0] || {}

  // Parse Positions
  const positionRows = files.positions ? parseCSV(files.positions) : []

  // Parse Education
  const educationRows = files.education ? parseCSV(files.education) : []

  // Parse Skills
  const skillRows = files.skills ? parseCSV(files.skills) : []

  return {
    profile: {
      firstName: p['First Name'] || '',
      lastName: p['Last Name'] || '',
      headline: p['Headline'] || '',
      summary: p['Summary'] || '',
      profilePicture: null,
      location: p['Geo Location'] || p['Location'] || null,
      connections: 0,
      profileUrl: '',
    },
    experience: positionRows.map((pos) => ({
      title: pos['Title'] || '',
      company: pos['Company Name'] || '',
      companyLogo: null,
      location: pos['Location'] || null,
      startDate: pos['Started On'] || '',
      endDate: pos['Finished On'] || null,
      current: !pos['Finished On'],
      description: pos['Description'] || '',
    })),
    education: educationRows.map((edu) => ({
      school: edu['School Name'] || '',
      degree: edu['Degree Name'] || '',
      field: edu['Notes'] || '',
      startYear: parseInt(edu['Start Date']) || 0,
      endYear: parseInt(edu['End Date']) || null,
      logo: null,
    })),
    skills: skillRows.map((s) => s['Name'] || s['Skill'] || '').filter(Boolean),
    certifications: [],
    recommendations: [],
  }
}
// ─────────────────────────────────────────────
// STRATEGY 4: Playwright Automated Scraper (FREE!)
//   Runs a headless browser to extract data natively.
//   Wait: May still require a session file/login for some profiles.
// ─────────────────────────────────────────────
export async function scrapeLinkedInPlaywright(
  username: string
): Promise<LinkedInData | null> {
  let browser;
  try {
    // Dynamically require playwright so it doesn't crash serverless builds if not run
    let chromium;
    try {
      const playwright = require('playwright');
      chromium = playwright.chromium;
    } catch {
      console.warn("Playwright not available. Skipping native headless scrape.");
      return null;
    }

    browser = await chromium.launch({ headless: true });
    
    // Check for the li_at session cookie (FREE! No Key required)
    const contextOptions: any = {};
    const sessionCookie = process.env.LINKEDIN_SESSION_COOKIE;
    
    const context = await browser.newContext(contextOptions);
    
    if (sessionCookie) {
      console.log("🔑 Session cookie found! Injecting for LinkedIn...");
      await context.addCookies([{
        name: 'li_at',
        value: sessionCookie,
        domain: '.linkedin.com',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      }]);
    }

    const page = await context.newPage();
    const url = `https://www.linkedin.com/in/${username}`;
    
    // Attempting to visit the profile. 
    // Uses a longer timeout and waits for network idle.
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    const html = await page.content();
    const $ = cheerio.load(html);

    const name = $('.top-card-layout__title').text().trim();
    if (!name) return null; // Blocked or login required

    const [firstName = "", ...lastParts] = name.split(' ');
    const lastName = lastParts.join(' ');

    const experience: LinkedInData['experience'] = [];
    
    // Logged-out Selectors (Public)
    $('.experience-item').each((_: any, el: any) => {
      const $el = $(el);
      experience.push({
        title: $el.find('.experience-item__title').text().trim(),
        company: $el.find('.experience-item__subtitle').text().trim(),
        companyLogo: null,
        location: null,
        startDate: $el.find('.experience-item__duration').text().trim().split('·')[0]?.trim() || "",
        endDate: null,
        current: $el.find('.experience-item__duration').text().includes('Present'),
        description: $el.find('.show-more-less-text__content').text().trim(),
      });
    });

    // Logged-in Selectors (Private/Premium View)
    if (experience.length === 0) {
      $('.artdeco-list__item .pvs-entity').each((_: any, el: any) => {
        const $el = $(el);
        const title = $el.find('span[aria-hidden="true"]').first().text().trim();
        const company = $el.find('span[aria-hidden="true"]').eq(1).text().trim().split('·')[0].trim();
        if (title && company && !title.includes('Present')) {
            experience.push({
                title,
                company,
                companyLogo: null,
                location: null,
                startDate: "",
                endDate: null,
                current: true,
                description: "",
            });
        }
      });
    }

    return {
      profile: {
        firstName,
        lastName,
        headline: $('.top-card-layout__headline').text().trim() || $('.text-body-medium').first().text().trim(),
        summary: $('.summary p').text().trim() || $('.about-us__description').text().trim() || '',
        profilePicture: $('.top-card-layout__entity-image').attr('src') || null,
        location: $('.top-card-layout__first-subline .top-card__subline-item').first().text().trim() || '',
        connections: 0,
        profileUrl: url,
      },
      experience,
      education: [],
      skills: [],
      certifications: [],
      recommendations: [],
    };
  } catch (e) {
    console.log('Playwright LinkedIn scrape failed:', (e as any).message);
    return null;
  } finally {
    if (browser) await browser.close();
  }
}

// ─────────────────────────────────────────────
// STRATEGY 5: Manual Profile HTML (The "Copy-Paste" Fix)
//   If all else fails, the user can save their profile 
//   HTML to `linkedin_profile.html` and we parse it instantly.
// ─────────────────────────────────────────────
export async function parseLinkedInManualHTML(): Promise<LinkedInData | null> {
    const filePath = path.join(process.cwd(), 'linkedin_profile.html');
    if (!fs.existsSync(filePath)) return null;

    console.log("⚠️ Using manual LinkedIn HTML dump found in linkedin_profile.html");
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);

    // Common LinkedIn Selectors (both logged in and out)
    const name = $('.top-card-layout__title').text().trim() || $('.text-heading-xlarge').first().text().trim();
    if (!name) return null;

    const [firstName = "", ...lastParts] = name.split(' ');
    const lastName = lastParts.join(' ');

    const experience: LinkedInData['experience'] = [];
    // Logged-in selectors
    $('.artdeco-list__item .pvs-entity').each((_: any, el: any) => {
        const $el = $(el);
        const title = $el.find('.mr1.t-bold span').first().text().trim();
        const company = $el.find('.t-14.t-normal span').first().text().trim();
        if (title && company) {
            experience.push({
                title,
                company,
                companyLogo: null,
                location: null,
                startDate: "",
                endDate: null,
                current: true,
                description: "",
            });
        }
    });

    return {
      profile: {
        firstName,
        lastName,
        headline: $('.top-card-layout__headline').text().trim() || $('.text-body-medium').first().text().trim(),
        summary: "",
        profilePicture: null,
        location: null,
        connections: 0,
        profileUrl: "",
      },
      experience: experience.length > 0 ? experience : [],
      education: [],
      skills: [],
      certifications: [],
      recommendations: [],
    };
}

// ─────────────────────────────────────────────
// COMBINED: tries Proxycurl first, falls back
// ─────────────────────────────────────────────
export async function scrapeLinkedIn(
  profileUrl?: string,
  exportData?: Parameters<typeof parseLinkedInExport>[0]
): Promise<LinkedInData | null> {
  // Try Proxycurl first
  if (profileUrl && process.env.PROXYCURL_API_KEY) {
    try {
      return await scrapeLinkedInProxycurl(profileUrl)
    } catch (e: any) {
      console.log('Proxycurl failed:', e.message)
    }
  }

  // Try Playwright Automated Scraper (Free!)
  const username = profileUrl?.split('/in/')[1]?.replace(/\/$/, '');
  if (username) {
    const pwData = await scrapeLinkedInPlaywright(username);
    if (pwData && pwData.experience.length > 0) return pwData;
  }

  // Try Jina Reader Fallback (Resilient Free Scraper)
  if (profileUrl) {
    try {
      const { scrapeWithJina } = await import('@/lib/scrapers/jina');
      const jinaContent = await scrapeWithJina(profileUrl);
      if (jinaContent) {
         // Minimal extraction from Jina Markdown (LLM will handle details later, but we need structure)
         // Experience is often listed as "Experience" header in Markdown
         const lines = jinaContent.split('\n');
         const experience: any[] = [];
         let inExperience = false;
         for (const line of lines) {
           if (line.toLowerCase().includes('### experience') || line.toLowerCase().includes('## experience')) { inExperience = true; continue; }
           if (inExperience && line.startsWith('### ')) { // Next section or company
              experience.push({ title: line.replace('###', '').trim(), company: "LinkedIn", current: true });
           }
           if (experience.length >= 5) break;
         }
         if (experience.length > 0) {
            return {
              profile: {
                firstName: username || "",
                lastName: "",
                headline: "",
                summary: jinaContent.substring(0, 500),
                profilePicture: null,
                location: "",
                connections: 0,
                profileUrl: profileUrl,
              },
              experience,
              education: [], skills: [], certifications: [], recommendations: [],
            };
         }
      }
    } catch {}
  }

  // Try Manual HTML Fallback (Ultimate Free Fix)
  const manualData = await parseLinkedInManualHTML();
  if (manualData) return manualData;

  // Try DuckDuckGo Free SERP Scraping Fallback
  if (username) {
    try {
      const snippet = await searchProfessionalDetails(username, 'LinkedIn');

      if (snippet) {
        // Fallback uses the raw handle if we can't extract cleanly from a split title
        const [firstName = "", ...lastParts] = username.replace(/-/g, ' ').split(' ');
        const lastName = lastParts.join(' ');
        
        return {
          profile: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            headline: snippet.substring(0, 100) + '...',
            summary: snippet,
            profilePicture: null,
            location: null,
            connections: 0,
            profileUrl: profileUrl || `https://linkedin.com/in/${username}`,
          },
          experience: [{
            title: "Professional Experience",
            company: "Various (Auto-extracted from search)",
            companyLogo: null,
            location: null,
            startDate: "",
            endDate: null,
            current: true,
            description: snippet
          }],
          education: [], skills: [], certifications: [], recommendations: [],
        }
      }
    } catch (e: any) {
      console.log('DuckDuckGo SERP Scraper failed:', e.message);
    }
  }

  // Try data export
  if (exportData) {
    return parseLinkedInExport(exportData)
  }

  console.warn(
    'LinkedIn scraping was bypassed: either PROXYCURL_API_KEY is missing, ' +
    'or no data export files were provided.'
  )
  
  return {
    profile: {
      firstName: "",
      lastName: "",
      headline: "",
      summary: "",
      profilePicture: null,
      location: null,
      connections: 0,
      profileUrl: profileUrl || "",
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    recommendations: [],
  };
}
