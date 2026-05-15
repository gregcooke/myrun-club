'use client'

import { useEffect, useState } from 'react'
import { MapPin, Calendar, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Club = {
  id: string
  name: string
  borough: string
  pace: string
  vibe: string
  day: string
  meeting_point: string
  description: string
  instagram: string
}

const PLACEHOLDER: Club[] = [
  {
    id: '1',
    name: 'Shoreditch Running Club',
    borough: 'Hackney',
    pace: 'Moderate',
    vibe: 'Social',
    day: 'Wednesday',
    meeting_point: 'Shoreditch High Street Station',
    description: "East London's most social run crew. 5K every Wednesday, drinks after.",
    instagram: '@shoreditchrc',
  },
  {
    id: '2',
    name: 'Peckham Rye Runners',
    borough: 'Southwark',
    pace: 'Easy',
    vibe: 'Beginner-friendly',
    day: 'Saturday',
    meeting_point: 'Peckham Rye Park Gates',
    description: 'Welcoming all paces. South London vibes only.',
    instagram: '@peckhamrye_run',
  },
  {
    id: '3',
    name: 'Run Dem Crew',
    borough: 'Islington',
    pace: 'Mixed',
    vibe: 'Fashion',
    day: 'Tuesday',
    meeting_point: 'Angel Station',
    description: 'The original London run crew. Culture, music, movement.',
    instagram: '@rundemcrew',
  },
  {
    id: '4',
    name: 'Tracksmith London',
    borough: 'Westminster',
    pace: 'Fast',
    vibe: 'Training',
    day: 'Thursday',
    meeting_point: "Regent's Park Athletics Track",
    description: 'Serious training runs for those chasing PBs.',
    instagram: '@tracksmith',
  },
  {
    id: '5',
    name: 'Brixton Road Runners',
    borough: 'Lambeth',
    pace: 'Moderate',
    vibe: 'Social',
    day: 'Sunday',
    meeting_point: 'Windrush Square',
    description: 'South of the river sunrise runs every Sunday.',
    instagram: '@brixtonroadrunners',
  },
  {
    id: '6',
    name: 'Victoria Park Striders',
    borough: 'Hackney',
    pace: 'Fast',
    vibe: 'Training',
    day: 'Monday',
    meeting_point: 'Victoria Park Bandstand',
    description: 'Year-round training focused on the Hackney Half Marathon.',
    instagram: '@vpcstriders',
  },
]

const PACES = ['All', 'Easy', 'Moderate', 'Fast', 'Mixed']
const VIBES = ['All', 'Social', 'Training', 'Fashion', 'Beginner-friendly', 'Competitive']
const DAYS = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function ClubDirectory({ city }: { city: string }) {
  const [clubs, setClubs] = useState<Club[]>([])
  const [boroughs, setBoroughs] = useState<string[]>(['All'])
  const [borough, setBorough] = useState('All')
  const [pace, setPace] = useState('All')
  const [vibe, setVibe] = useState('All')
  const [day, setDay] = useState('All')

  useEffect(() => {
    supabase
      .from('clubs')
      .select('*')
      .eq('city', city)
      .then(({ data }) => {
        const list = data && data.length > 0 ? (data as Club[]) : PLACEHOLDER
        setClubs(list)
        setBoroughs(['All', ...Array.from(new Set(list.map((c) => c.borough)))])
      })
  }, [city])

  const filtered = clubs.filter(
    (c) =>
      (borough === 'All' || c.borough === borough) &&
      (pace === 'All' || c.pace === pace) &&
      (vibe === 'All' || c.vibe === vibe) &&
      (day === 'All' || c.day === day)
  )

  const resetFilters = () => {
    setBorough('All')
    setPace('All')
    setVibe('All')
    setDay('All')
  }

  return (
    <section id="clubs" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ color: '#E24B4A' }}
          >
            Directory
          </p>
          <h2 className="text-3xl font-bold text-zinc-900 mb-1">Every London run club</h2>
          <p className="text-zinc-400 text-sm">{filtered.length} clubs · updated weekly</p>
        </div>

        <div className="flex flex-col gap-4 mb-10">
          <FilterRow label="Borough" options={boroughs} value={borough} onChange={setBorough} />
          <FilterRow label="Pace" options={PACES} value={pace} onChange={setPace} />
          <FilterRow label="Vibe" options={VIBES} value={vibe} onChange={setVibe} />
          <FilterRow label="Day" options={DAYS} value={day} onChange={setDay} />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-400 mb-3">No clubs match your filters.</p>
            <button
              onClick={resetFilters}
              className="text-sm font-medium underline"
              style={{ color: '#E24B4A' }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide w-14 shrink-0">
        {label}
      </span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
          style={
            value === opt
              ? { backgroundColor: '#E24B4A', borderColor: '#E24B4A', color: 'white' }
              : { borderColor: '#e4e4e7', color: '#52525b' }
          }
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function ClubCard({ club }: { club: Club }) {
  return (
    <div className="border border-zinc-100 rounded-2xl p-6 hover:border-zinc-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-zinc-900 text-base leading-snug">{club.name}</h3>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
          style={{ backgroundColor: '#FEE2E2', color: '#E24B4A' }}
        >
          {club.pace}
        </span>
      </div>

      <p className="text-sm text-zinc-500 mb-4 leading-relaxed">{club.description}</p>

      <div className="flex flex-col gap-1.5 text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          <MapPin size={11} />
          <span>
            {club.borough} · {club.meeting_point}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={11} />
          <span>{club.day}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={11} />
          <span>{club.vibe}</span>
        </div>
      </div>

      {club.instagram && (
        <a
          href={`https://instagram.com/${club.instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-xs font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          {club.instagram} →
        </a>
      )}
    </div>
  )
}
