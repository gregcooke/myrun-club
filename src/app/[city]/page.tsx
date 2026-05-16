import { notFound } from 'next/navigation'
import Hero from '@/components/Hero'
import PhotoStrip from '@/components/PhotoStrip'
import MapSection from '@/components/MapSection'
import ClubDirectory from '@/components/ClubDirectory'
import CityStats from '@/components/CityStats'
import RunYourWay from '@/components/RunYourWay'
import Reviews from '@/components/Reviews'
import RedditFeed from '@/components/RedditFeed'
import SponsorForm from '@/components/SponsorForm'

const SUPPORTED = ['london']

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return SUPPORTED.map((city) => ({ city }))
}

export default async function CityPage({ params }: Props) {
  const { city } = await params
  if (!SUPPORTED.includes(city)) notFound()

  return (
    <main>
      <Hero city={city} />
      <PhotoStrip />
      <MapSection city={city} />
      <ClubDirectory city={city} />
      <CityStats />
      <RunYourWay />
      <Reviews />
      <RedditFeed />
      <SponsorForm />
    </main>
  )
}
