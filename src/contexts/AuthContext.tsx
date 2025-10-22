import React, { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    useCallback, 
    useMemo 
} from 'react';
import api from '../../API/api'; 

interface UserData {
    id: number;
    name: string;
    email: string;
    role: 'COORDENADOR' | 'PROFESSOR' | 'ALUNO'; 
}

interface AuthContextType {
    user: UserData | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, userData: UserData) => void;
    logout: () => Promise<void>; 
    isLoading: boolean; 
}

// Criação do Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- HOOK DE CONSUMO ---

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// --- PROVIDER ---

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = useMemo(() => !!token && !!user, [token, user]);
    
    const login = useCallback((newToken: string, userData: UserData) => {
        // Armazena o token e os dados do usuário
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
        
    }, []);

    const logout = useCallback(async () => {
        
        if (token) {
            try {
                await api.post('/auth/logout'); 
                console.log("Logout bem-sucedido na API.");

            } catch (error) {
                console.error("Erro durante o logout na API, mas o token será limpo localmente:", error);
            }
        }
        
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    }, [token]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        
        if (storedToken) {
            setToken(storedToken);
        }
        
        setIsLoading(false);
        
    }, []);

    // O valor do contexto
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