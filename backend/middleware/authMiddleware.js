const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido.' });
    }

    try {
        const tokenSemBearer = token.split(' ')[1]; // Remove "Bearer" do token
        const decoded = jwt.verify(tokenSemBearer, process.env.JWT_SECRET);  // Verifica o token

        req.userId = decoded.id; // Armazena o ID do usuário no request

        next(); // Permite que a requisição continue
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
};

module.exports = authMiddleware;