import React, { createContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import type { User, LoginRequest } from '../types/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

const USER_QUERY_KEY = ['auth', 'me'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient();

    // Busca o usuário autenticado se houver token salvo
    const { data: user, isLoading } = useQuery<User | null>({
        queryKey: USER_QUERY_KEY,
        queryFn: async () => {
            const token = localStorage.getItem('@rpe:token');
            if (!token) return null;
            const res = await api.get('/auth/me');
            return res.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutos
        retry: false,
    });

    // Mutation para login
    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginRequest) => {
            const res = await api.post('/auth/login', credentials);
            return res.data;
        },
        onSuccess: data => {
            localStorage.setItem('@rpe:token', data.access_token);
            queryClient.setQueryData(USER_QUERY_KEY, data.user);
        },
    });

    // Função de login
    async function login(credentials: LoginRequest) {
        await loginMutation.mutateAsync(credentials);
    }

    // Função de logout
    function logout() {
        localStorage.removeItem('@rpe:token');
        queryClient.setQueryData(USER_QUERY_KEY, null);
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    }

    return (
        <AuthContext.Provider
            value={{
                user: user ?? null,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
