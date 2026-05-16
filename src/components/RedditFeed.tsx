type Post = {
  id: string; title: string; url: string; score: number; num_comments: number; subreddit: string
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
  const [ldn, running] = await Promise.all([fetchPosts('ldn_running', 5), fetchPosts('running', 4)])
  const posts = [...ldn, ...running.slice(0, 3)]

  const sm: React.CSSProperties = {
    fontFamily: 'var(--font-space)',
    fontSize: 9,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  }

  return (
    <section style={{ background: '#0C0C0C', padding: '32px 24px', borderBottom: '1px solid #1C1C1C' }}>
      <div style={{ ...sm, color: '#444', marginBottom: 8 }}>Community</div>
      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, color: '#F0EFE9', lineHeight: 1, marginBottom: 20 }}>
        From the running internet
      </div>

      {posts.length === 0 ? (
        <p style={{ ...sm, color: '#333' }}>Community posts unavailable right now.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 }}>
          {posts.map((post) => (
            <a
              key={post.id}
              href={`https://reddit.com${post.url}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', padding: 16, border: '1px solid #1C1C1C', borderRadius: 2, textDecoration: 'none', transition: 'border-color 0.15s' }}
            >
              <div style={{ ...sm, fontSize: 9, color: '#444', marginBottom: 10 }}>r/{post.subreddit}</div>
              <p style={{ fontSize: 12, fontWeight: 500, color: '#F0EFE9', lineHeight: 1.5, marginBottom: 10 }}
                className="line-clamp-3">
                {post.title}
              </p>
              <div style={{ ...sm, fontSize: 8, color: '#333', display: 'flex', gap: 12 }}>
                <span>↑ {post.score}</span>
                <span>{post.num_comments} comments</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
