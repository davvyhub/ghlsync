const cron = require('node-cron');
const { syncNewContacts } = require('../services/syncService');
const { log } = require('../utils/logger');

/**
 * Starts the scheduled cron job for syncing contacts
 */
function startSyncJob() {
  // Runs every 10 minutes → change as needed for testing (e.g., '*/30 * * * * *' for 30s)
  cron.schedule('*/10 * * * *', async () => {
    log('Running scheduled contact sync...');
    try {
      await syncNewContacts();
    } catch (error) {
      log(`Sync failed: ${error.message}`, 'ERROR');
    }
  });

  log('✅ Contact sync cron job initialized.');
}

module.exports = { startSyncJob };
