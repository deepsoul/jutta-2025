import {VercelRequest, VercelResponse} from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  try {
    const {name, email, subject, message} = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, subject, message',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({error: 'Invalid email format'});
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'info@juttahorn.de',
      replyTo: email,
      subject: `Kontaktformular: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #404040; border-bottom: 2px solid #737373; padding-bottom: 10px;">
            Neue Nachricht von der Website
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #404040; margin-top: 0;">Kontaktdaten:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            <p><strong>Betreff:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-left: 4px solid #737373;">
            <h3 style="color: #404040; margin-top: 0;">Nachricht:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; font-size: 12px; color: #666;">
            <p>Diese E-Mail wurde über das Kontaktformular auf juttahorn.de gesendet.</p>
            <p>Antworten Sie direkt auf diese E-Mail, um dem Absender zu antworten.</p>
          </div>
        </div>
      `,
      text: `
Neue Nachricht von der Website

Kontaktdaten:
Name: ${name}
E-Mail: ${email}
Betreff: ${subject}

Nachricht:
${message}

---
Diese E-Mail wurde über das Kontaktformular auf juttahorn.de gesendet.
Antworten Sie direkt auf diese E-Mail, um dem Absender zu antworten.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to sender (optional)
    const confirmationOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Bestätigung: Ihre Nachricht wurde gesendet',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #404040;">Vielen Dank für Ihre Nachricht!</h2>
          
          <p>Liebe/r ${name},</p>
          
          <p>vielen Dank für Ihre Nachricht. Ich habe Ihre E-Mail erhalten und werde mich so schnell wie möglich bei Ihnen melden.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Ihre Nachricht:</strong></p>
            <p style="white-space: pre-wrap; font-style: italic;">${message}</p>
          </div>
          
          <p>Mit freundlichen Grüßen,<br>
          Jutta Horn</p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; font-size: 12px; color: #666;">
            <p><strong>Kontakt:</strong><br>
            E-Mail: info@juttahorn.de<br>
            Telefon: +49 1523 3644 324<br>
            Atelier: Rosenweg 29, 71287 Weissach-Flacht</p>
          </div>
        </div>
      `,
    };

    // Send confirmation email
    await transporter.sendMail(confirmationOptions);

    return res.status(200).json({
      success: true,
      message: 'E-Mail erfolgreich gesendet',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error:
        'Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.',
    });
  }
}
