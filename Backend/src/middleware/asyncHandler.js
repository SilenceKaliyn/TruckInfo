/**
 * Wrapper para capturar errores en funciones async de Express.
 * Evita repetir try/catch en cada controlador.
 */
'use strict';

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { asyncHandler };
