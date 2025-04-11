import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useTarefasAPI } from '../configAPI/useTarefasAPI'
import Tarefa from './Tarefa'

const TarefasView = ({ filtro }) => {

    const { usuario, isLoading, atualizarTarefas, setAtualizarTarefas } = useAuth()
    const { getTarefasByUsuarioId } = useTarefasAPI()
    const [tarefas, setTarefas] = useState([])
    const [paginaAtual, setPaginaAtual] = useState(1)
    const tarefasPorPagina = 8

    useEffect(() => {
        const carregarTarefas = async () => {
            if (!usuario) return
            const todas = await getTarefasByUsuarioId(usuario.id)
      
            const filtradas = filtro === 'todas'
              ? todas
              : todas.filter(t => t.status === filtro)
      
            setTarefas(filtradas)
            setPaginaAtual(1)
          }
      
          if (!isLoading) {
            carregarTarefas();
            setAtualizarTarefas(false);
          }
    }, [isLoading, usuario, filtro, atualizarTarefas])

  const indexInicio = (paginaAtual - 1) * tarefasPorPagina
  const indexFim = indexInicio + tarefasPorPagina
  const tarefasPagina = tarefas.slice(indexInicio, indexFim)
  const totalPaginas = Math.ceil(tarefas.length / tarefasPorPagina)
    
  return (
    <div className='flex flex-col items-center'>
    <section className="h-[700px] w-[1300px] p-5 gap-5 flex flex-wrap flex-row justify-center items-center">
      {tarefas.length > 0 ? (
        tarefasPagina.map((tarefa) => (
          <Tarefa key={tarefa.id} tarefa={tarefa} />
        ))
      ) : (
        <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
      )}
    </section>
    {totalPaginas > 1 && (
        <div className="flex gap-2 mb-10">
          <button
            onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
            disabled={paginaAtual === 1}
            className="px-3 py-1 rounded bg-slate-800 dark:bg-sky-700 text-white disabled:opacity-50"
          >
            Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => setPaginaAtual(i + 1)}
              className={`px-3 py-1 rounded ${
                paginaAtual === i + 1
                  ? 'bg-cyan-50 text-black dark:bg-sky-200'
                  : 'bg-slate-800 text-white dark:bg-sky-700'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))
            }
            disabled={paginaAtual === totalPaginas}
            className="px-3 py-1 rounded bg-slate-800 dark:bg-sky-700 text-white disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}

export default TarefasView