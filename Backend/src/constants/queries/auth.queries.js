/**
 * Queries relacionadas con autenticación y usuarios.
 */
'use strict';

const authQueries = {
  byEmail: `SELECT * FROM Usuarios WHERE TRIM(Email) = @email`
};

module.exports = { authQueries };
