import { useAuth } from './AuthContext';
import { X, Trash2 } from "lucide-react";
import { Controller, useForm } from 'react-hook-form';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from 'react';
import { useTarefasAPI } from '../configAPI/useTarefasAPI';

const ModalTarefa = () => {
  const { modalTarefa, handleModalTarefa, tarefaSelecionada, setAtualizarTarefas } = useAuth();
  const { updateTarefa, deleteTarefa } = useTarefasAPI()

  const opcoesStatus = [
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Em Andamento', label: 'Em Andamento' },
    { value: 'Concluido', label: 'Concluído' },
  ];

  const { control, register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (tarefaSelecionada) {
      setValue("titulo", tarefaSelecionada.titulo);
      setValue("descricao", tarefaSelecionada.descricao);
      setValue("status", opcoesStatus.find(opt => opt.value === tarefaSelecionada.status));
      setValue("dataHora", new Date(tarefaSelecionada.dataTermino));
    }
  }, [tarefaSelecionada, setValue]);

  const handleEditar = async (data) => {
    const payload = {
      ...tarefaSelecionada,
      titulo: data.titulo,
      descricao: data.descricao,
      status: data.status?.value || '',
      dataTermino: data.dataHora?.toISOString().split('T')[0] || null,
    };

    console.log("Dados para salvar:", payload);

    await updateTarefa(tarefaSelecionada.id, payload);
    setAtualizarTarefas(true)
    handleModalTarefa();
  };

  const handleExcluir = async () => {
    try {
      await deleteTarefa(tarefaSelecionada.id);
      setAtualizarTarefas(true)
      handleModalTarefa()
    } catch (error) {
      console.log(error)
    }
  }

  if (!tarefaSelecionada) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${modalTarefa ? 'visible' : 'invisible'}`}>
      <div className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${modalTarefa ? 'opacity-50' : 'opacity-0'}`} />

      <form onSubmit={handleSubmit(handleEditar)} className={`bg-cyan-50 p-6 rounded-lg w-96 shadow-lg z-50 transform transition-all duration-300 ease-in-out flex flex-col items-center ${
          modalTarefa ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
        <button type='button' className='absolute right-5 top-3 cursor-pointer hover:scale-130 duration-100 ease-in' onClick={handleModalTarefa}><X /></button>
        <button type='button' className='absolute left-5 top-5 cursor-pointer hover:scale-130 duration-100 ease-in' onClick={handleExcluir}><Trash2 size={40} /></button>
        <p className='font-mono text-2xl mb-10'>EDITAR TAREFA</p>

        <input
          {...register("titulo")}
          placeholder="Título"
          type='text'
          className='border-b-2 mb-10 border-slate-950 w-80 placeholder:text-2xl focus:outline-none'
        />

        <input
          {...register("descricao")}
          placeholder="Descrição"
          type='text'
          className='border-b-2 border-slate-950 w-80 placeholder:text-2xl focus:outline-none mb-3'
        />

        <div className='flex flex-row mt-5 gap-10'>

          <div className='flex flex-col'>
            <label>Status</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={opcoesStatus}
                  placeholder="Selecione o status"
                  className="text-black place-self-start"
                />
              )}
            />
          </div>

          <div className='flex flex-col'>
            <label>Data de Termino</label>
            <Controller
              control={control}
              name="dataHora"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Data"
                  className="w-30 p-2 rounded-lg border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              )}
            />
          </div>
        </div>

        <input
          type="submit"
          value="SALVAR"
          className='border mt-5 text-2xl text-cyan-50 w-80 h-12 rounded-md outline-2 cursor-pointer border-slate-900 bg-slate-900 hover:text-slate-900 hover:bg-cyan-50 duration-100 ease-in'
        />
      </form>
    </div>
  );
};

export default ModalTarefa;
