function log(message, type = 'INFO') {
    const timestamp = new Date().toISOString();
    const prefix = {
      INFO: 'ℹ️',
      SUCCESS: '✅',
      ERROR: '❌',
      WARN: '⚠️',
      DEBUG: '🔍'
    }[type.toUpperCase()] || '';
  
    console.log(`${prefix} [${timestamp}] ${message}`);
  }
  
  module.exports = { log };
  