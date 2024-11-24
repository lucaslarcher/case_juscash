const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

// Rota para login e geração de tokens
router.post('/login', refreshTokenController.login);

// Rota para renovar o token de acesso
router.post('/renew-token', refreshTokenController.renewAccessToken);

// Rota para revogar um refresh token
router.post('/revoke-token', refreshTokenController.revokeRefreshToken);

// Rota para logout (revogar todos os tokens do usuário)
router.post('/logout', refreshTokenController.logout);

module.exports = router;