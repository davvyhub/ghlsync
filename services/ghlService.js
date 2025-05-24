const axios = require('axios');

/**
 * Fetch all sub-accounts under the agency.
 * @param {string} agencyToken - Agency-level access token
 * @returns {Promise<Array>} - List of sub-account locations
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
 * Fetch contacts from a specific sub-account.
 * @param {string} locationToken - Location-specific access token
 * @returns {Promise<Array>} - List of contacts
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
