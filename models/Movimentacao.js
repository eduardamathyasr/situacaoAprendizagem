import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import { Funcionario } from "./Funcionario.js";
import { EPI } from "./EPI.js";

const Movimentacao = sequelize.define('Movimentação', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.DATE,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false, tableName: 'Movimentação'
})

Movimentacao.belongsTo(Funcionario, { foreignKey: 'funcionarioId' });
Movimentacao.belongsTo(EPI, { foreignKey: 'epiId' });
Funcionario.hasMany(Movimentacao, { foreignKey: 'funcionarioId' });
EPI.hasMany(Movimentacao, { foreignKey: 'epiId' });



export { Movimentacao }