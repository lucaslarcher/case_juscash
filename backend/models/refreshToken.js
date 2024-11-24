const { DataTypes } = require('sequelize');
const db = require('../config/database'); // Configuração do Sequelize
const User = require('./usuario'); // Modelo de Usuário

const RefreshToken = db.define('RefreshToken', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    token: { type: DataTypes.TEXT,  allowNull: false},
    userId: { type: DataTypes.INTEGER,  allowNull: false,
        references: {
            model: User, // Relaciona com a tabela de usuários
            key: 'id',
        },
        onDelete: 'CASCADE' // Remove os tokens se o usuário for deletado
    },
    expiresAt: { type: DataTypes.DATE, allowNull: false},
    isRevoked: { type: DataTypes.BOOLEAN, defaultValue: false},
}, {
    tableName: 'refresh_tokens', // Nome da tabela no banco de dados
    timestamps: true, // Adiciona createdAt e updatedAt
});

// Associação com o modelo de usuário
RefreshToken.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = RefreshToken;
