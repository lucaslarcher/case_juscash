const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Função para buscar todos os usuários
exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
};

// Função para criar um novo usuário com validação
exports.createUsuario = [
    // Validações usando express-validator
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
    body('nome').notEmpty().withMessage('Nome é obrigatório'),

    // Middleware para validar os dados
    async (req, res) => {
        // Verifica se existem erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Verifica se o email já está cadastrado
            const existingUser = await Usuario.findOne({ where: { email: req.body.email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email já cadastrado.' });
            }

            // Criptografa a senha antes de salvar
            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(req.body.senha, salt);

            // Criação do usuário com senha criptografada
            const usuario = await Usuario.create({ ...req.body, senha: senhaHash });
            res.status(201).json(usuario);
        } catch (error) {
            // Loga o erro no servidor
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    }
];

// Função para login de usuário e geração do token JWT
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

        // Gera o token JWT
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna o token para o cliente
        res.json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};