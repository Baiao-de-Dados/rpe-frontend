import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean; // Novo estado para controlar carregamento
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Inicia com loading=true

    useEffect(() => {
        // Verifica se há um usuário salvo no localStorage ao carregar a página
        const storedUser = localStorage.getItem('@rpe:user');
        const storedToken = localStorage.getItem('@rpe:token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }

        // Após verificar o localStorage, marca como carregado
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // Simulando uma chamada de API para login
            // Em produção, substitua isso pela chamada real à sua API
            if (email === 'usuario@teste.com' && password === 'senha123') {
                const userData = {
                    id: '1',
                    name: 'Usuário Teste',
                    email,
                };

                // Simula um token JWT
                const token = 'token-simulado';

                // Salva os dados no localStorage
                localStorage.setItem('@rpe:user', JSON.stringify(userData));
                localStorage.setItem('@rpe:token', token);

                setUser(userData);
                setIsAuthenticated(true);
            } else {
                throw new Error('Credenciais inválidas');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('@rpe:user');
        localStorage.removeItem('@rpe:token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
