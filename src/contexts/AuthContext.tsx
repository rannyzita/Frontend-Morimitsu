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
    nome: string;
    nome_social: string;
    email: string;
    tipo: 'COORDENADOR' | 'PROFESSOR' | 'ALUNO'; 
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
                console.log("Logout bem-sucedido na API.");
            } catch (error) {
                console.error("Erro durante o logout na API, mas o token será limpo localmente:", error);
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
            const userData: UserData = JSON.parse(storedUser); 
            
            setToken(storedToken);
            setUser(userData);
            
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
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