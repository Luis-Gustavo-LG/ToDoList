import React from 'react'
import { useAuth } from './AuthContext'
import { X } from "lucide-react"
import { Controller, useForm } from 'react-hook-form'
import Select from "react-select"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTarefasAPI } from '../configAPI/useTarefasAPI'


const ModalAddTarefa = () => {

  const { modalAddTarefa, handleModalAddTarefa, usuario, setAtualizarTarefas } = useAuth();
  const { createTarefa } = useTarefasAPI();

  const opcoesStatus = [
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Em Andamento', label: 'Em Andamento' },
    { value: 'Concluido', label: 'Concluído' },
  ];

  const handleTarefa = async (data) => {
    try {
        const now = new Date();

        const payload = {
          ...data,
          status: data.status?.value || '',
          dataTermino: data.dataHora?.toISOString().split('T')[0] || null,
          dataCriacao: now.toISOString().split('T')[0],
          usuarioId: usuario.id,
        };
  
      const dados = await createTarefa(payload);
      setAtualizarTarefas(true)
      handleModalAddTarefa()
    } catch (error) {
      console.log(error);
    }
  };
  
  const { control, register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${modalAddTarefa ? 'visible' : 'invisible'}`}>
    
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          modalAddTarefa ? 'opacity-50' : 'opacity-0'
        }`}
      />

  <form onSubmit={handleSubmit(handleTarefa)} className={`bg-cyan-50 p-6 rounded-lg w-96 shadow-lg z-50 transform transition-all duration-300 ease-in-out flex flex-col items-center ${
          modalAddTarefa ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
        <p className='font-mono text-2xl mb-10'>ADICIONAR TAREFA</p>
        <button type='button' className='absolute right-5 top-3 cursor-pointer hover:scale-130 duration-100 ease-in' onClick={handleModalAddTarefa}><X /></button>

        <input
            {...register("titulo", { required: "Título é obrigatório"})}
            placeholder={errors.titulo ? errors.titulo.message : 'Digíte seu Título'} 
            type='text' 
            className={`border-b-2 mb-10 border-slate-950 w-80 placeholder:text-2xl focus:outline-none ${errors.titulo ? 'border-red-500 placeholder:text-red-500' : 'border-slate-950'}`}
        />

        <input
            {...register("descricao", { required: "Descrição é obrigatória"})}
            placeholder={errors.descricao ? errors.descricao.message : "Digíte sua Descrição"} 
            type='text' 
            className={`border-b-2 border-slate-950 w-80 placeholder:text-2xl focus:outline-none mb-3 ${errors.descricao ? 'border-red-500 placeholder:text-red-500' : 'border-slate-950'}`}
        />

        <div className='flex flex-row mt-5 gap-10'>

        <div className='flex flex-col'>
            <label>Status da Tarefa</label>
            <Controller
        name="status"
        control={control}
        defaultValue={opcoesStatus[0]}
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
                    dateFormat="dd/MM/YYYY"
                    placeholderText="Data"
                    className="w-30 p-2 rounded-lg border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                )}
                />
            </div>
        </div>

        <input type="submit" placeholder='ENVIAR'
        className='border mt-5 text-2xl text-cyan-50 w-80 h-12 rounded-md outline-2 cursor-pointer border-slate-900 bg-slate-900 hover:text-slate-900 hover:bg-cyan-50 duration-100 ease-in'/>
  </form>
</div>
  )
}

export default ModalAddTarefa