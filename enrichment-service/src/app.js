require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Adicionado para CORS

const app = express();
app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rotas de usuários
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

module.exports = app;
