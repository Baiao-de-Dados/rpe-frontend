// src/utils/roleUtils.ts
import { UserRoleEnum, ROLE_HIERARCHY } from '../types/auth';

/**
 * Obtém a role de maior hierarquia do usuário
 */
export const getHighestRole = (
    roles: UserRoleEnum[],
): UserRoleEnum | undefined => {
    if (!roles || roles.length === 0) return undefined;

    return roles.reduce((highest, current) => {
        if (!highest) return current;
        return ROLE_HIERARCHY[current] > ROLE_HIERARCHY[highest]
            ? current
            : highest;
    });
};

/**
 * Verifica se o usuário tem pelo menos o papel necessário
 */
export const hasRequiredRole = (
    userRoles: UserRoleEnum[] | undefined,
    requiredRole: UserRoleEnum,
): boolean => {
    if (!userRoles || userRoles.length === 0) return false;

    const highestRole = getHighestRole(userRoles);
    if (!highestRole) return false;

    return ROLE_HIERARCHY[highestRole] >= ROLE_HIERARCHY[requiredRole];
};

/**
 * Retorna o nome do papel formatado para exibição
 */
export const formatRoleName = (role: UserRoleEnum | undefined): string => {
    if (!role) return 'Desconhecido';

    const roleDisplay = {
        [UserRoleEnum.DEVELOPER]: 'Desenvolvedor',
        [UserRoleEnum.ADMIN]: 'Administrador',
        [UserRoleEnum.COMMITTEE]: 'Comitê',
        [UserRoleEnum.RH]: 'Recursos Humanos',
        [UserRoleEnum.MANAGER]: 'Gestor',
        [UserRoleEnum.LEADER]: 'Líder',
        [UserRoleEnum.MENTOR]: 'Mentor',
        [UserRoleEnum.EMPLOYER]: 'Colaborador',
    };

    return roleDisplay[role] || 'Desconhecido';
};

/**
 * Verifica se o usuário tem um papel específico
 */
export const hasExactRole = (
    userRoles: UserRoleEnum[] | undefined,
    roleToCheck: UserRoleEnum,
): boolean => {
    if (!userRoles) return false;
    return userRoles.includes(roleToCheck);
};

/**
 * Verifica se o usuário tem pelo menos um dos papéis necessários
 */
export const hasAnyRole = (
    userRoles: UserRoleEnum[] | undefined,
    requiredRoles: UserRoleEnum[],
): boolean => {
    if (!userRoles) return false;
    return requiredRoles.some(role => hasExactRole(userRoles, role));
};

/**
 * Retorna todas as roles formatadas para exibição
 */
export const formatAllRoles = (roles: UserRoleEnum[]): string => {
    if (!roles || roles.length === 0) return 'Nenhuma role';
    return roles.map(role => formatRoleName(role)).join(', ');
};
