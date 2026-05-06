/**
 * Rutas de autenticación.
 */
'use strict';

const express = require('express');
const { login } = require('../controllers/auth.controller');
const { asyncHandler } = require('../middleware/asyncHandler');

const router = express.Router();

router.post('/login', asyncHandler(login));

module.exports = router;
