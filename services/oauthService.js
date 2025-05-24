const axios = require('axios');
const { agencyToken } = require('../config/config');

/**
 * Get location-specific access token using agency token
 * @param {string} companyId - Agency's company ID
 * @param {string} locationId - The sub-account (location) ID
 * @returns {Promise<string>} - Location access token
 */
async function getLocationAccessToken(companyId, locationId) {
  try {
    const response = await axios.post(
      'https://services.leadconnectorhq.com/oauth/locationToken',
      new URLSearchParams({ companyId, locationId }).toString(),
      {
        headers: {
          Authorization: `Bearer ${agencyToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('❌ Failed to retrieve location token:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getLocationAccessToken };
