const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const Token = require('../models/token');

// Função para login de usuário e geração de token JWT
exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ error: 'E-mail ou senha incorretos.' });
        }

        // Verifica se a senha é válida
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(400).json({ error: 'E-mail ou senha incorretos.' });
        }

        // Gera o token de acesso (JWT)
        const accessToken = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Gera o refresh token
        const refreshToken = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' } // O refresh token tem validade maior
        );

        // Armazena os tokens no banco de dados
        const tokenData = await Token.create({
            user_id: usuario.id,
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: new Date(Date.now() + 3600 * 1000),  // 1h de validade
        });

        // Retorna os tokens para o cliente
        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};