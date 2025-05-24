require('dotenv').config();
const { startSyncJob } = require('./jobs/contactSyncJob');
const { log } = require('./utils/logger');

// Enable this block if you're using OAuth with a callback route
const express = require('express');
const app = express();
const oauthRoutes = require('./routes/oauthRoutes');

// Mount the OAuth callback route
app.use('/', oauthRoutes);

// Start Express server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  log(`🚀 Express server running on port ${PORT}`);
});

startSyncJob();
