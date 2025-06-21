import React, { useEffect, useState } from 'react';
import type { User, LoginRequest } from '../types/auth';
import { authEndpoints } from '../services/api';
import { AuthContext, type AuthContextType } from './AuthContextDefinition';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    const login = async (credentials: LoginRequest) => {
        try {
            const response = await authEndpoints.login(
                credentials.email,
                credentials.password,
            );
            const { access_token, user: userData } = response.data;

            // Salvar token e dados do usuário
            localStorage.setItem('@rpe:token', access_token);
            //   localStorage.setItem('@rpe:user', JSON.stringify(userData));

            setUser(userData);

            console.log('[AUTH] Login bem-sucedido:', userData);
        } catch (error: unknown) {
            console.error('[AUTH] Erro no login:', error);
            let message = 'Erro ao fazer login';
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as {
                    response?: { data?: { message?: string } };
                };
                message =
                    axiosError.response?.data?.message || 'Erro ao fazer login';
            }
            throw new Error(message);
        }
    };

    const logout = () => {
        localStorage.removeItem('@rpe:token');
        // localStorage.removeItem('@rpe:user');
        setUser(null);
        console.log('[AUTH] Logout realizado');
    };

    const checkAuth = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('@rpe:token');

            if (!token) {
                setLoading(false);
                return;
            }

            // Verificar se o token ainda é válido
            const response = await authEndpoints.me();
            const userData = response.data;

            setUser(userData);
            //   localStorage.setItem('@rpe:user', JSON.stringify(userData));

            console.log('[AUTH] Token válido, usuário autenticado:', userData);
        } catch (error) {
            console.error('[AUTH] Token inválido, fazendo logout:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('@rpe:token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await authEndpoints.me();
                const userData = response.data;
                setUser(userData);
                console.log(
                    '[AUTH] Token válido, usuário autenticado:',
                    userData,
                );
            } catch (error) {
                console.error('[AUTH] Token inválido, fazendo logout:', error);
                localStorage.removeItem('@rpe:token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
