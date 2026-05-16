import { NextRequest } from 'next/server'

type Params = { z: string; x: string; y: string }

export async function GET(_req: NextRequest, { params }: { params: Promise<Params> }) {
  const { z, x, y } = await params

  // Round-robin Strava's tile CDN nodes
  const node = ['a', 'b', 'c'][Math.floor(Math.random() * 3)]
  const url = `https://heatmap-external-${node}.strava.com/tiles/run/hot/${z}/${x}/${y}.png`

  const res = await fetch(url, {
    headers: {
      Referer: 'https://www.strava.com/heatmap',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    },
    next: { revalidate: 86400 },
  })

  if (!res.ok) {
    return new Response(null, { status: 204 })
  }

  const buffer = await res.arrayBuffer()
  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
