export default async function handler(req, res) {
  try {
    return res.status(200).json({
      status: 'OK',
      message: 'API is working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      error: 'Health check failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
