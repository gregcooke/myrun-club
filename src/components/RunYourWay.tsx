'use client'

import { useEffect, useState } from 'react'

const LAUNCH_DATE = new Date('2025-08-01T00:00:00Z')

function getTimeLeft() {
  const diff = LAUNCH_DATE.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
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
    <section id="runway" className="py-24" style={{ backgroundColor: '#0A0A14' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: '#E24B4A' }}>
            Run(Your)Way
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            The run event you've
            <br />
            been waiting for.
          </h2>

          <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
            Multi-city. Multi-culture. Your pace, your style. Run(Your)Way is a fashion-forward run
            event series launching across London, Cape Town and Amsterdam.
          </p>

          <div className="mb-12">
            {timeLeft ? (
              <div>
                <p className="text-zinc-500 text-sm mb-5">Launching in</p>
                <div className="flex gap-8">
                  {(
                    [
                      { label: 'Days', value: timeLeft.days },
                      { label: 'Hrs', value: timeLeft.hours },
                      { label: 'Mins', value: timeLeft.minutes },
                      { label: 'Secs', value: timeLeft.seconds },
                    ] as const
                  ).map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-4xl font-bold text-white tabular-nums">
                        {String(value).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-zinc-600 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{ borderColor: 'rgba(226,75,74,0.3)', backgroundColor: 'rgba(226,75,74,0.08)' }}
              >
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#E24B4A' }}
                />
                <span className="text-sm font-semibold" style={{ color: '#E24B4A' }}>
                  Now live
                </span>
              </div>
            )}
          </div>

          {status === 'success' ? (
            <div className="p-6 rounded-2xl border border-zinc-800 text-center">
              <p className="text-white font-semibold mb-1">You&apos;re in.</p>
              <p className="text-zinc-500 text-sm">We&apos;ll be in touch before launch day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="px-4 py-3.5 rounded-full border border-zinc-800 bg-white/5 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-zinc-600"
              />
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="WhatsApp number (optional)"
                className="px-4 py-3.5 rounded-full border border-zinc-800 bg-white/5 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-zinc-600"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#E24B4A' }}
              >
                {status === 'loading' ? 'Joining...' : 'Get early access'}
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-xs text-center">Something went wrong. Try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
