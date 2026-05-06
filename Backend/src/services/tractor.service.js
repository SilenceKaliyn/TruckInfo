/**
 * Servicio de tractores.
 * Encapsula la lógica de negocio para consulta de tractores e historial.
 */
'use strict';

const { getPool, sql } = require('../config/database');
const { tractorQueries } = require('../constants/queries/tractor.queries');

/**
 * Obtiene el estado actual de un tractor o caja.
 * @param {string} termino - ClaveTractor o IdCaja
 * @returns {Promise<Object[]>}
 * @throws {Error} Si no se proporciona término
 */
const getTractorReciente = async (termino) => {
  if (!termino) {
    const error = new Error('Debes proporcionar un término de búsqueda (claveTractor o idCaja)');
    error.statusCode = 400;
    throw error;
  }

  const pool = await getPool();
  const result = await pool.request()
    .input('termino', sql.VarChar, termino)
    .query(tractorQueries.reciente);

  return result.recordset || [];
};

/**
 * Obtiene el historial de viajes de un tractor/caja (últimos 3 días hábiles).
 * @param {string} termino
 * @returns {Promise<Object[]>}
 * @throws {Error} Si no se proporciona término
 */
const getHistorial = async (termino) => {
  if (!termino) {
    const error = new Error('Se requiere un término de búsqueda');
    error.statusCode = 400;
    throw error;
  }

  const pool = await getPool();
  const result = await pool.request()
    .input('termino', sql.VarChar, termino)
    .query(tractorQueries.historial);

  return result.recordset || [];
};

module.exports = { getTractorReciente, getHistorial };
