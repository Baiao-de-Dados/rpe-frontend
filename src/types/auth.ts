// src/types/auth.ts
export const UserRoleEnum = {
    EMPLOYER: 'EMPLOYER',
    MENTOR: 'MENTOR',
    LEADER: 'LEADER',
    MANAGER: 'MANAGER',
    RH: 'RH',
    COMMITTEE: 'COMMITTEE',
    ADMIN: 'ADMIN',
    DEVELOPER: 'DEVELOPER',
} as const;

export type UserRoleEnum = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export const ROLE_HIERARCHY: Record<UserRoleEnum, number> = {
    [UserRoleEnum.EMPLOYER]: 1,
    [UserRoleEnum.MENTOR]: 2,
    [UserRoleEnum.LEADER]: 3,
    [UserRoleEnum.MANAGER]: 4,
    [UserRoleEnum.RH]: 5,
    [UserRoleEnum.COMMITTEE]: 6,
    [UserRoleEnum.ADMIN]: 7,
    [UserRoleEnum.DEVELOPER]: 8,
};

export interface User {
    id: number; // Backend retorna number, não string
    name: string;
    email: string;
    roles: UserRoleEnum[]; // Múltiplas roles, não role única
    department?: string;
    position?: string;
    avatar?: string;
    isActive?: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface DecodedToken {
    sub: number;
    email: string;
    roles?: UserRoleEnum[]; // Opcional como no seu backend
    iat?: number;
    exp?: number;
}

export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface UserFromJwt {
    id: number;
    email: string;
    name: string | null;
    roles: UserRoleEnum[];
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginResponse {
    user: User;
    access_token: string; // Backend usa access_token, não accessToken
    refreshToken?: string;
    expiresIn?: number;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    permissions?: string[];
}

export interface AuthError {
    type: string;
    message: string;
    statusCode?: number;
}

export type LoginPayload = {
    email: string;
    password: string;
};
