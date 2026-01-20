import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { nome, cognome, email, telefono, messaggio } = data

    // Invia email usando un servizio esterno o API
    // Per ora usiamo un approccio semplice che funziona con Vercel
    const emailContent = `
Nuova richiesta da Coaching Hub Landing Page

Nome: ${nome} ${cognome}
Email: ${email}
Telefono: ${telefono || 'Non specificato'}

Messaggio:
${messaggio}
    `

    // Opzione 1: Usa Resend (consigliato - gratuito fino a 3000 email/mese)
    // Devi creare account su resend.com e ottenere API key
    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Coaching Hub <onboarding@resend.dev>',
          to: 'coachinghubinfo@gmail.com',
          subject: `Nuova richiesta da ${nome} ${cognome}`,
          text: emailContent,
          reply_to: email
        })
      })

      if (!res.ok) {
        throw new Error('Failed to send email')
      }
    } else {
      // Fallback: log per debug (rimuovere in produzione)
      console.log('Email would be sent:', emailContent)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
