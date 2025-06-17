const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.routes');
const colaboradorRoutes = require('./routes/colaborador.routes');
const authRoutes = require('./routes/auth.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api', routes);
app.use('/api/colaborador', colaboradorRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
