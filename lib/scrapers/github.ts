import axios from 'axios'

export interface GitHubData {
  profile: {
    login: string
    name: string
    bio: string
    avatar_url: string
    html_url: string
    company: string | null
    location: string | null
    blog: string | null
    twitter_username: string | null
    public_repos: number
    followers: number
    following: number
    created_at: string
  }
  repos: Array<{
    name: string
    full_name: string
    description: string | null
    html_url: string
    homepage: string | null
    language: string | null
    stargazers_count: number
    sourceId: string
    forks_count: number
    topics: string[]
    created_at: string
    updated_at: string
    pushed_at: string
    fork: boolean
    url: string
    stars: number
  }>
  languages: Record<string, number> // language → total bytes
  contributions: {
    totalLastYear: number
    streak: number
  }
  pinnedRepos: string[]
  readmeContent: string | null
}

export async function scrapeGitHub(
  usernameOrToken: string,
  isToken: boolean = false
): Promise<GitHubData> {
  
  // Adaptive headers depending on auth flow
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  }

  // If we have a real access token (e.g. from NextAuth), use it.
  // Otherwise, use a system token if available.
  const token = isToken ? usernameOrToken : process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const username = isToken ? undefined : usernameOrToken

  // 1) Profile
  const profileEndpoint = username 
    ? `https://api.github.com/users/${username}` 
    : 'https://api.github.com/user'

  const { data: profile } = await axios.get(profileEndpoint, { headers })
  
  // ensure we have the username for the rest of the endpoints
  const activeUser = profile.login;

  // 2) All repos (paginated — up to 200)
  const allRepos: any[] = []
  for (let page = 1; page <= 4; page++) {
    // If not authenticated, we use the /users/{username}/repos endpoint
    const repoEndpoint = username 
      ? `https://api.github.com/users/${activeUser}/repos?per_page=100&page=${page}&sort=updated&type=owner`
      : `https://api.github.com/user/repos?per_page=100&page=${page}&sort=updated&type=owner`
    
    const { data: repos } = await axios.get(repoEndpoint, { headers })
    allRepos.push(...repos)
    if (repos.length < 100) break
  }

  // Filter out forks, sort by stars
  const ownRepos = allRepos
    .filter((r: any) => !r.fork)
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)

  // 3) Aggregate languages across all repos
  const languages: Record<string, number> = {}
  const topRepos = ownRepos.slice(0, 20) // check top 20 repos for languages

  await Promise.all(
    topRepos.map(async (repo: any) => {
      try {
        const { data: repoLangs } = await axios.get(
          `https://api.github.com/repos/${repo.full_name}/languages`,
          { headers }
        )
        for (const [lang, bytes] of Object.entries(repoLangs)) {
          languages[lang] = (languages[lang] || 0) + (bytes as number)
        }
      } catch {}
    })
  )

  // 4) Contribution count (via GraphQL — requires token always to work fully)
  let totalContributions = 0
  let pinnedRepos: string[] = []
  
  if (token) {
    try {
      const { data: graphqlData } = await axios.post(
        'https://api.github.com/graphql',
        {
          query: `
            query {
              user(login: "${activeUser}") {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                  }
                }
                pinnedItems(first: 6, types: REPOSITORY) {
                  nodes {
                    ... on Repository {
                      name
                    }
                  }
                }
              }
            }
          `,
        },
        { headers }
      )
      
      const userNode = graphqlData.data?.user
      if (userNode) {
        totalContributions = userNode.contributionsCollection?.contributionCalendar?.totalContributions || 0
        pinnedRepos = userNode.pinnedItems?.nodes?.map((n: any) => n.name) || []
      }
    } catch (e: any) {
      console.warn("GitHub GraphQL fallback failed: ", e.response?.data || e.message)
    }
  }

  // 5) Profile README (username/username repo)
  let readmeContent: string | null = null
  try {
    const { data: readme } = await axios.get(
      `https://api.github.com/repos/${activeUser}/${activeUser}/readme`,
      { headers: { ...headers, Accept: 'application/vnd.github.v3.raw' } }
    )
    readmeContent = typeof readme === 'string' ? readme : null
  } catch {}

  return {
    profile: {
      login: profile.login,
      name: profile.name || profile.login,
      bio: profile.bio || '',
      avatar_url: profile.avatar_url,
      html_url: profile.html_url,
      company: profile.company,
      location: profile.location,
      blog: profile.blog,
      twitter_username: profile.twitter_username,
      public_repos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      created_at: profile.created_at,
    },
    repos: ownRepos.map((r: any) => ({
      name: r.name,
      full_name: r.full_name,
      description: r.description,
      html_url: r.html_url,
      homepage: r.homepage,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      topics: r.topics || [],
      created_at: r.created_at,
      updated_at: r.updated_at,
      pushed_at: r.pushed_at,
      fork: r.fork,
      // mapping legacy fields expected by our existing AI portfolio tool
      sourceId: r.id?.toString() || r.name,
      url: r.html_url,
      stars: r.stargazers_count
    })),
    languages,
    contributions: {
      totalLastYear: totalContributions,
      streak: 0,
    },
    pinnedRepos: pinnedRepos || [],
    readmeContent,
  }
}
