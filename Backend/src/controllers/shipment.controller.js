/**
 * Controlador de envíos.
 */
'use strict';

const { getEnvios } = require('../services/shipment.service');

const listEnvios = async (req, res) => {
  const { terminoBase, terminoFiltro, tipoViaje } = req.query;
  const data = await getEnvios({ terminoBase, terminoFiltro, tipoViaje });
  res.json(data);
};

module.exports = { listEnvios };
