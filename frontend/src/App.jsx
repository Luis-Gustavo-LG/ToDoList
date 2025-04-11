import React from 'react'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.jsx'
import PublicRoute from './components/PublicRoute.jsx'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
            }/>
          <Route path='/home' element={
            <PrivateRoute>
              <Home filtro="todas"/>
            </PrivateRoute>
            }/>
            <Route path='/tarefasEmAndamento' element={
            <PrivateRoute>
              <Home filtro="Em Andamento"/>
            </PrivateRoute>
            }/>
            <Route path='/tarefasPendentes' element={
            <PrivateRoute>
              <Home filtro="Pendente"/>
            </PrivateRoute>
            }/>
            <Route path='/tarefasConcluidas' element={
            <PrivateRoute>
              <Home filtro="Concluido"/>
            </PrivateRoute>
            }/>
        </Routes>
    </BrowserRouter>
  )
}

export default App