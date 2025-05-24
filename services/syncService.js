const fs = require('fs-extra');
const { agencyToken, noCodeDbEndpoint, noCodeDbToken } = require('../config/config');
const { getLocationAccessToken } = require('./oauthService');
const { getSubAccounts, getContacts } = require('./ghlService');
const axios = require('axios');

const cachePath = './database/localCache.json';

/**
 * Push one contact to NoCodeBackend
 */
async function pushToNoCodeBackend(contact) {
  try {
    await axios.post(noCodeDbEndpoint, contact, {
      headers: {
        Authorization: `Bearer ${noCodeDbToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Synced contact: ${contact.firstName || ''} ${contact.lastName || ''}`);
  } catch (err) {
    console.error('❌ Failed to sync contact:', err.response?.data || err.message);
  }
}

/**
 * Check all sub-accounts and sync new contacts
 */
async function syncNewContacts() {
  console.log('🔄 Starting sync job...');

  let cache = {};
  if (await fs.exists(cachePath)) {
    cache = await fs.readJson(cachePath);
  }

  const accounts = await getSubAccounts(agencyToken);

  for (const account of accounts) {
    try {
      const locationToken = await getLocationAccessToken(account.companyId, account.id);
      const contacts = await getContacts(locationToken);

      const lastSyncedIds = cache[account.id] || [];
      const newContacts = contacts.filter(c => !lastSyncedIds.includes(c.id));

      if (newContacts.length) {
        console.log(`📥 Found ${newContacts.length} new contacts for ${account.name}`);
      }

      for (const contact of newContacts) {
        const formatted = {
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          createdAt: contact.createdAt
        };

        await pushToNoCodeBackend(formatted);
      }

      cache[account.id] = contacts.map(c => c.id); // update synced list
    } catch (err) {
      console.error(`❌ Sync error for ${account.name}:`, err.message);
    }
  }

  await fs.writeJson(cachePath, cache, { spaces: 2 });
  console.log('✅ Sync job complete.\n');
}

module.exports = { syncNewContacts };
