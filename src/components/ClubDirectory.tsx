'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Club = {
  id: string; name: string; borough: string; pace: string
  vibe: string; day: string; meeting_point: string; description: string; instagram: string
}

const PLACEHOLDER: Club[] = [
  { id: '1', name: 'East Run Co.', borough: 'Hackney', pace: 'Social', vibe: 'Social', day: 'Tue + Fri', meeting_point: 'Shoreditch', description: "East London's most social crew. 5K every week, drinks after.", instagram: '@eastrunco' },
  { id: '2', name: 'South Circular', borough: 'Lambeth', pace: 'Tempo', vibe: 'Training', day: 'Wednesday', meeting_point: 'Clapham', description: 'Structured 10K training runs for those building mileage.', instagram: '@southcircular' },
  { id: '3', name: 'Night Lights LDN', borough: 'City', pace: 'Social', vibe: 'Night runs', day: 'Thu 9pm', meeting_point: 'City of London', description: 'Night running with a DJ and an afterparty. Lit routes only.', instagram: '@nightlightsldn' },
  { id: '4', name: 'Vicky Park Runners', borough: 'Hackney', pace: 'Easy', vibe: 'Social', day: 'Sunday', meeting_point: 'Victoria Park', description: 'Long Sunday runs followed by brunch. All welcome.', instagram: '@vickypark' },
  { id: '5', name: 'North London RC', borough: 'Islington', pace: 'Fast', vibe: 'Competitive', day: 'Tue + Thu', meeting_point: 'Angel', description: '5K pace focused sessions. Track access twice a week.', instagram: '@northlondonrc' },
  { id: '6', name: 'Brixton Run Crew', borough: 'Lambeth', pace: 'Mixed', vibe: 'Inclusive', day: 'Wed + Sun', meeting_point: 'Brixton', description: "South London's most inclusive crew. All paces, all backgrounds.", instagram: '@brixtonruncrew' },
]

const FILTERS = ['All', 'Hackney', 'Lambeth', 'Islington', 'Southwark', 'Social', 'Tempo', 'Night runs']

const sm: React.CSSProperties = { fontFamily: 'var(--font-space)', fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase' as const }

export default function ClubDirectory({ city }: { city: string }) {
  const [clubs, setClubs] = useState<Club[]>([])
  const [active, setActive] = useState('All')

  useEffect(() => {
    supabase.from('clubs').select('*').eq('city', city).then(({ data }) => {
      setClubs(data && data.length > 0 ? (data as Club[]) : PLACEHOLDER)
    })
  }, [city])

  const filtered = active === 'All' ? clubs : clubs.filter(c =>
    c.borough === active || c.pace === active || c.vibe === active
  )

  return (
    <section id="clubs" style={{ padding: '32px 0 32px 24px', borderBottom: '1px solid #DDD8CE', background: '#F2EDE4' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingRight: 24, marginBottom: 4 }}>
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, color: '#0C0C0C', lineHeight: 1 }}>Run clubs</div>
        <div style={{ ...sm, color: '#AAA' }}>{filtered.length} clubs · updated weekly</div>
      </div>

      <div style={{ ...sm, color: '#AAA', paddingRight: 24, marginBottom: 12 }}>London — drag to explore →</div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6, paddingRight: 24, marginBottom: 18, flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              ...sm,
              padding: '5px 10px',
              border: `1px solid ${active === f ? '#0C0C0C' : '#C8C3BA'}`,
              color: active === f ? '#0C0C0C' : '#999',
              borderRadius: 2,
              cursor: 'pointer',
              background: 'transparent',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Horizontal scroll */}
      <div className="hscroll" style={{ paddingRight: 24 }}>
        {/* Featured card */}
        {filtered[0] && (
          <div
            style={{
              flexShrink: 0, width: 190, background: '#0C0C0C', borderRadius: 2,
              padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: 210, position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: 14, right: 14, width: 6, height: 6, borderRadius: '50%', background: '#FF4500' }} />
            <div style={{ ...sm, fontSize: 9, color: '#C8F135', letterSpacing: '0.1em', marginBottom: 'auto' }}>Featured club</div>
            <div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 30, color: '#F0EFE9', lineHeight: 1, marginBottom: 4 }}>{filtered[0].name}</div>
              <div style={{ ...sm, color: '#555', marginBottom: 12 }}>{filtered[0].day} · {filtered[0].meeting_point}</div>
              <div style={{ ...sm, padding: '4px 8px', border: '1px solid #FF4500', color: '#FF4500', borderRadius: 2, display: 'inline-block' }}>
                {filtered[0].pace} · {filtered[0].vibe}
              </div>
            </div>
          </div>
        )}

        {/* Club cards */}
        {filtered.slice(1).map((club) => (
          <div
            key={club.id}
            style={{
              flexShrink: 0, width: 160, background: '#fff', border: '1px solid #E0DAD0',
              borderRadius: 2, padding: 14, minHeight: 210, display: 'flex',
              flexDirection: 'column', justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ ...sm, fontSize: 8, padding: '3px 7px', border: '1px solid #E0DAD0', color: '#999', borderRadius: 2, display: 'inline-block', marginBottom: 8 }}>
                {club.pace}
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#0C0C0C', marginBottom: 4 }}>{club.name}</div>
              <div style={{ ...sm, fontSize: 8, color: '#AAA', lineHeight: 1.7 }}>{club.day}<br />{club.meeting_point}</div>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <span style={{ ...sm, fontSize: 8, padding: '3px 6px', border: '1px solid #FF4500', color: '#FF4500', borderRadius: 2 }}>{club.borough}</span>
              <span style={{ ...sm, fontSize: 8, padding: '3px 6px', border: '1px solid #E0DAD0', color: '#AAA', borderRadius: 2 }}>{club.vibe}</span>
            </div>
          </div>
        ))}

        {/* Submit card */}
        <div
          style={{
            flexShrink: 0, width: 140, border: '1px dashed #C8C3BA', borderRadius: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 8, minHeight: 210, padding: 14,
          }}
        >
          <div style={{ ...sm, fontSize: 9, color: '#BBB', textAlign: 'center', lineHeight: 1.8 }}>Your club<br />missing?</div>
          <button style={{ ...sm, fontSize: 9, color: '#FF4500', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}>
            Submit →
          </button>
        </div>
      </div>
    </section>
  )
}
