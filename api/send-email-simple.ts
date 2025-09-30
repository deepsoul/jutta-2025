import {VercelRequest, VercelResponse} from '@vercel/node';

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

    // Check if environment variables are set
    const missingVars = [];
    if (!process.env.SMTP_HOST) missingVars.push('SMTP_HOST');
    if (!process.env.SMTP_USER) missingVars.push('SMTP_USER');
    if (!process.env.SMTP_PASS) missingVars.push('SMTP_PASS');

    if (missingVars.length > 0) {
      return res.status(500).json({
        error: 'E-Mail-Konfiguration unvollständig',
        message: 'Folgende Umgebungsvariablen fehlen: ' + missingVars.join(', '),
        instructions: 'Bitte setzen Sie die All-Inkl E-Mail-Konfiguration in Vercel',
        required_vars: [
          'SMTP_HOST=mail.juttahorn.de',
          'SMTP_PORT=587',
          'SMTP_SECURE=false',
          'SMTP_USER=info@juttahorn.de',
          'SMTP_PASS=ihr-email-passwort',
          'SMTP_FROM=info@juttahorn.de',
          'CONTACT_EMAIL=info@juttahorn.de'
        ]
      });
    }

    // If we get here, all env vars are set, but we're not actually sending email
    // This is just for testing the configuration
    return res.status(200).json({
      success: true,
      message: 'E-Mail-Konfiguration ist korrekt',
      received_data: {
        name,
        email,
        subject,
        message: message.substring(0, 50) + '...'
      },
      smtp_config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || '587',
        user: process.env.SMTP_USER,
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || 'info@juttahorn.de'
      }
    });

  } catch (error) {
    console.error('Error in send-email-simple:', error);
    return res.status(500).json({
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
