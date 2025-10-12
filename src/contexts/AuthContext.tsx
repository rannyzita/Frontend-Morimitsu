import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: 'coordenador' | 'aluno/professor';
}

interface authContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<authContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Função para simular o login
    // No futuro, aqui você faria a chamada para a sua API
    const login = (userData: User) => {
        setUser(userData);
        // Você também poderia salvar o usuário no localStorage para manter a sessão
    };

    // Função para fazer o logout
    const logout = () => {
        setUser(null);
        // Limpar o localStorage se estiver usando
    };

    // O valor que será compartilhado com todos os componentes filhos
    const value = {
        isAuthenticated: !!user, // Converte o objeto 'user' para um booleano (true se existe, false se não)
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 4. Criando um Hook customizado (Opcional, mas é uma ótima prática)
// Isso facilita o uso do nosso contexto nos outros componentes.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};