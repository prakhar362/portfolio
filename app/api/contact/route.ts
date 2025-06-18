import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, subject, body } = await req.json();

  const config = {
    gmail: {
      user: process.env.GMAIL_USER,
      password: process.env.GMAIL_PASS,
    },
  };
  console.log("config", config);
  // Set up transporter with Gmail
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.gmail.user,
      pass: config.gmail.password,
    },
  });
  console.log(process.env.GMAIL_USER);
  console.log(process.env.GMAIL_PASS);
  const mailOptions = {
    from: config.gmail.user,
    to: config.gmail.user,
    subject: `[Portfolio Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${body}`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as any).message }, { status: 500 });
  }
} 