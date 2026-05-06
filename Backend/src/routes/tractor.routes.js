/**
 * Rutas de tractores.
 */
'use strict';

const express = require('express');
const { getTractor, getFechaHistorial } = require('../controllers/tractor.controller');
const { asyncHandler } = require('../middleware/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(getTractor));
router.get('/historial', asyncHandler(getFechaHistorial));

module.exports = router;
