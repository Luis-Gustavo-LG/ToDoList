import React, { useState } from 'react'
import googleicon from '../assets/google.webp';
import twitterlogo from '../assets/twitter.jpg';
import instagramlogo from '../assets/instagram.png';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAuth } from "../components/AuthContext.jsx"

const Login = () => {

const { login } = useAuth();

const { register, handleSubmit, formState: { errors } } = useForm();

const [showPassword, setShowPassword] = useState(false)
const navigate = useNavigate();

const HandlerLogin = async (data) => {

    try {
        const response = await axios.post("http://localhost:3000/usuarios/login", data);
        
        const { token, usuario } = response.data;

        login(usuario, token);

        navigate("/home", { replace: true })
    } catch (error) {
        console.error(error.response?.data?.message || "Erro ao fazer login");
    }
}

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tl from-slate-900 to-slate-700'>
        <form onSubmit={handleSubmit(HandlerLogin)} className='bg-cyan-50 flex justify-start items-center py-10 px-10 flex-col h-150 w-100 rounded-md'>

            <p className='text-4xl font-bold mb-10'>Login</p>
        
            <input
            {...register("email", { required: "Email é obrigatório"})}
            placeholder={errors.email ? errors.email.message : 'Digíte seu Email'} 
            type='email' 
            className={`border-b-2 border-slate-950 w-80 placeholder:text-2xl focus:outline-none mb-15 ${errors.email ? 'border-red-500 placeholder:text-red-500' : 'border-slate-950'}`}
            />
            
            <input
            {...register("senha", { required: "Senha é obrigatória"})}
            placeholder={errors.senha ? errors.senha.message : "Digíte sua Senha"} 
            type={showPassword ? 'text' : 'password'} 
            className={`border-b-2 border-slate-950 w-80 placeholder:text-2xl focus:outline-none mb-3 ${errors.senha ? 'border-red-500 placeholder:text-red-500' : 'border-slate-950'}`}
            />

            <div className='flex place-self-start items-center flex-row gap-1 mb-12'>
                <input onClick={() => setShowPassword(!showPassword)} type='checkbox' className="w-5 h-5 accent-slate-700 border-2 border-slate-950 rounded-sm"/>
                <p className='font-medium'>Mostrar Senha</p>
            </div>

            <input 
            type='submit' 
            placeholder='Entrar'
            className='border w-80 h-15 rounded-md bg-slate-900 text-cyan-50 font-bold hover:bg-cyan-50 hover:text-slate-900 hover:outline-2 duration-100 ease-in cursor-pointer'/>
            
            <p className='mt-10'>Esqueceu a <span className='text-slate-900 font-medium cursor-pointer hover:text-slate-600 duration-100 ease-in'>Senha?</span></p>
            <p className='mt-3'>Não tem uma <span className='text-slate-900 font-medium cursor-pointer hover:text-slate-600 duration-100 ease-in'>Conta?</span></p>

            <div className='flex flex-row items-center gap-5 mt-3'>
                <img 
                src={googleicon} 
                className='h-15 w-15 cursor-pointer'/>
                <img 
                src={twitterlogo} 
                className='h-10 w-10 cursor-pointer rounded-full'/>
                <img 
                src={instagramlogo} 
                className='h-12 w-12 cursor-pointer ml-2'/>
            </div>
        </form>
    </div>
  )
}

export default Login