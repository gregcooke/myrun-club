const INFLUENCERS = [
  {
    name: 'Charlie Dark',
    handle: '@charliedark',
    role: 'Founder, Run Dem Crew',
    bio: 'The godfather of London run culture. Poet, DJ, community builder who turned running into a movement.',
  },
  {
    name: 'Bella Stankova',
    handle: '@bella.moves',
    role: 'Ultrarunner & creator',
    bio: 'Documenting the intersection of fashion, endurance and city life. East London-based.',
  },
  {
    name: 'Kiprun Collective',
    handle: '@kiprun.collective',
    role: 'Run club collective',
    bio: 'Bringing together runners from across East Africa living in London. Every Tuesday, Hackney.',
  },
]

export default function Influencers() {
  return (
    <section className="py-16 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#E24B4A' }}>
            Voices
          </p>
          <h2 className="text-3xl font-bold text-zinc-900">People worth following</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {INFLUENCERS.map((person) => (
            <div key={person.handle} className="bg-white rounded-2xl p-6 border border-zinc-100">
              <div
                className="w-10 h-10 rounded-full mb-4 flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: '#E24B4A' }}
              >
                {person.name.charAt(0)}
              </div>
              <p className="font-semibold text-zinc-900 mb-0.5">{person.name}</p>
              <p className="text-xs text-zinc-400 mb-3">
                {person.handle} · {person.role}
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
