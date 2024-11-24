// models/token.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Caminho para o seu arquivo de configuração do Sequelize

const Token = sequelize.define('Token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'Usuarios', // Nome da tabela do usuário
            key: 'id',
        },
        onDelete: 'CASCADE', // Quando o usuário for deletado, apaga os tokens relacionados
    },
    access_token: { type: DataTypes.TEXT, allowNull: false },
    refresh_token: { type: DataTypes.TEXT, },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    expires_at: { type: DataTypes.DATE, allowNull: true },
    is_revoked: { type: DataTypes.BOOLEAN, defaultValue: false },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Token;