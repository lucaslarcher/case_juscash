const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
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

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
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
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    }
];