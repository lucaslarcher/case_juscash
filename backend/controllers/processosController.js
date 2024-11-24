const Processo = require('../models/processo');

// Função para buscar todos os processos
exports.getAllProcessos = async (req, res) => {
    try {
        const processos = await Processo.findAll();
        res.json(processos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar processos.' });
    }
};

// Função para criar um novo processo
exports.createProcesso = async (req, res) => {
    try {
        // Desestruturando os campos obrigatórios do corpo da requisição
        const { 
            processo,  
            data_disponibilizacao, 
            autor, 
            advogado, 
            conteudo_publicacao, 
            valor_principal_bruto, 
            juros_moratorios, 
            honorarios_adv
        } = req.body;

        // Validação dos campos obrigatórios
        if (!processo || !data_disponibilizacao || !conteudo_publicacao) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando: processo, data_disponibilizacao e conteudo_publicacao.' });
        }

        // Validação de tipos, por exemplo, a data deve ser válida e os valores devem ser numéricos
        if (isNaN(Date.parse(data_disponibilizacao))) {
            return res.status(400).json({ error: 'data_disponibilizacao deve ser uma data válida.' });
        }

        if (valor_principal_bruto && isNaN(valor_principal_bruto)) {
            return res.status(400).json({ error: 'valor_principal_bruto deve ser um número.' });
        }

        if (juros_moratorios && isNaN(juros_moratorios)) {
            return res.status(400).json({ error: 'juros_moratorios deve ser um número.' });
        }

        if (honorarios_adv && isNaN(honorarios_adv)) {
            return res.status(400).json({ error: 'honorarios_adv deve ser um número.' });
        }

        // Criação do processo no banco de dados com valores padrão para 'reu' e 'status'
        const processoCriado = await Processo.create({
            processo,
            data_disponibilizacao,
            autor,
            advogado,
            conteudo_publicacao,
            valor_principal_bruto,
            juros_moratorios,
            honorarios_adv,
            reu: req.body.reu || 'Instituto Nacional do Seguro Social - INSS', // Valor padrão para 'reu'
            status: req.body.status || 'Publicações Novas' // Valor padrão para 'status'
        });

        // Retorno do processo criado com sucesso
        res.status(201).json(processoCriado);
    } catch (error) {
        console.error('Erro ao criar processo:', error); // Log de erro para diagnóstico
        res.status(500).json({ error: 'Erro ao criar processo.' });
    }
};

// Função para atualizar o status de um processo
exports.updateStatusProcesso = async (req, res) => {
    try {
        const { id } = req.params; // ID do processo a ser atualizado
        const { status } = req.body; // Novo status para o processo

        // Validação de status
        const validStatuses = ['Publicações Novas', 'Publicações Lidas', 'Publicações Enviadas para ADV', 'Concluídas'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Status inválido. Os valores permitidos são: Publicações Novas, Publicações Lidas, Publicações Enviadas para ADV, Concluídas.' });
        }

        // Encontrar o processo pelo id
        const processo = await Processo.findOne({ where: { processo: id } });

        // Verificar se o processo foi encontrado
        if (!processo) {
            return res.status(404).json({ error: 'Processo não encontrado.' });
        }

        // Atualizar o status do processo
        processo.status = status;
        await processo.save();

        // Retornar o processo atualizado
        res.status(200).json(processo);
    } catch (error) {
        console.error('Erro ao atualizar status do processo:', error);
        res.status(500).json({ error: 'Erro ao atualizar status do processo.' });
    }
};
