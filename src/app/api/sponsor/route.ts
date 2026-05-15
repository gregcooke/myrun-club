import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { brand, contact, email, budget, interest, message } = await req.json()

  if (!brand || !email) {
    return Response.json({ error: 'Brand and email required' }, { status: 400 })
  }

  const { error: dbError } = await supabase
    .from('sponsors')
    .insert({ brand, contact, email, budget, interest, message })

  if (dbError) console.error('Supabase sponsor error:', dbError)

  try {
    await fetch(process.env.SLACK_SPONSOR_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `New sponsor application 💼\n*Brand:* ${brand}\n*Contact:* ${contact}\n*Email:* ${email}\n*Budget:* ${budget || '—'}\n*Interest:* ${interest || '—'}\n*Message:* ${message || '—'}`,
      }),
    })
  } catch (err) {
    console.error('Slack sponsor webhook error:', err)
  }

  return Response.json({ ok: true })
}
