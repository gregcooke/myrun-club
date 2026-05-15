'use client'

import { useState } from 'react'

const BUDGET_RANGES = ['Under £5k', '£5k–£15k', '£15k–£50k', '£50k+']
const INTEREST_CATEGORIES = [
  'Title sponsor',
  'Kit partner',
  'Footwear',
  'Nutrition',
  'Tech / Wearables',
  'Lifestyle / Fashion',
  'Hospitality',
  'Other',
]

type Form = {
  brand: string
  contact: string
  email: string
  budget: string
  interest: string
  message: string
}

export default function SponsorForm() {
  const [form, setForm] = useState<Form>({
    brand: '',
    contact: '',
    email: '',
    budget: '',
    interest: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (field: keyof Form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

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
    <section id="sponsor" className="py-16 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#E24B4A' }}>
            Partner with us
          </p>
          <h2 className="text-3xl font-bold text-zinc-900 mb-3">Sponsor Run(Your)Way</h2>
          <p className="text-zinc-500 mb-10 leading-relaxed">
            Reach a highly engaged running and fashion community across three cities. Get in front of
            people who actually move.
          </p>

          {status === 'success' ? (
            <div className="p-8 rounded-2xl border border-zinc-200 bg-white text-center">
              <p className="font-semibold text-zinc-900 mb-1">Application received.</p>
              <p className="text-zinc-500 text-sm">We&apos;ll reach out within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Brand name">
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => set('brand', e.target.value)}
                    required
                    placeholder="Your brand"
                    className="input"
                  />
                </Field>
                <Field label="Contact name">
                  <input
                    type="text"
                    value={form.contact}
                    onChange={(e) => set('contact', e.target.value)}
                    required
                    placeholder="Full name"
                    className="input"
                  />
                </Field>
              </div>

              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  required
                  placeholder="you@brand.com"
                  className="input"
                />
              </Field>

              <Field label="Budget range">
                <div className="flex flex-wrap gap-2 pt-1">
                  {BUDGET_RANGES.map((b) => (
                    <Pill
                      key={b}
                      label={b}
                      active={form.budget === b}
                      onClick={() => set('budget', b)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Interest category">
                <div className="flex flex-wrap gap-2 pt-1">
                  {INTEREST_CATEGORIES.map((cat) => (
                    <Pill
                      key={cat}
                      label={cat}
                      active={form.interest === cat}
                      onClick={() => set('interest', cat)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Anything else">
                <textarea
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  rows={3}
                  placeholder="Tell us about your brand and what you're looking for..."
                  className="input resize-none"
                />
              </Field>

              <div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: '#E24B4A' }}
                >
                  {status === 'loading' ? 'Sending...' : 'Submit application'}
                </button>
                {status === 'error' && (
                  <p className="text-red-500 text-xs mt-2">Something went wrong. Please try again.</p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #e4e4e7;
          font-size: 14px;
          background: white;
          outline: none;
          transition: border-color 0.15s;
        }
        .input:focus { border-color: #a1a1aa; }
      `}</style>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
      style={
        active
          ? { backgroundColor: '#E24B4A', borderColor: '#E24B4A', color: 'white' }
          : { borderColor: '#e4e4e7', color: '#52525b' }
      }
    >
      {label}
    </button>
  )
}
