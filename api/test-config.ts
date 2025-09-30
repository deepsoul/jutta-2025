import {VercelRequest, VercelResponse} from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  try {
    // Check environment variables (without exposing sensitive data)
    const config = {
      SMTP_HOST: process.env.SMTP_HOST ? '✅ Set' : '❌ Missing',
      SMTP_PORT: process.env.SMTP_PORT || '❌ Missing (default: 587)',
      SMTP_SECURE: process.env.SMTP_SECURE || '❌ Missing (default: false)',
      SMTP_USER: process.env.SMTP_USER ? '✅ Set' : '❌ Missing',
      SMTP_PASS: process.env.SMTP_PASS ? '✅ Set' : '❌ Missing',
      SMTP_FROM: process.env.SMTP_FROM || '❌ Missing (will use SMTP_USER)',
      CONTACT_EMAIL:
        process.env.CONTACT_EMAIL || '❌ Missing (default: info@juttahorn.de)',
    };

    return res.status(200).json({
      message: 'Environment variables check',
      config,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error checking config:', error);
    return res.status(500).json({
      error: 'Failed to check configuration',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
