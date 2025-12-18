import { NextRequest, NextResponse } from "next/server"
// @ts-ignore
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CONTACT_EMAIL_USER,
    pass: process.env.CONTACT_EMAIL_PASS,
  },
})

export async function POST(request: NextRequest) {
  if (!process.env.CONTACT_EMAIL_USER || !process.env.CONTACT_EMAIL_PASS) {
    return NextResponse.json(
      { error: "Email service is not configured. Please set CONTACT_EMAIL_USER and CONTACT_EMAIL_PASS." },
      { status: 500 }
    )
  }

  const targetEmail = process.env.CONTACT_EMAIL_TO ?? process.env.CONTACT_EMAIL_USER ?? "abderrahmane.erraqabi@gmail.com"

  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please provide name, email, and message." }, { status: 400 })
    }

    await transporter.sendMail({
      from: `"${name}" <${process.env.CONTACT_EMAIL_USER}>`,
      replyTo: email,
      to: targetEmail,
      subject: `Portfolio Contact Form — ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#0f172a;line-height:1.6;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form API error:", error)
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    )
  }
}
