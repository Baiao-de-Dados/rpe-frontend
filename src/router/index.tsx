import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Dashboard, Avaliacao, Evolucao } from '../pages';
import LoginPage from '../pages/LoginPage'; // ← Adicionar sua LoginPage

function ProtectedLayout() {
    const isLoggedIn = true; // ← Testing purposes, will need to change this later

    return isLoggedIn ? <DefaultLayout /> : <Navigate to="/login" replace />;
}

export function Router() {
    const isLoggedIn = true; // Will need to change this later

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Navigate to="/login" replace /> // ← Vai para login
                        )
                    }
                />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<ProtectedLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="avaliacao" element={<Avaliacao />} />
                    <Route path="evolucao" element={<Evolucao />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
