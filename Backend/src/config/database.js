/**
 * Configuración y pool de conexión a SQL Server.
 */
'use strict';

const sql = require('mssql');
const { ENV } = require('./environment');
const { logger } = require('../utils/logger');

const config = {
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  server: ENV.DB_SERVER,
  database: ENV.DB_DATABASE,
  options: {
    trustServerCertificate: true,
    requestTimeout: 60000
  }
};

const poolPromise = new sql.ConnectionPool(config).connect();

poolPromise
  .then(pool => {
    logger.info('Conectado a SQL Server');
    return pool;
  })
  .catch(err => {
    logger.error('Error crítico al conectar a la base de datos', err);
    process.exit(1);
  });

/**
 * Obtiene el pool de conexiones.
 * @returns {Promise<sql.ConnectionPool>}
 */
const getPool = () => poolPromise;

module.exports = { sql, getPool };
