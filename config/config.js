require('dotenv').config();

module.exports = {
  // GoHighLevel App credentials
  clientId: process.env.GHL_CLIENT_ID,
  clientSecret: process.env.GHL_CLIENT_SECRET,
  redirectUri: process.env.GHL_REDIRECT_URI,

  // GoHighLevel Agency Token
  agencyToken: process.env.GHL_AGENCY_TOKEN,

  // NoCodeBackend
  noCodeDbEndpoint: process.env.NOCODEBACKEND_API_URL,
  noCodeDbToken: process.env.NOCODEBACKEND_API_KEY
};
