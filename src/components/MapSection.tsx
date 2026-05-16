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
  fontSize: 9,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
  background: 'transparent',
  border: '1px solid #222',
  padding: '5px 10px',
  borderRadius: 2,
  transition: 'border-color 0.15s, color 0.15s',
}

const STRAVA_SOURCE = 'strava-heatmap'
const STRAVA_LAYER = 'strava-heatmap-layer'

export default function MapSection({ city }: { city: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [clubs, setClubs] = useState<Club[]>([])
  const [stravaOn, setStravaOn] = useState(false)
  const [mapReady, setMapReady] = useState(false)

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

    map.on('load', () => {
      // Strava heatmap raster source
      map.addSource(STRAVA_SOURCE, {
        type: 'raster',
        tiles: [`/api/tiles/strava/{z}/{x}/{y}`],
        tileSize: 256,
        attribution: '© Strava',
      })
      map.addLayer({
        id: STRAVA_LAYER,
        type: 'raster',
        source: STRAVA_SOURCE,
        paint: { 'raster-opacity': 0.75 },
        layout: { visibility: 'none' },
      })
      setMapReady(true)
    })

    mapRef.current = map
    return () => { map.remove(); mapRef.current = null }
  }, [city])

  // Toggle Strava layer visibility
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return
    map.setLayoutProperty(STRAVA_LAYER, 'visibility', stravaOn ? 'visible' : 'none')
  }, [stravaOn, mapReady])

  // Add club markers
  useEffect(() => {
    const map = mapRef.current
    if (!map || clubs.length === 0) return

    const addMarkers = () => {
      clubs.forEach((club) => {
        if (!club.lat || !club.lng) return
        const el = document.createElement('div')
        el.style.cssText =
          'width:8px;height:8px;background:#FF4500;border-radius:50%;border:1px solid rgba(255,255,255,0.3);box-shadow:0 0 8px rgba(255,69,0,0.6);cursor:pointer;'
        new mapboxgl.Marker(el)
          .setLngLat([club.lng, club.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 10, closeButton: false }).setHTML(
              `<div style="font-family:sans-serif;padding:2px 0"><p style="font-weight:600;margin:0 0 2px;font-size:12px;color:#0C0C0C">${club.name}</p><p style="font-size:11px;color:#888;margin:0">${club.borough} · ${club.day}</p></div>`
            )
          )
          .addTo(map)
      })
    }

    if (map.loaded()) addMarkers()
    else map.on('load', addMarkers)
  }, [clubs])

  return (
    <section id="map" style={{ padding: '20px 24px', borderBottom: '1px solid #1C1C1C', background: '#0C0C0C' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-space)', fontSize: 10, color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          London run map
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setStravaOn((v) => !v)}
            style={{
              ...sm,
              color: stravaOn ? '#FC4C02' : '#444',
              borderColor: stravaOn ? '#FC4C02' : '#222',
            }}
          >
            Strava
          </button>
          <button style={{ ...sm, color: '#444' }}>Crime</button>
          <button style={{ ...sm, color: '#444' }}>Lit routes</button>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{ border: '1px solid #1C1C1C', borderRadius: 2, height: 420, background: '#0F0F0F' }}
      />

      {stravaOn && (
        <p style={{ fontFamily: 'var(--font-space)', fontSize: 8, color: '#333', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 8 }}>
          Strava global heatmap — aggregate run data · connect your account to contribute
        </p>
      )}
    </section>
  )
}
