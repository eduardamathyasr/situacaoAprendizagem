import { DataTypes } from "sequelize";
import sequelize from "../database.js"

const Funcionario = sequelize.define('Funcionario', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    setor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    createdAt: false, updatedAt: false, tableName: 'funcionarios'
})

export { Funcionario }