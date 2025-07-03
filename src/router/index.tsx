// src/router/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';

import LoginPage from '../pages/LoginPage';
import { useAuth } from '../hooks/useAuth';
import { ProtectedRoute, RoleRoute } from './ProtectedRoute';
import { MultiRoleRoute } from './MultiRoleRoute';
import { UserRoleEnum } from '../types/auth';
import { Dashboard } from '../pages/Dashboard/index';
import { Colaboradores } from '../pages/Colaboradores';
import { Configuracoes } from '../pages/RH/Configuracoes';
import { ImportarHistoricos } from '../pages/RH/ImportarHistoricos';
import { Avaliacao } from '../pages/Colaborador/Avaliacao';
import { Evolucao } from '../pages/Colaborador/Evolucao';

// Spinner enquanto o estado de auth é carregado
const LoadingSpinner = () => (
    <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <span className="sr-only">Carregando...</span>
    </div>
);

export function Router() {
    const { isAuthenticated, loading } = useAuth();

    // Mostrar loading enquanto verifica o estado de autenticação
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Routes>
            {/* Login: se já estiver autenticado, manda direto pro dashboard */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />

            {/* Roteamento protegido */}
            <Route element={<ProtectedRoute />}>
                <Route element={<DefaultLayout />}>
                    {/* redireciona / para /dashboard */}
                    <Route index element={<Navigate to="dashboard" replace />} />

                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="avaliacao" element={<Avaliacao />} />

                    <Route
                        path="evolucao"
                        element={
                            <RoleRoute
                                requiredRoles={[
                                    UserRoleEnum.RH,
                                    UserRoleEnum.COMMITTEE,
                                    UserRoleEnum.ADMIN,
                                    UserRoleEnum.DEVELOPER,
                                ]}
                            >
                                <Evolucao />
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="colaboradores"
                        element={
                            <RoleRoute
                                requiredRoles={[
                                    UserRoleEnum.RH,
                                    UserRoleEnum.MENTOR,
                                    UserRoleEnum.ADMIN,
                                    UserRoleEnum.DEVELOPER,
                                ]}
                            >
                                <Colaboradores />
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="configuracoes"
                        element={
                            <RoleRoute requiredRoles={[UserRoleEnum.RH]}>
                                <Configuracoes />
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="importar"
                        element={
                            <RoleRoute requiredRoles={[UserRoleEnum.RH]}>
                                <ImportarHistoricos />
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="administracao"
                        element={
                            <RoleRoute requiredRoles={[UserRoleEnum.RH]}>
                                <div className="p-6">
                                    <h1 className="text-2xl font-bold">Painel de Administração</h1>
                                    <p>Esta página só é acessível para RH, Comitê, Admin e Desenvolvedor</p>
                                </div>
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="dev"
                        element={
                            <RoleRoute requiredRoles={[UserRoleEnum.DEVELOPER]} redirectTo="/dashboard">
                                <div className="p-6">
                                    <h1 className="text-2xl font-bold">Ferramentas de Desenvolvimento</h1>
                                    <p>Esta página só é acessível para desenvolvedores</p>
                                </div>
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="mentoria"
                        element={
                            <MultiRoleRoute allowedRoles={[UserRoleEnum.MENTOR, UserRoleEnum.LEADER, UserRoleEnum.MANAGER]} redirectTo="/dashboard">
                                <div className="p-6">
                                    <h1 className="text-2xl font-bold">Mentoria</h1>
                                    <p>Esta página é acessível para mentores, líderes e gestores</p>
                                </div>
                            </MultiRoleRoute>
                        }
                    />
                </Route>
            </Route>

            {/* Catch-all: qualquer rota não encontrada redireciona para login ou dashboard */}
            <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
        </Routes>
    );
}
