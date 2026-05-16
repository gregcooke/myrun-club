'use client'

const PANELS = [
  {
    time: '06:00 — Sunrise',
    title: 'Victoria Park\nat first light',
    loc: 'East London · E3',
    src: 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=600&h=900&fit=crop',
    alt: 'morning run',
  },
  {
    time: '12:00 — Midday',
    title: 'Embankment\nlunch break',
    loc: 'Central London · SE1',
    src: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&h=900&fit=crop',
    alt: 'day run',
  },
  {
    time: '21:00 — Night',
    title: 'City lights,\nlit routes',
    loc: 'City of London · EC1',
    src: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=600&h=900&fit=crop',
    alt: 'night run',
  },
]

export default function PhotoStrip() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '28px 24px 18px',
          background: '#0C0C0C',
        }}
      >
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 48, color: '#F0EFE9', lineHeight: 0.9 }}>
          London runs.<br />Every hour.
        </div>
        <div
          style={{
            fontFamily: 'var(--font-space)',
            fontSize: 9,
            color: '#444',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textAlign: 'right',
            lineHeight: 2.2,
          }}
        >
          Morning · Day · Night<br />Your city. Your pace.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, height: 320, background: '#0C0C0C' }}>
        {PANELS.map((p) => (
          <div
            key={p.time}
            style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.alt}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            />
            <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: 0.45 }} />
            <div style={{ position: 'relative', zIndex: 2, padding: 16 }}>
              <div
                style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: 8,
                  color: '#FF4500',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 5,
                }}
              >
                {p.time}
              </div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: '#F0EFE9', lineHeight: 1, marginBottom: 4, whiteSpace: 'pre-line' }}>
                {p.title}
              </div>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: 8, color: '#666', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {p.loc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
