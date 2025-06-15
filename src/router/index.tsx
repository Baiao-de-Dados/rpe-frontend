import {
    Routes,
    Route,
    BrowserRouter,
    Navigate,
    Outlet,
} from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Dashboard, Avaliacao, Evolucao } from '../pages';
import LoginPage from '../pages/LoginPage';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export function Router() {
    const { isAuthenticated } = useAuth();

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
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="avaliacao" element={<Avaliacao />} />
                        <Route path="evolucao" element={<Evolucao />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
