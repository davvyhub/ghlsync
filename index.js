const { startSyncJob } = require('./jobs/contactSyncJob');
const { log } = require('./utils/logger');

// Load environment variables
require('dotenv').config();

log('🚀 GoHighLevel contact sync service is starting...');
startSyncJob();
