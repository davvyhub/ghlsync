const axios = require('axios');
const { noCodeDbToken } = require('../config/config');

const apiUrl = 'https://api.nocodebackend.com/create/contact_details';
const instance = '35933_contacts';

/**
 * Format and send a contact to the NoCodeBackend table `contact_details`
 */
async function pushContactToNoCodeBackend(contact) {
  try {
    const payload = {
      name: contact.name || `${contact.firstName || ''} ${contact.lastName || ''}`.trim(),
      phone: contact.phone || '',
      email: contact.email || '',
      tags: (contact.tags && Array.isArray(contact.tags)) ? contact.tags.join(', ') : '',
      source: contact.source || '',
      type: contact.type || '',
      missing_teeth: contact['custom:Missing Teeth'] || contact.missing_teeth || '',
      last_dentist: contact['custom:Last Dentist'] || contact.last_dentist || '',
      location_id: contact.locationId || ''
    };

    const response = await axios.post(`${apiUrl}?instance=${instance}`, payload, {
      headers: {
        Authorization: `Bearer ${noCodeDbToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Contact pushed to NoCodeBackend: ${response.data.message || 'Success'}`);
  } catch (err) {
    console.error('❌ Error pushing contact to NoCodeBackend:', err.response?.data || err.message);
  }
}

module.exports = { pushContactToNoCodeBackend };
