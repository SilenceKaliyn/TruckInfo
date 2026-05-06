/**
 * Módulo de configuración de entorno.
 * Centraliza todas las variables de entorno y provee valores por defecto.
 */
'use strict';

require('dotenv').config();

const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000,
  
  // Base de datos
  DB_SERVER: process.env.DB_SERVER,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
};

// Validación mínima
if (!ENV.DB_SERVER || !ENV.DB_USER || !ENV.DB_PASSWORD || !ENV.DB_DATABASE) {
  console.error('[ERROR] Faltan variables de entorno para la base de datos.');
  process.exit(1);
}

module.exports = { ENV };
