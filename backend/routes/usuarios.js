const express = require('express');
const router = express.Router();
const { createUsuario, loginUsuario, getAllUsuarios } = require('../controllers/usuariosController');
const authMiddleware = require('../middleware/authMiddleware'); // Importando o middleware de autenticação JWT

// Rota para registrar um novo usuário (sem autenticação necessária)
router.post('/register', createUsuario);

// Rota para login (gera o token JWT)
router.post('/login', loginUsuario);

// Rota para buscar todos os usuários (protegida com JWT)
router.get('/', authMiddleware, getAllUsuarios);

module.exports = router;
