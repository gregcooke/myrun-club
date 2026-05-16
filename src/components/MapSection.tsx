'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { supabase } from '@/lib/supabase'

type Club = { id: string; name: string; lat: number; lng: number; borough: string; day: string }

const CITY_CENTERS: Record<string, [number, number]> = {
  london: [-0.118, 51.509],
}

const sm: React.CSSProperties = {
  fontFamily: 'var(--font-space)',
  fontSize: 10,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
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
      style: 'mapbox://styles/mapbox/dark-v11',
      center: CITY_CENTERS[city] ?? [-0.118, 51.509],
      zoom: 11,
    })
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    mapRef.current = map
    return () => { map.remove(); mapRef.current = null }
  }, [city])

  useEffect(() => {
    const map = mapRef.current
    if (!map || clubs.length === 0) return
    clubs.forEach((club) => {
      if (!club.lat || !club.lng) return
      const el = document.createElement('div')
      el.style.cssText = 'width:8px;height:8px;background:#FF4500;border-radius:50%;border:1px solid #FF4500;box-shadow:0 0 6px rgba(255,69,0,0.5);cursor:pointer;'
      new mapboxgl.Marker(el)
        .setLngLat([club.lng, club.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 10, closeButton: false }).setHTML(
            `<div style="font-family:sans-serif;padding:2px 0"><p style="font-weight:600;margin:0 0 2px;font-size:12px;color:#0C0C0C">${club.name}</p><p style="font-size:11px;color:#888;margin:0">${club.borough} · ${club.day}</p></div>`
          )
        )
        .addTo(map)
    })
  }, [clubs])

  return (
    <section id="map" style={{ padding: '20px 24px', borderBottom: '1px solid #1C1C1C', background: '#0C0C0C' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ ...sm, color: '#444' }}>London run map</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['All clubs', 'Morning', 'Night'].map((t) => (
            <button
              key={t}
              style={{
                ...sm,
                fontSize: 9,
                padding: '5px 10px',
                border: '1px solid #222',
                color: '#444',
                borderRadius: 2,
                cursor: 'pointer',
                background: 'transparent',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={containerRef}
        style={{ border: '1px solid #1C1C1C', borderRadius: 2, height: 420, background: '#0F0F0F' }}
      />
    </section>
  )
}
