const express = require('express');
const app = express();

app.use(express.json());

app.use('emprendimientos', require('./routes/emprendimientosRoutes'));
module.exports = app;