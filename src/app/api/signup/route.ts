import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { email, whatsapp } = await req.json()

  if (!email) {
    return Response.json({ error: 'Email required' }, { status: 400 })
  }

  const { error: dbError } = await supabase
    .from('signups')
    .insert({ email, whatsapp: whatsapp || null })

  if (dbError) console.error('Supabase signup error:', dbError)

  try {
    await fetch(process.env.SLACK_SIGNUP_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `New Run(Your)Way signup 🏃\n*Email:* ${email}${whatsapp ? `\n*WhatsApp:* ${whatsapp}` : ''}`,
      }),
    })
  } catch (err) {
    console.error('Slack signup webhook error:', err)
  }

  return Response.json({ ok: true })
}
