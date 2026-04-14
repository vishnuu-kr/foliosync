import { TwitterApi } from 'twitter-api-v2'
import axios from 'axios'
import * as cheerio from 'cheerio'

export interface TwitterData {
  profile: {
    id: string
    name: string
    username: string
    bio: string
    avatar: string
    banner: string | null
    followers: number
    following: number
    tweetCount: number
    location: string | null
    url: string | null
    verified: boolean
    created_at: string
  }
  tweets: Array<{
    id: string
    text: string
    created_at: string
    likes: number
    retweets: number
    replies: number
    impressions: number
    isRetweet: boolean
    media: string[]
  }>
  topTweets: Array<{
    id: string
    text: string
    likes: number
    retweets: number
  }>
}

// ─────────────────────────────────────────────
// STRATEGY 1: Twitter API v2 (Free Tier)
//   Gets profile info. Free tier only allows
//   GET /2/users/me — no tweet reading.
// ─────────────────────────────────────────────
export async function scrapeTwitterAPI(
  accessToken: string
): Promise<Partial<TwitterData>> {
  const client = new TwitterApi(accessToken)

  const { data: user } = await client.v2.me({
    'user.fields': [
      'description',
      'profile_image_url',
      'public_metrics',
      'location',
      'url',
      'verified',
      'created_at',
    ],
  })

  return {
    profile: {
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.description || '',
      avatar: (user.profile_image_url || '').replace('_normal', '_400x400'),
      banner: null,
      followers: user.public_metrics?.followers_count || 0,
      following: user.public_metrics?.following_count || 0,
      tweetCount: user.public_metrics?.tweet_count || 0,
      location: user.location || null,
      url: user.url || null,
      verified: user.verified || false,
      created_at: user.created_at || '',
    },
    tweets: [],
    topTweets: [],
  }
}

// ─────────────────────────────────────────────
// STRATEGY 2: Scrape via VxTwitter API
//   Open-source embed generator returning clean JSON
//   This bypasses Twitter auth-wall for basic profile data
// ─────────────────────────────────────────────
export async function scrapeTwitterWeb(
  username: string
): Promise<Partial<TwitterData>> {
  const tweets: TwitterData['tweets'] = []

  try {
    // FxTwitter / VxTwitter API provides user data without auth
    const { data } = await axios.get(`https://api.vxtwitter.com/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      timeout: 10000,
    })

    if (data && !data.error) {
      return {
        profile: {
          id: data.id || '',
          name: data.name || username,
          username: data.screen_name || username,
          bio: data.description || '',
          avatar: data.profile_image_url || '',
          banner: null,  // vxtwitter doesn't provide banners reliably in basic view
          followers: data.followers_count || 0,
          following: data.following_count || 0,
          tweetCount: data.tweet_count || 0,
          location: data.location || null,
          url: null,     // Website url isn't standard in vxtwitter output
          verified: data.verified || false,
          created_at: data.created_at || '',
        },
        tweets: [],
        topTweets: [],
      }
    }
  } catch (e) {
    console.log('VxTwitter API failed, falling back...')
  }

  // Backup if VxTwitter API changes or fails: Return barebones structure
  return {
    profile: undefined,
    tweets,
    topTweets: [],
  }
}

// ─────────────────────────────────────────────
// STRATEGY 3: Parse user's Twitter data export
//   User downloads from: Settings → Your Account
//   → Download an archive of your data
//   Then uploads the tweets.js file
// ─────────────────────────────────────────────
export function parseTwitterExport(
  tweetsJsContent: string
): TwitterData['tweets'] {
  // Twitter export starts with "window.YTD.tweets.part0 = "
  const jsonStr = tweetsJsContent
    .replace(/^window\.YTD\.tweets\.part\d+\s*=\s*/, '')
    .trim()

  const rawTweets = JSON.parse(jsonStr)

  return rawTweets.map((item: any) => {
    const t = item.tweet
    return {
      id: t.id_str || t.id,
      text: t.full_text || t.text || '',
      created_at: t.created_at || '',
      likes: parseInt(t.favorite_count) || 0,
      retweets: parseInt(t.retweet_count) || 0,
      replies: 0,
      impressions: 0,
      isRetweet: (t.full_text || '').startsWith('RT @'),
      media: (t.entities?.media || []).map((m: any) => m.media_url_https),
    }
  })
}

// ─────────────────────────────────────────────
// COMBINED SCRAPER: tries all strategies
// ─────────────────────────────────────────────
export async function scrapeTwitter(
  accessToken?: string,
  username?: string
): Promise<TwitterData> {
  let profile: TwitterData['profile'] | undefined
  let tweets: TwitterData['tweets'] = []

  // Try API first (if we have a token)
  if (accessToken) {
    try {
      const apiData = await scrapeTwitterAPI(accessToken)
      profile = apiData.profile as any
      username = profile?.username
    } catch (e: any) {
      console.log('Twitter API failed:', e.message)
    }
  }

  // Try web scraping for tweets
  if (username) {
    try {
      const webData = await scrapeTwitterWeb(username)
      if (!profile && webData.profile) {
        profile = webData.profile as any
      }
      tweets = webData.tweets || []
    } catch (e: any) {
      console.log('Twitter web scrape failed:', e.message)
    }
  }

  // Fallback empty profile
  if (!profile) {
    profile = {
      id: '',
      name: username || 'Unknown',
      username: username || 'unknown',
      bio: '',
      avatar: '',
      banner: null,
      followers: 0,
      following: 0,
      tweetCount: 0,
      location: null,
      url: null,
      verified: false,
      created_at: '',
    }
  }

  return {
    profile,
    tweets,
    topTweets: tweets
      .filter((t) => !t.isRetweet)
      .sort((a, b) => b.likes + b.retweets - (a.likes + a.retweets))
      .slice(0, 5),
  }
}
