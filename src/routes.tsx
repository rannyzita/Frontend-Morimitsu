import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { MainLayout } from './components/layout/MainLayout'
import { AuthProvider } from './contexts/AuthContext'

import { Login } from './pages/login/Login'
import { RecuperarSenha } from './pages/resetPassword/recuperarSenha'
import { Home } from './pages/home/Home'

// Paginas de turma
import { GerenciamentoTurmas } from './pages/classManagement/class'

import { CreateTurma } from './pages/classManagement/options/CreateTurma'
import { DeleteTurma } from './pages/classManagement/options/DeleteTurma'
import { EditTurma } from './pages/classManagement/options/EditTurma'
import { VerDetalhesTurma } from './pages/classManagement/options/ReadDetailsTurma'
import { VerTurmas } from './pages/classManagement/options/ReadTurmas'

// Pagina de Perfil
import { Profile } from './pages/Profile/Profile'

import { NotFound } from './pages/NotFound/notFound'

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Navigate to='/login' replace />} />
                    <Route path='/recuperar-senha' element={<RecuperarSenha/>} />
                    
                    <Route element={<MainLayout />}>
                        <Route path='/home' element={<Home />} />
                        <Route path='*' element={<NotFound />} />

                        {/* Rotas de turma */}
                        <Route path='/gerenciamento-turmas' element={<GerenciamentoTurmas />} />
                        
                        <Route path='/gerenciamento-turmas/criar-turma' element={<CreateTurma />} />
                        <Route path='/gerenciamento-turmas/deletar-turma' element={<DeleteTurma />} />
                        <Route path='/gerenciamento-turmas/editar-turma' element={<EditTurma />} />
                        <Route path="/gerenciamento-turmas/ver/:id" element={<VerDetalhesTurma />} /> 
                        <Route path='/gerenciamento-turmas/ver-turmas' element={<VerTurmas />} />

                        <Route path='/meu-perfil' element={<Profile></Profile>} />
                    </Route>
                </Routes>
            </BrowserRouter>  
        </AuthProvider>
    )
}