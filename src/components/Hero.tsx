'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function Hero({ city }: { city: string }) {
  const [postcode, setPostcode] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })
  }

  const cityLabel = city.charAt(0).toUpperCase() + city.slice(1)

  return (
    <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0, #000 1px, transparent 0, transparent 50%), repeating-linear-gradient(90deg, #000 0, #000 1px, transparent 0, transparent 50%)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: '#E24B4A' }}
        >
          {cityLabel}
        </p>

        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-zinc-900 leading-none mb-6">
          Find your people.
          <br />
          <span className="text-zinc-200">Find your route.</span>
        </h1>

        <p className="text-lg text-zinc-500 max-w-lg mb-12 leading-relaxed">
          Every run club. Every borough. Every vibe. All in one place.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              size={16}
            />
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder="Enter your postcode"
              className="w-full pl-10 pr-4 py-3.5 rounded-full border border-zinc-200 text-sm font-medium focus:outline-none focus:border-zinc-400 bg-white"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#E24B4A' }}
          >
            Find clubs
          </button>
        </form>
      </div>
    </section>
  )
}
