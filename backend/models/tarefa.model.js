import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Tarefa = sequelize.define("Tarefa", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataCriacao: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dataTermino: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Em Andamento', 'Concluido'),
    defaultValue: 'Pendente',
    allowNull: false
  },
}, {
  tableName: "Tarefas"
});

export default Tarefa;
