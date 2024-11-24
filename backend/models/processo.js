const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Processo = sequelize.define('Processo', {
    processo: { type: DataTypes.STRING, primaryKey: true,allowNull: false},
    data_disponibilizacao: {type: DataTypes.DATE, allowNull: false },
    autor: { type: DataTypes.TEXT, allowNull: true },
    advogado: { type: DataTypes.TEXT, allowNull: true },
    conteudo_publicacao: { type: DataTypes.TEXT, allowNull: false },
    valor_principal_bruto: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
    juros_moratorios: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
    honorarios_adv: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
    reu: { type: DataTypes.TEXT,  allowNull: false, defaultValue: 'Instituto Nacional do Seguro Social - INSS' },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Publicações Novas'},
});

module.exports = Processo;
