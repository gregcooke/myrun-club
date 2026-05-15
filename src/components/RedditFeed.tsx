import { ExternalLink } from 'lucide-react'

type Post = {
  id: string
  title: string
  url: string
  score: number
  num_comments: number
  subreddit: string
}

async function fetchPosts(sub: string, limit = 5): Promise<Post[]> {
  try {
    const res = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=${limit}`, {
      headers: { 'User-Agent': 'myrun.club/1.0 (contact greg@rafiki.works)' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return (json.data?.children ?? [])
      .map((c: { data: Post }) => ({ ...c.data, subreddit: sub }))
      .filter((p: Post) => p.title && !p.title.startsWith('['))
  } catch {
    return []
  }
}

export default async function RedditFeed() {
  const [ldn, running] = await Promise.all([
    fetchPosts('ldn_running', 5),
    fetchPosts('running', 4),
  ])

  const posts = [...ldn, ...running.slice(0, 3)]

  return (
    <section className="py-16 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ color: '#E24B4A' }}
          >
            Community
          </p>
          <h2 className="text-3xl font-bold text-zinc-900">From the running internet</h2>
        </div>

        {posts.length === 0 ? (
          <p className="text-zinc-400 text-sm">Community posts unavailable right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <a
                key={post.id}
                href={`https://reddit.com${post.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-zinc-400">r/{post.subreddit}</span>
                  <ExternalLink
                    size={11}
                    className="text-zinc-300 group-hover:text-zinc-400 transition-colors"
                  />
                </div>
                <p className="text-sm font-medium text-zinc-800 leading-snug line-clamp-3">
                  {post.title}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-zinc-400">
                  <span>↑ {post.score}</span>
                  <span>{post.num_comments} comments</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
