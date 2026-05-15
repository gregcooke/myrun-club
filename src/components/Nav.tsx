'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-lg tracking-tight">
            myrun<span style={{ color: '#E24B4A' }}>.club</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <Link href="/london#map" className="hover:text-zinc-900 transition-colors">
              Map
            </Link>
            <Link href="/london#clubs" className="hover:text-zinc-900 transition-colors">
              Clubs
            </Link>
            <Link href="/london#runway" className="hover:text-zinc-900 transition-colors">
              Run(Your)Way
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <Link
              href="/london#runway"
              className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#E24B4A' }}
            >
              Join
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-zinc-500"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/london#map" onClick={() => setOpen(false)} className="text-zinc-600 hover:text-zinc-900">
            Map
          </Link>
          <Link href="/london#clubs" onClick={() => setOpen(false)} className="text-zinc-600 hover:text-zinc-900">
            Clubs
          </Link>
          <Link href="/london#runway" onClick={() => setOpen(false)} className="text-zinc-600 hover:text-zinc-900">
            Run(Your)Way
          </Link>
          <Link
            href="/london#runway"
            onClick={() => setOpen(false)}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white text-center"
            style={{ backgroundColor: '#E24B4A' }}
          >
            Join
          </Link>
        </div>
      )}
    </nav>
  )
}
