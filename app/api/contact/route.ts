import { NextRequest, NextResponse } from "next/server"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CONTACT_EMAIL_USER,
    pass: process.env.CONTACT_EMAIL_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, website } = await request.json()
    const normalizedName = typeof name === "string" ? name.trim() : ""
    const normalizedEmail = typeof email === "string" ? email.trim() : ""
    const normalizedMessage = typeof message === "string" ? message.trim() : ""

    if (website) {
      return NextResponse.json({ error: "Unable to send your message." }, { status: 400 })
    }
    if (!normalizedName || !normalizedMessage || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: "Please provide name, email, and message." }, { status: 400 })
    }
    if (normalizedName.length > 120 || normalizedEmail.length > 254 || normalizedMessage.length > 5000) {
      return NextResponse.json({ error: "Please keep your message within the allowed length." }, { status: 400 })
    }
    if (!process.env.CONTACT_EMAIL_USER || !process.env.CONTACT_EMAIL_PASS) {
      return NextResponse.json(
        { error: "Email service is not configured. Please set CONTACT_EMAIL_USER and CONTACT_EMAIL_PASS." },
        { status: 500 }
      )
    }

    const targetEmail = process.env.CONTACT_EMAIL_TO ?? process.env.CONTACT_EMAIL_USER
    const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character] ?? character)

    await transporter.sendMail({
      from: `"${normalizedName}" <${process.env.CONTACT_EMAIL_USER}>`,
      replyTo: normalizedEmail,
      to: targetEmail,
      subject: `Portfolio Contact Form — ${normalizedName}`,
      text: `
Name: ${normalizedName}
Email: ${normalizedEmail}

Message:
${normalizedMessage}
      `.trim(),
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#0f172a;line-height:1.6;">
          <p><strong>Name:</strong> ${escapeHtml(normalizedName)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(normalizedEmail)}">${escapeHtml(normalizedEmail)}</a></p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;">${escapeHtml(normalizedMessage)}</p>
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
