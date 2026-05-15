import Link from 'next/link'

const CITIES = [
  {
    slug: 'london',
    name: 'London',
    tagline: 'Where run culture was born',
    clubs: '40+ clubs',
    live: true,
    bg: '#111111',
  },
  {
    slug: 'cape-town',
    name: 'Cape Town',
    tagline: 'Mountain paths, ocean roads',
    clubs: 'Coming soon',
    live: false,
    bg: '#1a1a2e',
  },
  {
    slug: 'amsterdam',
    name: 'Amsterdam',
    tagline: 'Canal routes, collective pace',
    clubs: 'Coming soon',
    live: false,
    bg: '#16213e',
  },
]

export default function Home() {
  return (
    <main className="flex-1 pt-16">
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-5"
          style={{ color: '#E24B4A' }}
        >
          Run(Your)Way
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 mb-4 text-center">
          Pick your city.
        </h1>
        <p className="text-lg text-zinc-400 max-w-sm text-center mb-16">
          Find your crew, discover routes, run on your terms.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
          {CITIES.map((city) =>
            city.live ? (
              <Link key={city.slug} href={`/${city.slug}`} className="group block">
                <CityCard city={city} />
              </Link>
            ) : (
              <div key={city.slug} className="relative">
                <CityCard city={city} />
                <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
                  <span className="text-xs font-semibold text-zinc-500 border border-zinc-300 rounded-full px-3 py-1 bg-white/80">
                    Coming soon
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  )
}

function CityCard({ city }: { city: (typeof CITIES)[0] }) {
  return (
    <div
      className="rounded-2xl p-8 h-72 flex flex-col justify-between transition-transform group-hover:scale-[1.02]"
      style={{ backgroundColor: city.bg }}
    >
      <p className="text-xs font-semibold text-white/40 tracking-widest uppercase">{city.clubs}</p>
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">{city.name}</h2>
        <p className="text-sm text-white/60">{city.tagline}</p>
      </div>
    </div>
  )
}
