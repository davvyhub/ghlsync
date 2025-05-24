const axios = require('axios');
const { noCodeDbEndpoint, noCodeDbToken } = require('../config/config');

/**
 * Push a single contact to the NoCodeBackend instance
 * Assumes instance name is passed via query param (?instance=35933_contacts)
 */
async function pushContactToNoCodeBackend(contact) {
  try {
    const response = await axios.post(
      `${noCodeDbEndpoint}?instance=35933_contacts`,
      contact,
      {
        headers: {
          Authorization: `Bearer ${noCodeDbToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`✅ Pushed contact to NoCodeBackend: ${response.data.message || 'success'}`);
  } catch (error) {
    console.error('❌ Failed to push to NoCodeBackend:', error.response?.data || error.message);
  }
}

module.exports = { pushContactToNoCodeBackend };
