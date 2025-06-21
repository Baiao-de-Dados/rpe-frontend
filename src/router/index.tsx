// src/router/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';

import LoginPage from '../pages/LoginPage';
import { useAuth } from '../hooks/useAuth';
import { ProtectedRoute, RoleRoute } from '../components/ProtectedRoute';
import { MultiRoleRoute } from '../components/MultiRoleRoute';
import { UserRoleEnum } from '../types/auth';
import { Dashboard, Evolucao, Avaliacao } from '../pages/';

// Spinner enquanto o estado de auth é carregado

export function Router() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {/* Login: se já estiver autenticado, manda direto pro dashboard */}
            <Route
                path="/login"
                element={
                    isAuthenticated ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <LoginPage />
                    )
                }
            />

            {/* Roteamento protegido */}
            <Route element={<ProtectedRoute />}>
                <Route element={<DefaultLayout />}>
                    {/* redireciona / para /dashboard */}
                    <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                    />

                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="avaliacao" element={<Avaliacao />} />

                    <Route
                        path="evolucao"
                        element={
                            <RoleRoute requiredRole={UserRoleEnum.MANAGER}>
                                <Evolucao />
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="administracao"
                        element={
                            <RoleRoute requiredRole={UserRoleEnum.RH}>
                                <div className="p-6">
                                    <h1 className="text-2xl font-bold">
                                        Painel de Administração
                                    </h1>
                                    <p>
                                        Esta página só é acessível para RH,
                                        Comitê, Admin e Desenvolvedor
                                    </p>
                                </div>
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="dev"
                        element={
                            <RoleRoute
                                requiredRole={UserRoleEnum.DEVELOPER}
                                redirectTo="/dashboard"
                            >
                                <div className="p-6">
                                    <h1 className="text-2xl font-bold">
                                        Ferramentas de Desenvolvimento
                                    </h1>
                                    <p>
                                        Esta página só é acessível para
                                        desenvolvedores
                                    </p>
                                </div>
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="mentoria"
                        element={
                            <MultiRoleRoute
                                allowedRoles={[
                                    UserRoleEnum.MENTOR,
                                    UserRoleEnum.LEADER,
                                    UserRoleEnum.MANAGER,
                                ]}
                                redirectTo="/dashboard"
                            >
                                <div className="p-6">
                                    <h1 className="text-2xl font-bold">
                                        Mentoria
                                    </h1>
                                    <p>
                                        Esta página é acessível para mentores,
                                        líderes e gestores
                                    </p>
                                </div>
                            </MultiRoleRoute>
                        }
                    />
                </Route>
            </Route>

            {/* Catch-all: qualquer rota não encontrada redireciona para login ou dashboard */}
            <Route
                path="*"
                element={
                    <Navigate
                        to={isAuthenticated ? '/dashboard' : '/login'}
                        replace
                    />
                }
            />
        </Routes>
    );
}
