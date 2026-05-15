'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { supabase } from '@/lib/supabase'

type Club = {
  id: string
  name: string
  lat: number
  lng: number
  borough: string
  day: string
}

const CITY_CENTERS: Record<string, [number, number]> = {
  london: [-0.118, 51.509],
}

export default function MapSection({ city }: { city: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [clubs, setClubs] = useState<Club[]>([])

  useEffect(() => {
    supabase
      .from('clubs')
      .select('id, name, lat, lng, borough, day')
      .eq('city', city)
      .then(({ data }) => setClubs(data || []))
  }, [city])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: CITY_CENTERS[city] ?? [-0.118, 51.509],
      zoom: 11,
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [city])

  useEffect(() => {
    const map = mapRef.current
    if (!map || clubs.length === 0) return

    clubs.forEach((club) => {
      if (!club.lat || !club.lng) return

      const el = document.createElement('div')
      el.style.cssText = `
        width:12px;height:12px;
        background:#E24B4A;border-radius:50%;
        border:2px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.25);
        cursor:pointer;
      `

      new mapboxgl.Marker(el)
        .setLngLat([club.lng, club.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 12, closeButton: false }).setHTML(`
            <div style="font-family:sans-serif;padding:2px 0">
              <p style="font-weight:600;margin:0 0 2px;font-size:13px">${club.name}</p>
              <p style="font-size:12px;color:#888;margin:0">${club.borough} · ${club.day}</p>
            </div>
          `)
        )
        .addTo(map)
    })
  }, [clubs])

  return (
    <section id="map" className="py-16 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#E24B4A' }}>
            Explore
          </p>
          <h2 className="text-3xl font-bold text-zinc-900">Run clubs near you</h2>
        </div>

        <div
          ref={containerRef}
          className="w-full rounded-2xl overflow-hidden border border-zinc-200 shadow-sm"
          style={{ height: 520 }}
        />

        {clubs.length === 0 && (
          <p className="text-center text-zinc-400 text-sm mt-4">
            No clubs pinned yet — be the first to{' '}
            <a href="#clubs" className="underline" style={{ color: '#E24B4A' }}>
              add yours
            </a>
            .
          </p>
        )}
      </div>
    </section>
  )
}
