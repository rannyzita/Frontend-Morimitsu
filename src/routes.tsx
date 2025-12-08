import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { MainLayout } from './components/layout/MainLayout'
import { AuthProvider } from './contexts/AuthContext'

import { Login } from './pages/login/Login'
import  RecuperarSenha from './pages/resetPassword/recuperarSenha'
import { Home } from './pages/home/Home'

// Pagina de turma
import { GerenciamentoTurmas } from './pages/classManagement/class'

import { CreateTurma } from './pages/classManagement/options/CreateClass/CreateTurma'
import { DeleteTurma } from './pages/classManagement/options/DeleteClass/DeleteTurma'
import { EditTurma } from './pages/classManagement/options/EditClass/EditTurma'
import { VerDetalhesTurma } from './pages/classManagement/options/ReadClass/ReadDetailsTurma'
import { VerTurmas } from './pages/classManagement/options/ReadClass/ReadTurmas'
import { ReadAddStudent } from './pages/classManagement/options/AddStudent/ReadAddStudent'
import { ReadUnassignStudent } from './pages/classManagement/options/UnassignStudent/ReadUnassign_Student'
import { EnturmarAluno } from './pages/classManagement/options/AddStudent/AddStudent'
import { DesenturmarAluno } from './pages/classManagement/options/UnassignStudent/UnassignStudent'

// Pagina de Perfil
import { Profile } from './pages/Profile/Profile'

// Pagina Not Found
import { NotFound } from './pages/NotFound/notFound'

// Pagina de Usuário
import { GerenciamentoUsuarios } from './pages/UserManagement/userManagement'
import { VerUsuarios } from './pages/UserManagement/options/ReadUser'
import { CreateUsuario } from './pages/UserManagement/options/CreateUser'
import { EditVerUsuarios } from './pages/UserManagement/options/EditReadUser'
import { EditUsuario } from './pages/UserManagement/options/EditUser'
import { DeletarUsuario } from './pages/UserManagement/options/DeleteUser'
// Pagina de Relatorio
import { Report } from './pages/report/report'

// Pagina de Aniversariantes 
import { Birthday } from './pages/birthday/birthday'

// Pagina de Graduacao
import { Graduation } from './pages/graduation/graduation'

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Navigate to='/login' replace />} />
                    <Route path='/recuperar-senha' element={<RecuperarSenha/>} />
                    <Route path='*' element={<NotFound />} />
                    
                    <Route element={<MainLayout />}>
                        <Route path='/home' element={<Home />} />

                        {/* Rotas de turma */}
                        <Route path='/gerenciamento-turmas' element={<GerenciamentoTurmas />} />
                        <Route path='/gerenciamento-turmas/criar-turma' element={<CreateTurma />} />
                        <Route path='/gerenciamento-turmas/deletar-turma' element={<DeleteTurma />} />
                        <Route path='/gerenciamento-turmas/editar-turma' element={<EditTurma />} />
                        <Route path='/gerenciamento-turmas/ver/:id' element={<VerDetalhesTurma />} /> 
                        <Route path='/gerenciamento-turmas/ver-turmas' element={<VerTurmas />} />
                        <Route path='/gerenciamento-turmas/enturmar-aluno' element={<ReadAddStudent />} />
                        <Route path='/gerenciamento-turmas/desenturmar-aluno' element={<ReadUnassignStudent/>} />
                        <Route path='/gerenciamento-turmas/enturmar-aluno/:id' element={<EnturmarAluno />} />
                        <Route path='/gerenciamento-turmas/desenturmar-aluno/:id' element={<DesenturmarAluno/>} />

                        {/* Rotas de Gerenciamento de Usuário */}
                        <Route path='/gerenciamento-usuarios' element={<GerenciamentoUsuarios />} />
                        <Route path='/gerenciamento-usuarios/ver-usuarios' element={<VerUsuarios />} />
                        <Route path='/gerenciamento-usuarios/criar-usuario' element={<CreateUsuario />} />
                        <Route path='/gerenciamento-usuarios/editar-usuario' element={<EditVerUsuarios />} />
                        <Route path='/gerenciamento-usuarios/editar-usuario/:id' element={<EditUsuario />} />
                        <Route path='/gerenciamento-usuarios/deletar-usuario' element={<DeletarUsuario />} />

                        {/* Rota de Usuário */}
                        <Route path='/meu-perfil' element={<Profile />} />

                        {/* Rota de Relatorio */}
                        <Route path='/relatorio' element={<Report />} />

                        {/* Rota de Aniversariantes */}
                        <Route path='/aniversarios' element={<Birthday/>} />

                        {/* Rota de Graduacao */}
                        <Route path='/graduacao' element={<Graduation/>} />
                    </Route>
                </Routes>
            </BrowserRouter>  
        </AuthProvider>
    )
}