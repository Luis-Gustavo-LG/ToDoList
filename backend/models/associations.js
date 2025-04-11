import Usuario from "./usuario.model.js";
import Tarefa from "./tarefa.model.js";

export const setupAssociations = () => {
    Usuario.hasMany(Tarefa, {
        foreignKey: 'usuarioId',
        as: 'tarefas'
    });

    Tarefa.belongsTo(Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario'
    });
}