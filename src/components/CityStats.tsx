const STATS = [
  { label: 'Club members', value: '5,019', color: '#C8F135', sub: '+214 this month' },
  { label: 'Runs logged', value: '19,183', color: '#FF4500', sub: 'this month' },
  { label: 'Distance covered', value: '401k km', color: '#F0EFE9', sub: 'in total' },
  { label: 'Raised for charity', value: '£29k', color: '#C8F135', sub: 'in total' },
]

const INFLUENCERS = [
  { initials: 'JR', handle: '@jogger_riz', name: 'Riz Ahmed', followers: '82.4k', area: 'East London' },
  { initials: 'KM', handle: '@km.culture', name: 'Kemi Miles', followers: '61.2k', area: 'South London' },
  { initials: 'SR', handle: '@stvnruns', name: 'Steven Park', followers: '44.8k', area: 'Hackney' },
  { initials: 'TH', handle: '@tara.hits', name: 'Tara Hassan', followers: '38.1k', area: 'Clapham' },
  { initials: 'LW', handle: '@lenaworks', name: 'Lena Walsh', followers: '29.3k', area: 'Islington' },
  { initials: 'DC', handle: '@rundemcrew', name: 'Run Dem Crew', followers: '24.7k', area: 'Culture' },
  { initials: 'MB', handle: '@milesbymo', name: 'Mo Bakare', followers: '19.5k', area: 'Peckham' },
]

const sm: React.CSSProperties = {
  fontFamily: 'var(--font-space)',
  fontSize: 9,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
}

export default function CityStats() {
  return (
    <section style={{ background: '#0C0C0C', borderBottom: '1px solid #1C1C1C', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ ...sm, color: '#444', marginBottom: 8 }}>Live data · powered by Strava</div>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 40, color: '#F0EFE9', lineHeight: 1 }}>
            London by numbers
          </div>
        </div>
        <div style={{ ...sm, color: '#FF4500' }}>Updated in real time</div>
      </div>

      {/* Stat grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 1,
          border: '1px solid #1C1C1C',
          borderRadius: 2,
          overflow: 'hidden',
          marginBottom: 24,
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              background: '#111',
              padding: '18px 16px',
              borderRight: i < STATS.length - 1 ? '1px solid #1C1C1C' : 'none',
            }}
          >
            <div style={{ ...sm, color: '#444', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, lineHeight: 1, color: s.color, marginBottom: 2 }}>
              {s.value}
            </div>
            <div style={{ ...sm, fontSize: 8, color: '#333' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Influencers */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-space)',
          fontSize: 10,
          color: '#444',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        <span>London runners to follow</span>
        <span style={{ color: '#FF4500', cursor: 'pointer' }}>See all →</span>
      </div>

      <div className="hscroll">
        {INFLUENCERS.map((p) => (
          <div
            key={p.handle}
            style={{
              flexShrink: 0,
              width: 140,
              border: '1px solid #1C1C1C',
              borderRadius: 2,
              overflow: 'hidden',
              background: '#111',
            }}
          >
            <div
              style={{
                height: 88,
                background: '#141414',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderBottom: '1px solid #1C1C1C',
              }}
            >
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: '#2A2A2A' }}>{p.initials}</span>
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#FF4500',
                }}
              />
            </div>
            <div style={{ padding: 10 }}>
              <div style={{ ...sm, fontSize: 9, color: '#FF4500', marginBottom: 3 }}>{p.handle}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#F0EFE9', marginBottom: 3 }}>{p.name}</div>
              <div style={{ ...sm, fontSize: 8, color: '#444' }}>{p.followers} followers</div>
              <div
                style={{
                  ...sm,
                  fontSize: 8,
                  padding: '2px 6px',
                  border: '1px solid #222',
                  color: '#555',
                  display: 'inline-block',
                  marginTop: 6,
                  borderRadius: 2,
                }}
              >
                {p.area}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
