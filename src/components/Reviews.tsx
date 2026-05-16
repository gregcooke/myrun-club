'use client'

import { useEffect, useRef, useState } from 'react'

const REVIEWS = [
  {
    name: 'Sarah M.',
    text: '"Found my Wednesday crew through myrun.club. South Circular was exactly what I needed — proper tempo pace, great people, pub after. Bookmarked on day one."',
    time: '3 hours ago · London',
  },
  {
    name: 'Marcus T.',
    text: '"The map is genuinely useful. Changed how I plan my Thursday routes through the City. Nothing else does this for runners."',
    time: '1 day ago · London',
  },
  {
    name: 'Priya K.',
    text: "\"Didn't know half these clubs existed. Found a Sunday long run group two minutes from my flat in Peckham. Game changer.\"",
    time: '2 days ago · London',
  },
  {
    name: 'Jamie R.',
    text: '"Run(Your)Way is going to be huge. Signed up from day one. The community here is exactly who we want to reach."',
    time: '4 days ago · London',
  },
]

const sm: React.CSSProperties = {
  fontFamily: 'var(--font-space)',
  fontSize: 9,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
}

export default function Reviews() {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = () => setCur((c) => (c + 1) % REVIEWS.length)
  const prev = () => setCur((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)

  useEffect(() => {
    if (!paused) {
      timerRef.current = setInterval(next, 4000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused])

  const r = REVIEWS[cur]

  return (
    <section style={{ background: '#F2EDE4', padding: '32px 24px', borderBottom: '1px solid #DDD8CE' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ ...sm, color: '#AAA', marginBottom: 8 }}>What runners say</div>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, color: '#0C0C0C', lineHeight: 1 }}>
            The community<br />speaks
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 40, color: '#0C0C0C', lineHeight: 1 }}>4.9</div>
          <div style={{ fontSize: 14, color: '#0C0C0C', letterSpacing: 2, marginBottom: 2 }}>★★★★★</div>
          <div style={{ ...sm, color: '#AAA' }}>from 1,200+ runners</div>
        </div>
      </div>

      <div
        style={{
          border: '1px solid #DDD8CE',
          borderRadius: 2,
          background: '#F8F4EE',
          padding: 20,
          display: 'grid',
          gridTemplateColumns: '110px 1fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <div>
          <div style={{ ...sm, color: '#AAA', marginBottom: 6 }}>Reviewer</div>
          <div style={{ fontFamily: 'var(--font-space)', fontSize: 11, fontWeight: 700, color: '#0C0C0C', marginBottom: 4 }}>
            {r.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
            <span style={{ color: '#FF4500', fontSize: 11 }}>✓</span>
            <span style={{ ...sm, color: '#AAA' }}>Verified runner</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, letterSpacing: 2, color: '#0C0C0C', marginBottom: 12 }}>★★★★★</div>
          <div style={{ fontFamily: 'var(--font-space)', fontSize: 12, color: '#0C0C0C', lineHeight: 1.7 }}>
            {r.text}
          </div>
          <div style={{ ...sm, fontSize: 9, color: '#BBB', letterSpacing: '0.06em', marginTop: 12 }}>
            {r.time}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={prev}
            style={{ ...sm, fontSize: 14, color: '#AAA', padding: '4px 10px', border: '1px solid #DDD8CE', borderRadius: 2, cursor: 'pointer', background: 'transparent' }}
          >
            ‹
          </button>
          <button
            onClick={next}
            style={{ ...sm, fontSize: 14, color: '#AAA', padding: '4px 10px', border: '1px solid #DDD8CE', borderRadius: 2, cursor: 'pointer', background: 'transparent' }}
          >
            ›
          </button>
        </div>
        <button
          onClick={() => setPaused((p) => !p)}
          style={{ ...sm, color: '#AAA', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          {paused ? '▶ Resume' : '⏸ Pause'}
        </button>
      </div>
    </section>
  )
}
