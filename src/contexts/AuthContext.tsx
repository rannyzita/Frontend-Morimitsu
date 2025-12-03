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

// --- Contexto (sem mudança) ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Hook useAuth (sem mudança) ---
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// --- PROVIDER (COM AS MUDANÇAS) ---

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Começa true

    const isAuthenticated = useMemo(() => !!token && !!user, [token, user]);
    
    // --- MUDANÇA AQUI ---
    const login = useCallback((newToken: string, userData: UserData) => {
        // Armazena AMBOS no localStorage
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData)); // Salva o usuário como string
        
        // Define o token no header da API para requisições futuras
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        // Atualiza os estados
        setToken(newToken);
        setUser(userData);
    }, []);

    // --- MUDANÇA AQUI ---
    const logout = useCallback(async () => {
        
        if (token) {
            try {
                await api.post('/auth/logout'); 
                console.log("Logout bem-sucedido na API.");
            } catch (error) {
                console.error("Erro durante o logout na API, mas o token será limpo localmente:", error);
            }
        }
        
        // Limpa AMBOS do localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Remove o usuário
        
        // Limpa o header da API
        delete api.defaults.headers.common['Authorization'];

        // Limpa os estados
        setUser(null);
        setToken(null);
    }, [token]);

    // --- MUDANÇA AQUI ---
    useEffect(() => {
        // Ao carregar a app, tenta pegar ambos do localStorage
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user'); // Pega o usuário
        
        if (storedToken && storedUser) {
            // Se ambos existem, seta o estado com eles
            const userData: UserData = JSON.parse(storedUser); // Converte string de volta para objeto
            
            setToken(storedToken);
            setUser(userData);
            
            // Importante: Não se esqueça de reconfigurar o header da API!
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
        
        // Termina o loading
        setIsLoading(false);
        
    }, []); // Array vazio, roda apenas uma vez no carregamento

    // O valor do contexto (sem mudança)
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