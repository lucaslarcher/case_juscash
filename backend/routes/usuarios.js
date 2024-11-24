const express = require('express');
const router = express.Router();
const { createUsuario, getAllUsuarios } = require('../controllers/usuariosController');
const authMiddleware = require('../middleware/authMiddleware'); // Importando o middleware de autenticação JWT

// Rota para registrar um novo usuário (sem autenticação necessária)
router.post('/register', createUsuario);

// Rota para buscar todos os usuários (protegida com JWT)
router.get('/', authMiddleware, getAllUsuarios);

module.exports = router;
