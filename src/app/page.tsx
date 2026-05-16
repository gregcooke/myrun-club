import Link from 'next/link'

const CITIES = [
  { slug: 'london', name: 'London', tagline: 'Where run culture was born', clubs: '214 clubs', live: true },
  { slug: 'cape-town', name: 'Cape Town', tagline: 'Mountain paths, ocean roads', clubs: 'Coming soon', live: false },
  { slug: 'amsterdam', name: 'Amsterdam', tagline: 'Canal routes, collective pace', clubs: 'Coming soon', live: false },
]

const sm: React.CSSProperties = {
  fontFamily: 'var(--font-space)',
  fontSize: 9,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: '#0C0C0C' }}>
      <div style={{ ...sm, color: '#444', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8F135', display: 'inline-block' }} />
        Run(Your)Way — Pick your city
      </div>

      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(56px,10vw,96px)', lineHeight: 0.88, color: '#F0EFE9', textAlign: 'center', marginBottom: 8 }}>
        Where do<br />you run?
      </div>

      <p style={{ fontSize: 13, color: '#555', fontWeight: 300, textAlign: 'center', marginBottom: 48, lineHeight: 1.7 }}>
        Find your crew. Discover routes. Run on your terms.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, width: '100%', maxWidth: 800 }}>
        {CITIES.map((city) => (
          <div key={city.slug} style={{ position: 'relative' }}>
            {city.live ? (
              <Link href={`/${city.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                <CityCard city={city} />
              </Link>
            ) : (
              <>
                <CityCard city={city} />
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(12,12,12,0.7)', backdropFilter: 'blur(2px)',
                }}>
                  <span style={{ ...sm, color: '#444', border: '1px solid #2A2A2A', padding: '4px 12px', borderRadius: 2 }}>
                    Coming soon
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}

function CityCard({ city }: { city: typeof CITIES[0] }) {
  return (
    <div style={{
      border: '1px solid #1C1C1C', borderRadius: 2, padding: 24, height: 280,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      background: '#111', cursor: city.live ? 'pointer' : 'default',
    }}>
      <div style={{ fontFamily: 'var(--font-space)', fontSize: 9, color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {city.clubs}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, color: '#F0EFE9', lineHeight: 1, marginBottom: 6 }}>
          {city.name}
          {city.live && <span style={{ color: '#FF4500' }}>.</span>}
        </div>
        <div style={{ fontFamily: 'var(--font-space)', fontSize: 9, color: '#444', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {city.tagline}
        </div>
      </div>
    </div>
  )
}
