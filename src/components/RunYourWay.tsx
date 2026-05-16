'use client'

import { useEffect, useState } from 'react'

const LAUNCH = new Date('2025-08-01T19:00:00Z')

function getTimeLeft() {
  const diff = LAUNCH.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

const sm: React.CSSProperties = {
  fontFamily: 'var(--font-space)',
  fontSize: 10,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
}

export default function RunYourWay() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null)
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    setTimeLeft(getTimeLeft())
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, whatsapp }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
      setWhatsapp('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="runway" style={{ background: '#080808', borderBottom: '1px solid #1C1C1C' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '32px 24px 20px',
        }}
      >
        <div>
          <div style={{ ...sm, fontSize: 9, color: '#333', marginBottom: 10 }}>
            Coming — 1 Aug 2025 · London
          </div>
          <div
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(48px, 8vw, 60px)',
              lineHeight: 0.88,
              color: '#F0EFE9',
            }}
          >
            Run<em style={{ color: '#FF4500', fontStyle: 'italic' }}>(Your)</em>Way
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#444', fontWeight: 300, lineHeight: 1.7, maxWidth: 200, textAlign: 'right' }}>
          London's first community run club fashion show. Club merch. Brand drops. Street meets track. One night only.
        </div>
      </div>

      {/* Editorial grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.6fr',
          gap: 2,
          padding: '0 24px 20px',
        }}
      >
        {/* Main panel */}
        <div
          style={{
            background: '#141414',
            border: '1px solid #1C1C1C',
            borderRadius: 2,
            minHeight: 260,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 18,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ ...sm, fontSize: 9, color: '#1C1C1C' }}>Editorial image / GIF goes here</div>
          </div>
          <div className="flash-anim" style={{ position: 'absolute', inset: 0, background: '#fff', opacity: 0 }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ ...sm, fontSize: 8, color: '#FF4500', letterSpacing: '0.12em', marginBottom: 4 }}>
              Look 01 — East London
            </div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, color: '#F0EFE9', lineHeight: 1 }}>
              Streets to starting line
            </div>
          </div>
        </div>

        {/* Side panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div
            style={{
              background: '#111',
              border: '1px solid #1C1C1C',
              borderRadius: 2,
              minHeight: 126,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 12,
            }}
          >
            <div
              className="flare-anim"
              style={{
                position: 'absolute',
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: '#fff',
                top: '15%',
                left: '55%',
                opacity: 0,
              }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ ...sm, fontSize: 8, color: '#FF4500', marginBottom: 2 }}>Look 02</div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 16, color: '#F0EFE9', lineHeight: 1 }}>
                High vis, high fashion
              </div>
            </div>
          </div>
          <div
            style={{
              background: '#0F0F0F',
              border: '1px solid #1C1C1C',
              borderRadius: 2,
              minHeight: 126,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ ...sm, fontSize: 8, color: '#2A2A2A', marginBottom: 6 }}>Club collab drop</div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 26, color: '#F0EFE9', lineHeight: 1 }}>
                Merch<br />drops<br />here
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown + form */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 24px 32px' }}>
        {/* Countdown */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 1,
            border: '1px solid #1C1C1C',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {timeLeft
            ? [
                { label: 'days', value: timeLeft.days },
                { label: 'hrs', value: timeLeft.hours },
                { label: 'min', value: timeLeft.minutes },
                { label: 'sec', value: timeLeft.seconds },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{
                    padding: 12,
                    background: '#0C0C0C',
                    textAlign: 'center',
                    borderRight: i < 3 ? '1px solid #1C1C1C' : 'none',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 30, color: '#FF4500', lineHeight: 1 }}>
                    {String(value).padStart(2, '0')}
                  </div>
                  <div style={{ ...sm, fontSize: 8, color: '#333', marginTop: 2 }}>{label}</div>
                </div>
              ))
            : (
              <div style={{ gridColumn: '1/-1', padding: 12, textAlign: 'center', background: '#0C0C0C' }}>
                <div style={{ ...sm, color: '#FF4500' }}>Now live</div>
              </div>
            )}
        </div>

        {/* Sign-up form */}
        {status === 'success' ? (
          <div
            style={{
              border: '1px solid #1C1C1C',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 4,
              padding: 16,
            }}
          >
            <div style={{ color: '#F0EFE9', fontWeight: 500 }}>You&apos;re in.</div>
            <div style={{ ...sm, fontSize: 9, color: '#555' }}>We&apos;ll be in touch.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ border: '1px solid #1C1C1C', borderRadius: 2, overflow: 'hidden' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid #1C1C1C',
                padding: '11px 14px',
                color: '#F0EFE9',
                fontSize: 12,
                fontWeight: 300,
                outline: 'none',
                display: 'block',
              }}
            />
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="WhatsApp (+44...)"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid #1C1C1C',
                padding: '11px 14px',
                color: '#F0EFE9',
                fontSize: 12,
                fontWeight: 300,
                outline: 'none',
                display: 'block',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%',
                background: '#FF4500',
                border: 'none',
                padding: 12,
                color: '#fff',
                fontFamily: 'var(--font-space)',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'block',
                opacity: status === 'loading' ? 0.6 : 1,
              }}
            >
              {status === 'loading' ? 'Joining...' : 'Get early access →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
