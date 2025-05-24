const axios = require('axios');
const { agencyToken } = require('../config/config');

/**
 * Exchange agency-level access to get location-specific access token
 * @param {string} companyId - GHL agency company ID
 * @param {string} locationId - Sub-account (location) ID
 * @returns {Promise<string>} - Location access token
 */
async function getLocationAccessToken(companyId, locationId) {
  try {
    const response = await axios.post(
      'https://services.leadconnectorhq.com/oauth/locationToken',
      new URLSearchParams({
        companyId: companyId,
        locationId: locationId
      }),
      {
        headers: {
          Authorization: `Bearer ${agencyToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('❌ Failed to get location access token:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getLocationAccessToken };
