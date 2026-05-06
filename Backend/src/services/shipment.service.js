/**
 * Servicio de envíos (viajes).
 * Encapsula la lógica de construcción dinámica de queries de envíos.
 */
'use strict';

const { getPool, sql } = require('../config/database');
const { shipmentQueries } = require('../constants/queries/shipment.queries');

/**
 * Obtiene envíos filtrados por término base, término de búsqueda y tipo de viaje.
 * @param {Object} filters
 * @param {string} [filters.terminoBase]
 * @param {string} [filters.terminoFiltro]
 * @param {string} [filters.tipoViaje]
 * @returns {Promise<Object[]>}
 */
const getEnvios = async ({ terminoBase, terminoFiltro, tipoViaje }) => {
  const pool = await getPool();
  const request = pool.request();
  let sqlQuery = shipmentQueries.base;
  const conditions = [];

  if (terminoBase) {
    conditions.push(shipmentQueries.whereTerminoBase);
    request.input('terminoBase', sql.VarChar, terminoBase);
  }

  if (terminoFiltro) {
    conditions.push(shipmentQueries.whereTermino);
    request.input('termino', sql.VarChar, terminoFiltro);
  }

  if (tipoViaje && tipoViaje !== 'todos') {
    conditions.push(shipmentQueries.whereTipoViaje);
    request.input('tipoViaje', sql.VarChar, tipoViaje);
  }

  if (conditions.length > 0) {
    sqlQuery += ' AND ' + conditions.join(' AND ');
  }

  sqlQuery += ` ${shipmentQueries.orderBy}`;

  const result = await request.query(sqlQuery);
  return result.recordset || [];
};

module.exports = { getEnvios };
