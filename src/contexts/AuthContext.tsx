import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextDefinition';
import type { User, LoginRequest } from '../types/auth';
import { authEndpoints } from '../services/api';
import type { AxiosError } from 'axios';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    // Inicializar - verificar se há usuário salvo
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('@rpe:token');
            const savedUser = localStorage.getItem('@rpe:user');

            if (token && savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                } catch (error) {
                    console.error(
                        'Erro ao recuperar usuário do localStorage:',
                        error,
                    );
                    localStorage.removeItem('@rpe:token');
                    localStorage.removeItem('@rpe:user');
                }
            }

            setLoading(false);
        };

        initializeAuth();
    }, []);

    // MOCK DE USUÁRIO PARA DESENVOLVIMENTO
    useEffect(() => {
        // Só mocka se não houver usuário já salvo
        if (!user) {
            setUser({
                id: 1,
                name: 'Usuário Mockado',
                email: 'mock@rocketlab.com',
                roles: ['RH'],
                department: 'TI',
                position: 'Desenvolvedor',
                avatar: undefined,
                isActive: true,
                lastLogin: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
    }, [user]);

    const login = async ({ email, password }: LoginRequest) => {
        try {
            setLoading(true);
            const response = await authEndpoints.login(email, password);

            const { access_token, user: userData } = response.data;

            localStorage.setItem('@rpe:token', access_token);
            localStorage.setItem('@rpe:user', JSON.stringify(userData));

            setUser(userData);
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Erro no login:', axiosError);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        // Limpa estado local IMEDIATAMENTE
        localStorage.removeItem('@rpe:token');
        localStorage.removeItem('@rpe:user');
        setUser(null);

        // Tenta logout no backend em background (não bloqueia UI)
        try {
            await authEndpoints.logout();
        } catch {
            // Ignora erros - o importante é que o frontend já fez logout
            console.warn('Erro no logout no servidor (ignorado)');
        }
    };

    // Implementa o checkAuth conforme exigido pelo AuthContextType
    const checkAuth = async () => {
        const token = localStorage.getItem('@rpe:token');
        const savedUser = localStorage.getItem('@rpe:user');
        if (token && savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
            } catch {
                setUser(null);
                localStorage.removeItem('@rpe:token');
                localStorage.removeItem('@rpe:user');
            }
        } else {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
