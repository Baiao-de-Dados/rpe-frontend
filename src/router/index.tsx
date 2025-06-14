import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>Hello World</h1>} />
                <Route path="/dashboard" element={<DefaultLayout />}>
                    <Route path="inicio" element={<h1>Início</h1>} />
                    <Route path="produtos" element={<h1>Produtos</h1>} />
                    <Route
                        path="abastecimento"
                        element={<h1>Abastecimento</h1>}
                    />
                    <Route
                        path="funcionarios"
                        element={<h1>Funcionários</h1>}
                    />
                    <Route path="clientes" element={<h1>Clientes</h1>} />
                    <Route path="compras" element={<h1>Compras</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
