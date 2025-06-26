import { createContext } from 'react';
import type { User, LoginRequest, UserRoleEnum } from '../types/auth';

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;

    // Sistema baseado apenas em ROLES
    hasRole: (role: UserRoleEnum) => boolean; // Verifica role específico
    hasAnyRole: (roles: UserRoleEnum[]) => boolean; // Verifica se tem algum dos roles
    hasMinimumRole: (minimumRole: UserRoleEnum) => boolean; // Verifica hierarquia
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);
