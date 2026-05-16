'use client'

import Link from 'next/link'
import { useState } from 'react'

const TICKER = [
  '214 clubs mapped',
  'London · Cape Town · Amsterdam',
  '38k runners signed up',
  'Run(Your)Way — 1 Aug 2025',
  'Strava heatmap live',
  'Night safety overlay active',
  'Sponsors open now',
]

const HIGHLIGHTS: Record<string, string> = {
  '214': '#C8F135',
  '38k': '#C8F135',
  '1 Aug 2025': '#FF4500',
}

function TickerItem({ text }: { text: string }) {
  let content = <>{text}</>
  for (const [key, color] of Object.entries(HIGHLIGHTS)) {
    if (text.includes(key)) {
      const [before, after] = text.split(key)
      content = (
        <>
          {before}
          <span style={{ color }}>{key}</span>
          {after}
        </>
      )
      break
    }
  }
  return (
    <span
      style={{
        fontFamily: 'var(--font-space)',
        fontSize: 10,
        color: '#333',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '0 28px',
        whiteSpace: 'nowrap',
      }}
    >
      {content}
    </span>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      {/* Main nav */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
          borderBottom: '1px solid #222',
          background: '#0C0C0C',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-roboto-mono)',
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#F0EFE9',
            textDecoration: 'none',
          }}
        >
          myrun<span style={{ color: '#FF4500' }}>.club</span>
        </Link>

        <div className="hidden md:flex" style={{ gap: 20 }}>
          {['map', 'clubs', 'runway', 'cities'].map((l) => (
            <Link
              key={l}
              href={l === 'cities' ? '/' : `/london#${l}`}
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: 10,
                color: '#555',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {l}
            </Link>
          ))}
        </div>

        <button
          className="hidden md:block"
          style={{
            fontFamily: 'var(--font-space)',
            fontSize: 10,
            padding: '7px 16px',
            border: '1px solid #FF4500',
            color: '#FF4500',
            borderRadius: 2,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            background: 'transparent',
          }}
          onClick={() => document.getElementById('runway')?.scrollIntoView({ behavior: 'smooth' })}
        >
          join the run
        </button>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontSize: 20 }}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Ticker */}
      <div
        style={{
          overflow: 'hidden',
          padding: '9px 0',
          background: '#0C0C0C',
          borderBottom: '1px solid #1C1C1C',
        }}
      >
        <div className="ticker-anim" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <TickerItem key={i} text={t} />
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: '#0C0C0C',
            borderBottom: '1px solid #1C1C1C',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {['map', 'clubs', 'runway', 'cities'].map((l) => (
            <Link
              key={l}
              href={l === 'cities' ? '/' : `/london#${l}`}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: 10,
                color: '#555',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {l}
            </Link>
          ))}
          <button
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 10,
              padding: '10px',
              border: '1px solid #FF4500',
              color: '#FF4500',
              borderRadius: 2,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              background: 'transparent',
            }}
          >
            join the run
          </button>
        </div>
      )}
    </div>
  )
}
