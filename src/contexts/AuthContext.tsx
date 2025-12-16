import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import api from '../../API/api'; 

import { jwtDecode, type JwtPayload } from 'jwt-decode'
import { Navigate, Outlet } from 'react-router-dom';

interface UserData {
    id: string;
    nome: string;
    nome_social: string;
    email: string;
    tipo: 'COORDENADOR' | 'PROFESSOR' | 'ALUNO';
    imagem_perfil_url?: string;
}

interface AuthContextType {
    user: UserData | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, userData: UserData) => void;
    logout: () => Promise<void>; 
    isLoading: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    return <Outlet />;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); 

    const isAuthenticated = useMemo(() => !!token && !!user, [token, user]);
    
    const login = useCallback((newToken: string, userData: UserData) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData)); 
        
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        setToken(newToken);
        setUser(userData);
    }, []);

    const logout = useCallback(async () => {
        
        if (token) {
            try {
                await api.post('/auth/logout'); 
                console.log('Logout bem-sucedido na API.');
            } catch (error) {
                console.error('Erro durante o logout na API, mas o token será limpo localmente:', error);
            }
        }
        
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        
        delete api.defaults.headers.common['Authorization'];

        setUser(null);
        setToken(null);
    }, [token]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                const decoded = jwtDecode<JwtPayload>(storedToken);
                const now = Date.now() / 1000;

                if (decoded.exp && decoded.exp < now) {
                    logout();
                    window.location.reload();
                    return;
                }

                const timeUntilExpire = decoded.exp
                    ? decoded.exp * 1000 - Date.now()
                    : 0;

                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

                if (timeUntilExpire > 0) {
                    setTimeout(() => {
                        logout();
                        window.location.reload();
                    }, timeUntilExpire);
                }
            } catch {
                logout();
                window.location.reload();
            }
        }

        setIsLoading(false);
    }, []);


    const contextValue = useMemo(() => ({
        user,
        token,
        isAuthenticated,
        login,
        logout,
        isLoading,
    }), [user, token, isAuthenticated, login, logout, isLoading]);

    if (isLoading) {
        return <div>Carregando autenticação...</div>; 
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};