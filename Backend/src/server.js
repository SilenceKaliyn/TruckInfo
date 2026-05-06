/**
 * Punto de entrada del servidor.
 * Arranca la aplicación Express y el pool de base de datos.
 */
'use strict';

const http = require('http');
const app = require('./app');
const { ENV } = require('./config/environment');
const { logger } = require('./utils/logger');

// Importamos database para forzar la inicialización del pool
require('./config/database');

const server = http.createServer(app);

server.listen(ENV.PORT, () => {
  logger.info(`Servidor HTTP corriendo en el puerto ${ENV.PORT}`);
});
