const express = require('express');
const router = express.Router();
const { createProcesso, getAllProcessos, updateStatusProcesso } = require('../controllers/processosController');

// Rota para criar um novo processo
router.post('/', createProcesso);

// Rota para buscar todos os processos
router.get('/', getAllProcessos);

// Rota para atualizar o status de um processo
router.put('/:id/status', updateStatusProcesso);

module.exports = router;
