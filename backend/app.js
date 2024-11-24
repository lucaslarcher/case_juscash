const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./models/database');
const processosRoutes = require('./routes/processos');
const usuariosRoutes = require('./routes/usuarios');
const authMiddleware = require('./middleware/authMiddleware'); // Middleware de autenticação JWT

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// Rotas públicas
app.use('/processos', processosRoutes);
app.use('/usuarios', usuariosRoutes);

// Rota protegida com middleware JWT
app.use('/usuarios', authMiddleware, usuariosRoutes);  // Proteger todas as rotas dentro de /usuarios

sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado.');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch(err => console.error('Erro ao sincronizar banco de dados:', err));
