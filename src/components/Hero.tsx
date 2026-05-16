'use client'

import { useState } from 'react'

const sm: React.CSSProperties = {
  fontFamily: 'var(--font-space)',
  fontSize: 10,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}

const STATS = [
  { label: 'Clubs mapped', value: '214', color: '#C8F135' },
  { label: 'Routes logged', value: '1.2k', color: '#C8F135' },
  { label: 'Runners signed up', value: '38k', color: '#C8F135' },
  { label: 'Boroughs covered', value: '32', color: '#C8F135' },
]

export default function Hero({ city }: { city: string }) {
  const [postcode, setPostcode] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      style={{
        padding: '52px 24px 44px',
        borderBottom: '1px solid #1C1C1C',
        background: '#0C0C0C',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 32,
        alignItems: 'end',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hero background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.12,
          filter: 'grayscale(100%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div style={{ ...sm, color: '#444', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8F135', display: 'inline-block', flexShrink: 0 }} />
          {city.charAt(0).toUpperCase() + city.slice(1)} — run culture, mapped
        </div>

        {/* Headline */}
        <div
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(64px, 10vw, 80px)',
            lineHeight: 0.9,
            color: '#F0EFE9',
            marginBottom: 18,
          }}
        >
          Find<br />your<br />people.<br />
          <em style={{ color: '#FF4500', fontStyle: 'normal', display: 'block' }}>Your route.</em>
        </div>

        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7, fontWeight: 300, maxWidth: 280, marginBottom: 24 }}>
          Every run club, every borough, every vibe. London runs together.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            border: '1px solid #2A2A2A',
            borderRadius: 2,
            overflow: 'hidden',
            maxWidth: 360,
          }}
        >
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            placeholder="Postcode or area..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              padding: '11px 14px',
              color: '#F0EFE9',
              fontSize: 13,
              fontWeight: 300,
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              background: '#FF4500',
              border: 'none',
              padding: '11px 16px',
              color: '#fff',
              fontFamily: 'var(--font-space)',
              fontSize: 10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Find clubs
          </button>
        </form>
      </div>

      {/* Stats box */}
      <div style={{ border: '1px solid #1C1C1C', borderRadius: 2, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '13px 18px',
              borderBottom: i < STATS.length - 1 ? '1px solid #1C1C1C' : 'none',
            }}
          >
            <span style={{ ...sm, color: '#444' }}>{s.label}</span>
            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 26, color: s.color, lineHeight: 1 }}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
