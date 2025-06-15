import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Dashboard, Avaliacao, Evolucao } from '../pages';

function ProtectedLayout() {
    const isLoggedIn = true;

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
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="avaliacao" element={<Avaliacao />} />
                    <Route path="evolucao" element={<Evolucao />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
