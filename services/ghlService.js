const axios = require('axios');

/**
 * Fetch all locations (sub-accounts) under the agency.
 * @param {string} agencyToken - Agency-level access token
 * @returns {Promise<Array>} - Array of location objects
 */
async function getSubAccounts(agencyToken) {
  try {
    const response = await axios.get('https://services.leadconnectorhq.com/locations/', {
      headers: {
        Authorization: `Bearer ${agencyToken}`
      }
    });

    return response.data.locations;
  } catch (error) {
    console.error('❌ Error fetching sub-accounts:', error.response?.data || error.message);
    return [];
  }
}

/**
 * Fetch all contacts for a given location using its token.
 * @param {string} locationToken - Location-level access token
 * @returns {Promise<Array>} - Array of contact objects
 */
async function getContacts(locationToken) {
  try {
    const response = await axios.get('https://services.leadconnectorhq.com/contacts/', {
      headers: {
        Authorization: `Bearer ${locationToken}`
      }
    });

    return response.data.contacts || [];
  } catch (error) {
    console.error('❌ Error fetching contacts:', error.response?.data || error.message);
    return [];
  }
}

module.exports = { getSubAccounts, getContacts };
