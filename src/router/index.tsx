import {
    Routes,
    Route,
    BrowserRouter,
    Navigate,
    Outlet,
} from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';

import LoginPage from '../pages/LoginPage';
import { useAuth } from '../contexts/AuthContext';
import { Dashboard, Evolucao, Avaliacao2 } from '../pages';

// Componente de carregamento
function LoadingScreen() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
}

function PrivateRoute() {
    const { isAuthenticated, loading } = useAuth();

    // Mostra tela de carregamento enquanto verifica autenticação
    if (loading) {
        return <LoadingScreen />;
    }

    // Redireciona para login se não estiver autenticado
    if (!isAuthenticated) {
        console.log('Redirecionando para login - usuário não autenticado');
        return <Navigate to="/login" replace />;
    }

    // Permite acesso à rota protegida
    return <Outlet />;
}

export function Router() {
    const { isAuthenticated, loading } = useAuth();

    // Mostra tela de carregamento enquanto verifica autenticação
    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
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
                <Route element={<PrivateRoute />}>
                    <Route element={<DefaultLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/avaliacao" element={<Avaliacao2 />} />
                        <Route path="/evolucao" element={<Evolucao />} />
                    </Route>
                </Route>

                {/* Rota para caminhos não encontrados */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
