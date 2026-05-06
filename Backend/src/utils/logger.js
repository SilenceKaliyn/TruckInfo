/**
 * Logger simple para la aplicación.
 * En producción se puede reemplazar por Winston, Pino, etc.
 */
'use strict';

const { ENV } = require('../config/environment');

const isDev = ENV.NODE_ENV === 'development';

const logger = {
  info: (msg, meta = {}) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, isDev ? meta : '');
  },
  error: (msg, error = null) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, error || '');
  },
  warn: (msg, meta = {}) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`, isDev ? meta : '');
  },
  debug: (msg, meta = {}) => {
    if (isDev) {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${msg}`, meta);
    }
  }
};

module.exports = { logger };
