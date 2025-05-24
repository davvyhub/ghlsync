function log(message, type = 'INFO') {
    const timestamp = new Date().toISOString();
  
    const icon = {
      INFO: 'ℹ️',
      SUCCESS: '✅',
      ERROR: '❌',
      WARN: '⚠️',
      DEBUG: '🐛'
    }[type.toUpperCase()] || 'ℹ️';
  
    console.log(`${icon} [${timestamp}] ${message}`);
  }
  
  module.exports = { log };
  