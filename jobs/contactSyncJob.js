const cron = require('node-cron');
const { syncNewContacts } = require('../services/syncService');
const { log } = require('../utils/logger');

/**
 * Starts the scheduled sync job
 */
function startSyncJob() {
  // Every 10 minutes → change to '*/30 * * * * *' for every 30 seconds if testing
  cron.schedule('*/10 * * * *', async () => {
    log('⏰ Cron job triggered: syncing contacts...');
    try {
      await syncNewContacts();
    } catch (error) {
      log(`Sync failed: ${error.message}`, 'ERROR');
    }
  });

  log('✅ Contact sync cron job initialized.');
}

module.exports = { startSyncJob };
