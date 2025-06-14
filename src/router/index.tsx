import { Routes, Route, BrowserRouter } from 'react-router-dom';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>Hello World</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
