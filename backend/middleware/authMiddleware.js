const jwt = require('jsonwebtoken');
const Token = require('../models/token');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido.' });
    }

    try {
        const tokenSemBearer = token.split(' ')[1]; // Remove "Bearer" do token
        const decoded = jwt.verify(tokenSemBearer, process.env.JWT_SECRET);  // Verifica o token

        // Verifica se o token está revogado ou expirado
        const storedToken = await Token.findOne({ where: { access_token: tokenSemBearer } });
        if (!storedToken || storedToken.is_revoked || storedToken.expires_at < new Date()) {
            return res.status(401).json({ error: 'Token inválido ou expirado.' });
        }

        req.userId = decoded.id; // Armazena o ID do usuário no request
        next(); // Permite que a requisição continue
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
};

module.exports = authMiddleware;