import Tarefa from "../models/tarefa.model.js";
import Usuario from "../models/usuario.model.js";

export const GetAllTarefasHandler = async (req, res) => {
    const tarefas = await Tarefa.findAll();
    res.json(tarefas);
}

export const GetTarefaByIdHandler = async (req, res) => {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).json({ message: `Tarefa com ID ${req.params.id} não encontrada` });
    res.json(tarefa);
};

export const CreateTarefaHandler = async (req, res) => {
    const { titulo, descricao, dataCriacao, dataTermino, status, usuarioId } = req.body

    try {
        const newTarefa = await Tarefa.create({ titulo, descricao, dataCriacao, dataTermino, status, usuarioId });
        res.status(201).json(newTarefa)
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

export const UpdateTarefaHandler = async (req, res) => {
    const tarefaAtualizada = await Tarefa.findByPk(req.params.id);
    const { titulo, descricao, dataCriacao, dataTermino, status } = req.body
    if (!tarefaAtualizada) return res.status(404).json({ message: `Tarefa com ID ${req.params.id} não encontrada` });

    tarefaAtualizada.titulo = titulo ?? tarefaAtualizada.titulo;
    tarefaAtualizada.descricao = descricao ?? tarefaAtualizada.descricao;
    tarefaAtualizada.dataCriacao = dataCriacao ?? tarefaAtualizada.dataCriacao;
    tarefaAtualizada.dataTermino = dataTermino ?? tarefaAtualizada.dataTermino;
    tarefaAtualizada.status = status ?? tarefaAtualizada.status

    try {
        await tarefaAtualizada.save();
        res.json(tarefaAtualizada);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

export const DeleteTarefaHandler = async (req, res) => {
    const tarefaDeletada = await Tarefa.findByPk(req.params.id);
    if (!tarefaDeletada) return res.status(404).json({ message: `Tarefa com ID ${req.params.id} não encontrada` });

    await tarefaDeletada.destroy();
    res.status(204).send();
}

export const GetTarefaByUsuarioId = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: `ID ${id} não encontrado` });

    try {
        const tarefas = await Tarefa.findAll({
            where: { usuarioId: id }
        });

        res.json(tarefas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar tarefas." });
    }
}