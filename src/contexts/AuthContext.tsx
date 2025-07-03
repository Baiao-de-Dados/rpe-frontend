import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContextDefinition';
import type {
    User,
    LoginRequest,
    DecodedToken,
    UserRoleEnum,
} from '../types/auth';
import { authEndpoints } from '../services/api/auth';

import {
    hasExactRole,
    hasAnyRole as hasAnyRoleUtil,
    hasRequiredRole,
} from '../utils/roleUtils';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    // Valida JWT
    const validateToken = (token: string): DecodedToken | null => {
        try {
            const decoded = jwtDecode<DecodedToken>(token);

            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                return null;
            }

            return decoded;
        } catch {
            return null;
        }
    };

    // ✅ USA roleUtils - verifica role específico
    const hasRole = (role: UserRoleEnum): boolean => {
        return hasExactRole(user?.roles, role);
    };

    // ✅ USA roleUtils - verifica se tem algum dos roles
    const hasAnyRole = (roles: UserRoleEnum[]): boolean => {
        return hasAnyRoleUtil(user?.roles, roles);
    };

    // ✅ USA roleUtils - verifica hierarquia de roles
    const hasMinimumRole = (minimumRole: UserRoleEnum): boolean => {
        return hasRequiredRole(user?.roles, minimumRole);
    };

    // Buscar dados completos do usuário via /auth/me
    const fetchUserData = async () => {
        try {
            const response = await authEndpoints.me();
            return response.data;
        } catch {
            return null;
        }
    };

    // Inicialização
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('@rpe:token');

            if (token) {
                const decoded = validateToken(token);

                if (decoded) {
                    // Buscar dados completos do usuário
                    const userData = await fetchUserData();

                    if (userData) {
                        const user: User = {
                            id: userData.id,
                            email: userData.email,
                            name: userData.name || 'Usuário',
                            roles: userData.roles || [],
                            isActive: true,
                            createdAt: userData.createdAt,
                            updatedAt: userData.updatedAt,
                        };
                        setUser(user);
                    }
                } else {
                    localStorage.removeItem('@rpe:token');
                    localStorage.removeItem('@rpe:user');
                }
            }

            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async ({ email, password }: LoginRequest) => {
        try {
            setLoading(true);

            const response = await authEndpoints.login({ email, password });
            const { access_token, user: userData } = response.data;

            // Valida o token
            const decoded = validateToken(access_token);
            if (!decoded) {
                throw new Error('Token inválido');
            }

            localStorage.setItem('@rpe:token', access_token);

            // Usa dados do response (que tem name, etc.)
            const user: User = {
                id: userData.id,
                email: userData.email,
                name: userData.name || 'Usuário',
                roles: userData.roles || [],
                isActive: true,
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt,
            };

            setUser(user);
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        localStorage.removeItem('@rpe:token');
        localStorage.removeItem('@rpe:user');
        setUser(null);

        try {
            await authEndpoints.logout();
        } catch {
            console.warn('Erro no logout no servidor');
        }
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('@rpe:token');

        if (token) {
            const decoded = validateToken(token);

            if (decoded) {
                const userData = await fetchUserData();
                if (userData) {
                    const user: User = {
                        id: userData.id,
                        email: userData.email,
                        name: userData.name || 'Usuário',
                        roles: userData.roles || [],
                        isActive: true,
                        createdAt: userData.createdAt,
                        updatedAt: userData.updatedAt,
                    };
                    setUser(user);
                }
            } else {
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
                hasRole,
                hasAnyRole,
                hasMinimumRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
