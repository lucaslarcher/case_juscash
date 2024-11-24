const RefreshToken = require('../models/refreshToken');
const User = require('../models/usuario'); // Modelo do usuário
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Função para gerar o refresh token e salvá-lo no banco
exports.createRefreshToken = async (userId) => {
    const token = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expira em 7 dias

    // Salva o refresh token no banco
    await RefreshToken.create({
        token,
        userId,
        expiresAt,
    });

    return token;
};

// Função para gerar um token de acesso
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

exports.renewAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token é obrigatório.' });
    }

    try {
        const storedToken = await RefreshToken.findOne({
            where: { token: refreshToken, isRevoked: false },
        });

        if (!storedToken) {
            return res.status(403).json({ error: 'Token inválido ou revogado.' });
        }

        // Verifica se o token expirou
        if (new Date() > new Date(storedToken.expiresAt)) {
            return res.status(403).json({ error: 'Refresh token expirado.' });
        }

        // Gera um novo token de acesso
        const user = await User.findByPk(storedToken.userId);
        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ accessToken });
    } catch (error) {
        console.error('Erro ao renovar token:', error);
        res.status(500).json({ error: 'Erro ao renovar token.' });
    }
};

exports.revokeRefreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const token = await RefreshToken.findOne({ where: { token: refreshToken } });

        if (!token) {
            return res.status(404).json({ error: 'Refresh token não encontrado.' });
        }

        // Atualiza o status para revogado
        token.isRevoked = true;
        await token.save();

        res.status(200).json({ message: 'Refresh token revogado com sucesso.' });
    } catch (error) {
        console.error('Erro ao revogar token:', error);
        res.status(500).json({ error: 'Erro ao revogar token.' });
    }
};


exports.login = async (req, res) => {
    console.log("Entrou na função de login"); // Log para ver se está entrando na função

    const { email, password } = req.body;

     // Verifique se email e password estão presentes
     if (!email || !password) {
        console.error('Email ou senha ausente na requisição:', { email, password });
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    console.log('Requisição recebida:', { email, password });

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !user.senha) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Logando as informações para depuração
        console.log('Usuário encontrado:', user);
        console.log('Senha fornecida:', password);
        console.log('Senha armazenada (hash):', user.senha);

        const isValidPassword = await bcrypt.compare(password, user.senha);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = await this.createRefreshToken(user.id);

        res.status(200).json({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro ao realizar login.' });
    }
};

exports.logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token é obrigatório para logout.' });
    }

    try {
        const token = await RefreshToken.findOne({ where: { token: refreshToken } });

        if (!token) {
            return res.status(404).json({ error: 'Refresh token não encontrado.' });
        }

        // Revoga o refresh token
        token.isRevoked = true;
        await token.save();

        res.status(200).json({ message: 'Logout realizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao realizar logout:', error);
        res.status(500).json({ error: 'Erro ao realizar logout.' });
    }
};
