import { useAuth } from '../hooks/useAuth';

import { UserRoleEnum } from '../types/auth';

import { DefaultLayout } from '../layouts/DefaultLayout';

import { Routes, Route, Navigate } from 'react-router-dom';

import { MultiRoleRoute } from './MultiRoleRoute';
import { ProtectedRoute, RoleRoute } from './ProtectedRoute';

import LoadingSpinner from '../components/RouterLoadingSpinner';

import LoginPage from '../pages/LoginPage';
import { Dashboard } from '../pages/Dashboard/index';
import { Lideranca } from '../pages/Gestor/Lideranca';
import { Colaboradores } from '../pages/Colaboradores';
import Anotacoes from '../pages/Colaborador/Anotacoes';
import { Evolucao } from '../pages/Colaborador/Evolucao';
import { Configuracoes } from '../pages/RH/Configuracoes';
import { Avaliacao } from '../pages/Colaborador/Avaliacao';
import { ImportarHistoricos } from '../pages/RH/ImportarHistoricos';
import { ColaboradorAvaliacao } from '../pages/Colaborador/AvaliacaoMentor';

export function Router() {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<DefaultLayout />}>

                    <Route index element={<Navigate to="dashboard" replace />} />

                    <Route path="dashboard" 
                        element={
                            <Dashboard />
                        } 
                    />

                    <Route path="avaliacao" 
                        element={
                            <RoleRoute requiredRoles={[
                                    UserRoleEnum.RH,
                                    UserRoleEnum.COMMITTEE,
                                    UserRoleEnum.ADMIN,
                                    UserRoleEnum.DEVELOPER,
                            ]}>
                                <Avaliacao />
                            </RoleRoute>
                        } 
                    />

                    <Route path="evolucao"
                        element={
                            <RoleRoute requiredRoles={[
                                    UserRoleEnum.RH,
                                    UserRoleEnum.COMMITTEE,
                                    UserRoleEnum.ADMIN,
                                    UserRoleEnum.DEVELOPER,
                            ]}>
                                <Evolucao />
                            </RoleRoute>
                        }
                    />

                    <Route path="colaboradores"
                        element={
                            <RoleRoute requiredRoles={[
                                    UserRoleEnum.RH,
                                    UserRoleEnum.MENTOR,
                                    UserRoleEnum.ADMIN,
                                    UserRoleEnum.DEVELOPER,
                            ]}>
                                <Colaboradores />
                            </RoleRoute>
                        }
                    />

                    <Route path="colaboradores/:collaboratorId/avaliacao"
                        element={
                            <RoleRoute requiredRoles={[
                                    UserRoleEnum.MENTOR,
                                    UserRoleEnum.RH,
                                    UserRoleEnum.ADMIN,
                                    UserRoleEnum.DEVELOPER,
                            ]}>
                                <ColaboradorAvaliacao />
                            </RoleRoute>
                        }
                    />

                    <Route path="anotacoes" 
                        element={
                            <RoleRoute requiredRoles={[
                                    UserRoleEnum.MENTOR,
                                    UserRoleEnum.RH,
                                    UserRoleEnum.ADMIN,
                                    UserRoleEnum.DEVELOPER,
                            ]}>
                                <Anotacoes />
                            </RoleRoute>
                    } 
                    />

                    <Route path="configuracoes"
                        element={
                            <RoleRoute requiredRoles={[
                                UserRoleEnum.RH, 
                                UserRoleEnum.ADMIN
                            ]}>
                                <Configuracoes />
                            </RoleRoute>
                        }
                    />

                    <Route path="importar"
                        element={
                            <RoleRoute requiredRoles={[
                                UserRoleEnum.RH, 
                                UserRoleEnum.ADMIN
                            ]}>
                                <ImportarHistoricos />
                            </RoleRoute>
                        }
                    />

                    <Route path="administracao"
                        element={
                            <RoleRoute requiredRoles={[
                                UserRoleEnum.RH, 
                                UserRoleEnum.ADMIN
                            ]}>
                                <div className="p-6">
                                    <h1 className="text-2xl font-bold">Painel de Administração</h1>
                                    <p>Esta página só é acessível para RH, Comitê, Admin e Desenvolvedor</p>
                                </div>
                            </RoleRoute>
                        }
                    />

                    <Route path="dev"
                        element={
                            <RoleRoute redirectTo="/dashboard" 
                            requiredRoles={[
                                UserRoleEnum.DEVELOPER, 
                                UserRoleEnum.ADMIN
                            ]}>
                                <div className="p-6">
                                    <h1 className="text-2xl font-bold">Ferramentas de Desenvolvimento</h1>
                                    <p>Esta página só é acessível para desenvolvedores</p>
                                </div>
                            </RoleRoute>
                        }
                    />

                    <Route path="lideranca"
                        element={
                            <MultiRoleRoute redirectTo="/dashboard" allowedRoles={[
                                UserRoleEnum.MENTOR, 
                                UserRoleEnum.LEADER, 
                                UserRoleEnum.MANAGER, 
                                UserRoleEnum.ADMIN,
                                UserRoleEnum.RH
                            ]}>
                                <Lideranca />
                            </MultiRoleRoute>
                        }
                    />

                </Route>
            </Route>
            <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
        </Routes>
    );

}
