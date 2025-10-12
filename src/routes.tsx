import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { MainLayout } from './components/layout/MainLayout'
import { AuthProvider } from './contexts/AuthContext'

import { Login } from './pages/login/Login'
import { RecuperarSenha } from './pages/resetPassword/recuperarSenha'
import { Home } from './pages/home/Home'

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
                        <Route path='*' element={<h1>404 - Not Found!</h1>} />
                    </Route>

                </Routes>
            </BrowserRouter>  
        </AuthProvider>
    )
}