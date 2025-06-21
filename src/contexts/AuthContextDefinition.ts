import { createContext } from 'react';
import type { User, LoginRequest } from '../types/auth';

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);
