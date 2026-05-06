/**
 * Configuración principal de Express.
 * Inicializa middlewares globales y monta las rutas.
 */
'use strict';

const express = require('express');
const cors = require('cors');

const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');
const tractorRoutes = require('./routes/tractor.routes');
const shipmentRoutes = require('./routes/shipment.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/tractores', tractorRoutes);
app.use('/envios', shipmentRoutes);

// Ruta raíz de salud
app.get('/', (req, res) => {
  res.json({ status: 'OK', service: 'TruckInfo API' });
});

// Manejador de errores global (debe ir al final)
app.use(errorHandler);

module.exports = app;
