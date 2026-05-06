/**
 * Middleware global de manejo de errores.
 * Captura cualquier error lanzado en los controladores y responde de forma uniforme.
 */
'use strict';

const { ENV } = require('../config/environment');
const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error('Error en la ruta:', err.message);

  // No enviar stack trace en producción
  const response = {
    success: false,
    message: err.message || 'Error en el servidor'
  };

  if (ENV.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json(response);
};

module.exports = { errorHandler };
