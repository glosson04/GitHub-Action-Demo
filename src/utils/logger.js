/**
 * Simple logger utility
 */

const levels = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

function formatLog(level, message, data = '') {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message} ${data ? JSON.stringify(data) : ''}`;
}

module.exports = {
  error: (message, data) => console.error(formatLog(levels.ERROR, message, data)),
  warn: (message, data) => console.warn(formatLog(levels.WARN, message, data)),
  info: (message, data) => console.log(formatLog(levels.INFO, message, data)),
  debug: (message, data) => console.log(formatLog(levels.DEBUG, message, data))
};
