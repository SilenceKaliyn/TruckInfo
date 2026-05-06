/**
 * Rutas de envíos (viajes).
 */
'use strict';

const express = require('express');
const { listEnvios } = require('../controllers/shipment.controller');
const { asyncHandler } = require('../middleware/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(listEnvios));

module.exports = router;
