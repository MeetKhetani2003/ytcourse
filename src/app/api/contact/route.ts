import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer Transporter Setup using existing SMTP credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL || process.env.EMAIL_USER || "",
    pass: process.env.SMTP_PASSWORD || process.env.EMAIL_PASS || "",
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields (name, email, message)" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL || process.env.EMAIL_USER || "zenvibe.011@gmail.com";
    const emailUser = process.env.SMTP_EMAIL || process.env.EMAIL_USER;

    if (!emailUser) {
      return NextResponse.json(
        { message: "SMTP/Email credentials are not configured on the server." },
        { status: 500 }
      );
    }

    // Construct a premium-styled email layout for the admin notification
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Inquiry - YouTube Masterclass Support</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0A0B1A; color: #ffffff; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background: #15172C; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .header { background: linear-gradient(135deg, #FF6A00 0%, #FF8C00 100%); padding: 25px; text-align: center; }
            .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: bold; }
            .content { padding: 30px; color: #94a3b8; }
            .field-group { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #FF6A00; font-weight: bold; margin-bottom: 5px; }
            .value { font-size: 15px; color: #ffffff; font-weight: 500; }
            .message-box { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 5px; }
            .footer { padding: 20px 30px; background: rgba(0, 0, 0, 0.2); text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255, 255, 255, 0.05); }
            .btn { display: inline-block; padding: 10px 20px; background: #FF6A00; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Support Inquiry</h1>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Sender Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field-group">
                <div class="label">Sender Email</div>
                <div class="value">${email}</div>
              </div>
              <div class="field-group" style="border-bottom: none;">
                <div class="label">Message Details</div>
                <div class="message-box">${message}</div>
              </div>
              
              <div style="text-align: center;">
                <a href="mailto:${email}" class="btn">Reply Directly to Client</a>
              </div>
            </div>
            <div class="footer">
              <p>This message was dispatched automatically from the Contact Us form on your website.</p>
              <p>&copy; 2026 YouTube Masterclass. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send support email to admin
    await transporter.sendMail({
      from: `"Support Inquiry Form" <${emailUser}>`,
      to: adminEmail,
      replyTo: email, // Click reply in inbox will reply to the visitor's email
      subject: `[Support Inquiry] ${name} (${email})`,
      html: htmlBody,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. We will get back to you soon.",
    });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { message: "Failed to dispatch email", error: error.message },
      { status: 500 }
    );
  }
}
