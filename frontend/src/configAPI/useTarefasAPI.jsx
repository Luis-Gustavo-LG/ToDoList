import axios from "axios"

const API_URL = "http://localhost:3000/tarefas";

export const useTarefasAPI = () => {

    const getAllTarefas = async () => {
        const response = await axios.get(API_URL);
        return response.data
    };

    const getTarefasByUsuarioId = async (id) => {
        const response = await axios.get(`${API_URL}/usuario/${id}`)
        return response.data
    }

    const createTarefa = async (tarefa) => {
        const response = await axios.post(API_URL, tarefa)
        return response.data
    }

    const updateTarefa = async (id, tarefaAtualizada) => {
        const response = await axios.put(`${API_URL}/${id}`, tarefaAtualizada);
        return response.data;
      };

    const deleteTarefa = async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response.data
    }

    return {
        getAllTarefas,
        getTarefasByUsuarioId,
        createTarefa,
        updateTarefa,
        deleteTarefa
    }
};