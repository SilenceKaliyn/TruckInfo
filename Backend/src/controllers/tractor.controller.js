/**
 * Controlador de tractores.
 */
'use strict';

const { getTractorReciente, getHistorial } = require('../services/tractor.service');

const getTractor = async (req, res) => {
  const { claveTractor, idCaja, termino: terminoDirecto } = req.query;
  const termino = claveTractor || idCaja || terminoDirecto;
  const data = await getTractorReciente(termino);
  res.json(data);
};

const getFechaHistorial = async (req, res) => {
  const { termino } = req.query;
  const data = await getHistorial(termino);
  res.json(data);
};

module.exports = { getTractor, getFechaHistorial };
