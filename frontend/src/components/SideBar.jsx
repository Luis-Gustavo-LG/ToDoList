import React, { useState } from 'react'
import { Menu, Search } from "lucide-react";
import { useAuth } from './AuthContext';
import { replace, useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {

    const { usuario, logout, isLoading, handleModalAddTarefa, darkMode, setDarkMode } = useAuth();
    const navigate = useNavigate();

    const HandleLogout = () => {
        logout();
        navigate("/", { replace: true })
    }

    if(isLoading) return <p>Carregando...</p>

  return (
    <div className='flex flex-col px-7 left-0 h-screen w-100 bg-slate-800 dark:bg-sky-700 text-cyan-50 transition-colors'>
        <section className='flex flex-row items-center justify-between pt-5'>
        <p className='text-xl w-60 break-words whitespace-nowrap'>{usuario.nome}</p>
            <Menu size={30}/>
        </section>

        <input placeholder="Pesquisar Tarefa..." className='border w-85 items-center place-self-center mt-5 pl-5 rounded-full h-10'/>

        <button onClick={handleModalAddTarefa} className='place-self-center text-center w-70 border-0 border-b-2 border-cyan-50 my-8 cursor-pointer hover:scale-110 duration-100 ease-in'>ADICIONAR NOVA TAREFA</button>

        <section className='flex flex-col items-start'>
            <p className='text-xl mb-5'>TAREFAS</p>

            <p className={`ml-5 text-xl mb-2 hover:ml-2 duration-100 ease-in w-90 cursor-pointer ${location.pathname === '/home' ? 'underline font-bold' : ''}`} onClick={() => navigate("/home")}>Todas as Tarefas</p>
            <p className={`ml-5 text-xl mb-2 hover:ml-2 duration-100 ease-in w-90 cursor-pointer ${location.pathname === '/tarefasEmAndamento' ? 'underline font-bold' : ''}`} onClick={() => navigate("/tarefasEmAndamento")}>Em Andamento</p>
            <p className={`ml-5 text-xl mb-2 hover:ml-2 duration-100 ease-in w-90 cursor-pointer ${location.pathname === '/tarefasPendentes' ? 'underline font-bold' : ''}`} onClick={() => navigate("/tarefasPendentes")}>Pendentes</p>
            <p className={`ml-5 text-xl mb-2 hover:ml-2 duration-100 ease-in w-90 cursor-pointer ${location.pathname === '/tarefasConcluidas' ? 'underline font-bold' : ''}`} onClick={() => navigate("/tarefasConcluidas")}>Concluídas</p>
        </section>

        <section className='flex flex-col mt-10 items-start'>
            <p className='text-xl mb-5'>ORGANIZAÇÃO</p>

            <p className={`ml-5 text-xl mb-2 hover:ml-2 duration-100 ease-in w-90 cursor-pointer`}>Categoria</p>
            <p className={`ml-5 text-xl mb-2 hover:ml-2 duration-100 ease-in w-90 cursor-pointer`}>Prioridades</p>
            <p className={`ml-5 text-xl mb-2 hover:ml-2 duration-100 ease-in w-90 cursor-pointer`}>Projetos</p>
        </section>

        <section className='flex flex-col mt-10 items-start'>
            <p className='text-xl mb-5'>PLANEJAMENTO</p>

            <p className={`ml-5 text-xl mb-2 hover:ml-2 duration-100 ease-in w-90 cursor-pointer`}>Agenda Semanal</p>
            <p className={`ml-5 text-xl mb-2 hover:ml-2 duration-100 ease-in w-90 cursor-pointer`}>Calendário</p>
        </section>

        <label className="relative inline-flex items-center cursor-pointer mt-10 ml-7">
        <input type="checkbox" defaultChecked={darkMode} onClick={() => setDarkMode(!darkMode)} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-cyan-500 transition-colors"></div>
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all peer-checked:translate-x-5"></div>
        <span className="ml-3 text-xl text-white">{darkMode ? "Modo Escuro" : "Modo Claro"}</span>
        </label>

        <button onClick={HandleLogout} 
        className='place-self-center text-center w-70 border-0 border-b-2 border-cyan-50 my-8 cursor-pointer hover:scale-110 duration-100 ease-in'
        >SAIR DA CONTA</button>
    </div>
  )
}

export default SideBar