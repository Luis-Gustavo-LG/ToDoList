import React from 'react'
import { useAuth } from './AuthContext';

const Tarefa = ({ tarefa }) => {

const { handleModalTarefa, setTarefaSelecionada } = useAuth();

const getStatusColor = (status) => {
    switch (status) {
        case 'Pendente': return 'bg-red-500';
        case 'Em Andamento': return 'bg-orange-500';
        case 'Concluido': return 'bg-green-500'
    }
}

const abrirModalTarefa = () => {
  setTarefaSelecionada(tarefa);
  handleModalTarefa();
};

    return (
      <div onClick={abrirModalTarefa} className="bg-slate-800 w-70 h-70 text-cyan-50 dark:bg-sky-700 p-4 rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer flex flex-col justify-between">
  <section className='flex flex-row items-center justify-between mb-2'>
      <h2 className="text-lg font-bold">{tarefa.titulo}</h2>
      <div className={`w-5 h-5 ${getStatusColor(tarefa.status)} rounded-full`} />
  </section>

  <div className="flex-1 overflow-hidden">
    <p className="text-sm max-h-24 overflow-y-auto mb-2">{tarefa.descricao}</p>
  </div>

  <div className="text-xs text-gray-400">
    <p>Status: {tarefa.status}</p>
    <p>Data de Termino: {tarefa.dataTermino.split('-').reverse().join('/')}</p>
  </div>
</div>
    );
  };

export default Tarefa