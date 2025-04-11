import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/AuthContext'
import SideBar from '../components/SideBar';
import Tarefa from '../components/Tarefa';
import axios from 'axios';
import ModalAddTarefa from '../components/ModalAddTarefa';
import { useTarefasAPI } from '../configAPI/useTarefasAPI';
import TarefasView from '../components/TarefasView';
import ModalTarefa from '../components/ModalTarefa';

const Home = ({ filtro }) => {

  return (
    <div className='bg-slate-900 dark:bg-cyan-50 flex flex-row transition-colors'>
      <SideBar/>
      <div className="flex flex-1 flex-col items-center justify-start min-h-screen gap-8">
        <p className="text-4xl text-cyan-50 dark:text-sky-700 font-bold font-mono place-self-start mt-5 ml-10 mb-15 underline">
          MY TO DO LIST
        </p>
        <TarefasView filtro={filtro}/>
      </div>
      <ModalAddTarefa/>
      <ModalTarefa/>
    </div>
  )
}

export default Home