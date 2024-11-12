import { DataTypes } from "sequelize";
import sequelize from "../database.js"

const EPI = sequelize.define('EPI', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    qualidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    createdAt: false, updatedAt: false, tableName: 'EPI'
})

export { EPI }