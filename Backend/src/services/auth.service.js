/**
 * Servicio de autenticación.
 * Encapsula la lógica de negocio para login y gestión de usuarios.
 */
'use strict';

const { getPool, sql } = require('../config/database');
const { authQueries } = require('../constants/queries/auth.queries');
const { logger } = require('../utils/logger');

/**
 * Busca un usuario por email y valida credenciales.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} Usuario sin contraseña
 * @throws {Error} Si credenciales son inválidas
 */
const loginUser = async (email, password) => {
  if (!email || !password) {
    const error = new Error('Email y contraseña requeridos');
    error.statusCode = 400;
    throw error;
  }

  const pool = await getPool();
  const result = await pool.request()
    .input('email', sql.VarChar, email.trim())
    .query(authQueries.byEmail);

  if (result.recordset.length === 0) {
    const error = new Error('Email o contraseña incorrectos');
    error.statusCode = 401;
    throw error;
  }

  const user = result.recordset[0];

  // TODO: migrar a bcrypt.compare en producción
  if (password !== user.Contraseña) {
    const error = new Error('Email o contraseña incorrectos');
    error.statusCode = 401;
    throw error;
  }

  delete user.Contraseña;
  logger.info(`Login exitoso: ${user.Nombre}`);
  return user;
};

module.exports = { loginUser };
