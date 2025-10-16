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
    const [user, setUser] = useState<User | null>({
        id: 'coord-001',
        name: 'Coordenador Teste',
        email: 'coordenador@teste.com',
        cpf: '000.000.000-00',
        role: 'coordenador', 
    });

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        isAuthenticated: !!user, 
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};