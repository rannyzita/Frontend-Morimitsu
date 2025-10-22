import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Chave usada para armazenar o token no localStorage
const TOKEN_KEY = 'authToken';
const USER_KEY = 'user'; // Chave para armazenar o objeto User

interface User {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: 'COORDENADOR' | 'PROFESSOR';
}

interface authContextType {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<authContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // Estado inicial: Ambos são null, e serão carregados no useEffect
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    
    // Indica se a verificação inicial do localStorage já terminou
    const [isLoading, setIsLoading] = useState(true); 

    // --- Lógica de Inicialização e Carregamento (Persistência) ---
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(parsedUser);
            } catch (error) {
                // Se falhar (dados corrompidos), limpamos tudo
                console.error("Erro ao carregar dados do usuário persistidos:", error);
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_KEY);
            }
        }
        setIsLoading(false);
    }, []); 

    // --- Funções de Autenticação ---

    // Atualizado para receber token e userData do componente Login
    const login = (newToken: string, userData: User) => {
        // 1. Salvar no Estado
        setToken(newToken);
        setUser(userData);
        
        // 2. Persistir no LocalStorage
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
    };

    const logout = () => {
        // 1. Limpar o Estado
        setUser(null);
        setToken(null);
        
        // 2. Limpar o LocalStorage
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    };

    const value = {
        isAuthenticated: !!user, 
        user,
        token,
        login,
        logout
    };

    // Renderiza o contexto apenas após a verificação inicial do localStorage
    if (isLoading) {
        // Opcional: Aqui você pode retornar um spinner de carregamento global
        return <div>Carregando...</div>; 
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};