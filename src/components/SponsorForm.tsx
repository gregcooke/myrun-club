'use client'

import { useState } from 'react'

const TIERS = [
  {
    title: 'Title sponsor',
    desc: 'Category exclusivity across all city events and full brand integration from day one.',
  },
  {
    title: 'Kit partner',
    desc: 'Club kit collabs, co-branded content, and community placement across the platform.',
  },
  {
    title: 'Footwear & nutrition',
    desc: 'On-course presence, club meet-up sampling, and map placement across three cities.',
  },
]

const sm: React.CSSProperties = {
  fontFamily: 'var(--font-space)',
  fontSize: 9,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  background: '#F8F4EE',
  border: 'none',
  borderBottom: '1px solid #DDD8CE',
  padding: '14px 16px',
  color: '#0C0C0C',
  fontFamily: 'var(--font-space)',
  fontSize: 11,
  letterSpacing: '0.04em',
  outline: 'none',
}

export default function SponsorForm() {
  const [form, setForm] = useState({ brand: '', contact: '', email: '', budget: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="sponsor" style={{ background: '#F2EDE4', padding: '32px 24px', borderBottom: '1px solid #DDD8CE' }}>
      <div style={{ ...sm, color: '#AAA', marginBottom: 8 }}>Partner with us</div>
      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 40, color: '#0C0C0C', lineHeight: 1, marginBottom: 12 }}>
        Sponsor<br />Run(Your)Way
      </div>
      <p style={{ fontSize: 13, color: '#888', fontWeight: 300, lineHeight: 1.8, marginBottom: 24, maxWidth: 520 }}>
        Run(Your)Way is London's first community run club fashion event — growing to Cape Town and Amsterdam in 2026. Reach a highly engaged audience of runners, creatives, and culture-led consumers who move every day. Early partners get first-mover category exclusivity and full brand integration from day one.
      </p>

      {/* Tier grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 1,
          border: '1px solid #C8C3BA',
          borderRadius: 2,
          overflow: 'hidden',
          marginBottom: 24,
        }}
      >
        {TIERS.map((t, i) => (
          <div
            key={t.title}
            style={{
              background: '#F8F4EE',
              padding: 16,
              borderRight: i < TIERS.length - 1 ? '1px solid #DDD8CE' : 'none',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 500, color: '#0C0C0C', marginBottom: 4 }}>{t.title}</div>
            <div style={{ fontSize: 11, color: '#AAA', lineHeight: 1.6, fontWeight: 300, marginBottom: 10 }}>{t.desc}</div>
            <button
              style={{ ...sm, color: '#FF4500', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}
              onClick={() => document.getElementById('sponsor-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply →
            </button>
          </div>
        ))}
      </div>

      {/* Form */}
      {status === 'success' ? (
        <div style={{ border: '1px solid #C8C3BA', borderRadius: 2, padding: 24, textAlign: 'center', background: '#F8F4EE' }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#0C0C0C', marginBottom: 4 }}>Application received.</div>
          <div style={{ ...sm, color: '#AAA' }}>We&apos;ll reach out within 48 hours.</div>
        </div>
      ) : (
        <div id="sponsor-form" style={{ border: '1px solid #C8C3BA', borderRadius: 2, overflow: 'hidden' }}>
          <input style={inputStyle} type="text" placeholder="Brand name" value={form.brand} onChange={(e) => set('brand', e.target.value)} required />
          <input style={inputStyle} type="text" placeholder="Contact name" value={form.contact} onChange={(e) => set('contact', e.target.value)} />
          <input style={inputStyle} type="email" placeholder="Email address" value={form.email} onChange={(e) => set('email', e.target.value)} required />
          <input style={inputStyle} type="text" placeholder="Budget range — e.g. £5k–£15k" value={form.budget} onChange={(e) => set('budget', e.target.value)} />
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            style={{
              width: '100%',
              background: '#0C0C0C',
              border: 'none',
              padding: 14,
              color: '#F0EFE9',
              fontFamily: 'var(--font-space)',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'block',
              opacity: status === 'loading' ? 0.6 : 1,
            }}
          >
            {status === 'loading' ? 'Sending...' : 'Submit application →'}
          </button>
          {status === 'error' && (
            <div style={{ ...sm, color: '#FF4500', padding: '8px 16px', background: '#F8F4EE' }}>
              Something went wrong. Please try again.
            </div>
          )}
        </div>
      )}
    </section>
  )
}
