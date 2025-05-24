const fs = require('fs-extra');
const path = require('path');
const { getSubAccounts, getContacts } = require('./ghlService');
const { getLocationAccessToken } = require('./oauthService');
const { pushContactToNoCodeBackend } = require('./nocodeBackendService');
const { agencyToken } = require('../config/config');
const { log } = require('../utils/logger');

const cachePath = path.resolve(__dirname, '../database/localCache.json');

/**
 * Sync new contacts from all sub-accounts to NoCodeBackend
 */
async function syncNewContacts() {
  log('🔁 Starting sync...');
  
  let cache = {};
  if (await fs.exists(cachePath)) {
    cache = await fs.readJson(cachePath);
  }

  const accounts = await getSubAccounts(agencyToken);

  for (const account of accounts) {
    try {
      const locationToken = await getLocationAccessToken(account.companyId, account.id);
      const contacts = await getContacts(locationToken);

      const previousIds = cache[account.id] || [];
      const newContacts = contacts.filter(c => !previousIds.includes(c.id));

      if (newContacts.length) {
        log(`📥 Found ${newContacts.length} new contacts in "${account.name}"`);
      }

      for (const contact of newContacts) {
        const formatted = {
          name: `${contact.firstName || ''} ${contact.lastName || ''}`.trim(),
          phone: contact.phone,
          email: contact.email,
          tags: (contact.tags || []).join(', '),
          source: contact.source || '',
          type: contact.type || '',
          missing_teeth: contact['custom:Missing Teeth'] || '',
          last_dentist: contact['custom:Last Dentist'] || '',
          location_id: account.id
        };

        await pushContactToNoCodeBackend(formatted);
      }

      cache[account.id] = contacts.map(c => c.id);
    } catch (err) {
      log(`❌ Failed to sync contacts for "${account.name}": ${err.message}`, 'ERROR');
    }
  }

  await fs.writeJson(cachePath, cache, { spaces: 2 });
  log('✅ Sync complete.\n');
}

module.exports = { syncNewContacts };
