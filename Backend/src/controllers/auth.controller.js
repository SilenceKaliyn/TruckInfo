/**
 * Controlador de autenticación.
 * Recibe peticiones HTTP, delega a servicios y responde al cliente.
 */
'use strict';

const jwt = require('jsonwebtoken');
const { loginUser } = require('../services/auth.service');
const { logger } = require('../utils/logger');

const login = async (req, res) => {
  logger.info('-> Petición recibida en /login');
  const { email, password } = req.body;
  const user = await loginUser(email, password);
  const token = jwt.sign(
    { id: user.id, email: user.email, nombre: user.nombre },
    process.env.JWT_SECRET || 'default-secret',
    { expiresIn: '7d' }
  );
  res.json({ success: true, token, user });
};

module.exports = { login };
