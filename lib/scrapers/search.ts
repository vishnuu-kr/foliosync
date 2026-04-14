import axios from 'axios';
import * as cheerio from 'cheerio';

export async function searchProfessionalDetails(handle: string, platform: string): Promise<string> {
  try {
    const query = `${handle} ${platform} professional profile experience bio`;
    const url = `https://lite.duckduckgo.com/lite/`;
    
    // Always use URLSearchParams to ensure proper form-urlencoded encoding (properly encodes spaces to + internally when converted to string, or handles URL safety correctly)
    const payload = `q=${encodeURIComponent(query).replace(/%20/g, '+')}`;
    
    const { data } = await axios.post(url, payload, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 10000
    });

    const $ = cheerio.load(data);
    const snippets: string[] = [];
    
    $('.result-snippet').each((i, el) => {
      let elm = $(el);
      snippets.push(elm.text().trim());
    });
    
    if(snippets.length > 5) snippets.length = 5;
    return snippets.join('\n---\n');
  } catch (e: any) {
    console.warn(`Search reconnaissance failed for ${handle} on ${platform}:`, e.message);
    return '';
  }
}