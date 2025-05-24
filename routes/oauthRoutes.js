const express = require('express');
const axios = require('axios');
const router = express.Router();
const { clientId, clientSecret, redirectUri } = require('../config/config');
const { log } = require('../utils/logger');

router.get('/oauth/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    log('Missing authorization code in callback.', 'ERROR');
    return res.status(400).send('Missing code.');
  }

  try {
    const response = await axios.post('https://services.leadconnectorhq.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code
    });

    const tokenData = response.data;
    log('🎟️ OAuth token received successfully!', 'SUCCESS');
    console.log(tokenData);

    res.send('Authorization successful! You can close this window.');
  } catch (error) {
    console.error('❌ Error exchanging code for token:', error.response?.data || error.message);
    res.status(500).send('Error during token exchange.');
  }
});

module.exports = router;
