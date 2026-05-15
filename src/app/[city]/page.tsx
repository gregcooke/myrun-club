import { notFound } from 'next/navigation'
import Hero from '@/components/Hero'
import MapSection from '@/components/MapSection'
import ClubDirectory from '@/components/ClubDirectory'
import RunYourWay from '@/components/RunYourWay'
import SponsorForm from '@/components/SponsorForm'
import RedditFeed from '@/components/RedditFeed'
import Influencers from '@/components/Influencers'

const SUPPORTED = ['london']

type Props = {
  params: Promise<{ city: string }>
}

export async function generateStaticParams() {
  return SUPPORTED.map((city) => ({ city }))
}

export default async function CityPage({ params }: Props) {
  const { city } = await params

  if (!SUPPORTED.includes(city)) notFound()

  return (
    <main className="flex-1 pt-16">
      <Hero city={city} />
      <MapSection city={city} />
      <ClubDirectory city={city} />
      <RunYourWay />
      <SponsorForm />
      <RedditFeed />
      <Influencers />
    </main>
  )
}
