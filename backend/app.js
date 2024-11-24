const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./models/database');
const processosRoutes = require('./routes/processos');
const usuariosRoutes = require('./routes/usuarios');
const authMiddleware = require('./middleware/authMiddleware'); // Middleware de autenticação JWT
const cors = require('cors'); // Importando o pacote CORS

const app = express();

// Carregar a porta e a origem do CORS a partir do .env
const PORT = process.env.PORT || 4000;  // Fallback para 4000, se não encontrar no .env
const CORS_ORIGIN = process.env.ORIGIN || 'http://localhost:3000';  // Fallback para localhost:3000

// Configurando o CORS para permitir requisições do frontend
app.use(cors({
  origin: CORS_ORIGIN,  // Usando a variável de ambiente
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Defina os métodos HTTP permitidos, se necessário
  allowedHeaders: ['Content-Type', 'Authorization'] // Defina os cabeçalhos permitidos
}));

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