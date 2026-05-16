import Link from 'next/link'

export default function Footer() {
  const sm: React.CSSProperties = {
    fontFamily: 'var(--font-space)',
    fontSize: 9,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  }

  return (
    <footer style={{ background: '#0C0C0C', padding: '32px 24px 24px', borderTop: '1px solid #1C1C1C' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 24,
          marginBottom: 28,
          paddingBottom: 24,
          borderBottom: '1px solid #1C1C1C',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-roboto-mono)',
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#F0EFE9',
            }}
          >
            myrun<span style={{ color: '#FF4500' }}>.club</span>
          </div>
          <div style={{ ...sm, color: '#555', marginTop: 10, lineHeight: 2.4 }}>
            Top run clubs.<br />
            Top neighbourhoods.<br />
            Top vibes.
          </div>
        </div>

        <div>
          <div style={{ ...sm, color: '#555', marginBottom: 14 }}>Navigate</div>
          {['Map', 'Clubs', 'Routes', 'Run(Your)Way', 'Submit a club'].map((item) => (
            <Link
              key={item}
              href={`/london#${item.toLowerCase().replace(/[^a-z]/g, '')}`}
              style={{ ...sm, color: '#888', display: 'block', marginBottom: 10, textDecoration: 'none' }}
            >
              {item}
            </Link>
          ))}
        </div>

        <div>
          <div style={{ ...sm, color: '#555', marginBottom: 14 }}>Cities</div>
          <Link href="/london" style={{ ...sm, color: '#C8F135', display: 'block', marginBottom: 10, textDecoration: 'none' }}>
            London
          </Link>
          <span style={{ ...sm, color: '#444', display: 'block', marginBottom: 10 }}>Cape Town — soon</span>
          <span style={{ ...sm, color: '#444', display: 'block', marginBottom: 16 }}>Amsterdam — soon</span>
          <div style={{ ...sm, color: '#555', marginBottom: 10 }}>Follow</div>
          <a
            href="https://instagram.com/myrun.club"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...sm, color: '#888', display: 'block', textDecoration: 'none' }}
          >
            Instagram
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ ...sm, color: '#555' }}>© 2025 myrun.club</div>
        <div style={{ ...sm, color: '#555' }}>Built for runners, by runners</div>
      </div>
    </footer>
  )
}
