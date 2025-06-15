import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';

function ProtectedLayout() {
    const isLoggedIn = true; // Altere para true/false para testar

    return isLoggedIn ? <DefaultLayout /> : <Navigate to="/login" replace />;
}

export function Router() {
    const isLoggedIn = true;

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="/login" element={<h1>Login</h1>} />
                <Route path="/" element={<ProtectedLayout />}>
                    <Route path="dashboard" element={<h1>Dashboard</h1>} />
                    <Route
                        path="avaliacao"
                        element={<h1>Avaliação de ciclo</h1>}
                    />
                    <Route path="evolucao" element={<h1>Evolução</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
