import { Router } from './router';
import { AuthProvider } from './contexts/AuthContext';
import { CycleProvider } from './contexts/CycleContext';
import { ToastProvider } from './contexts/ToastContext';
import GlobalToast from './components/GlobalToast';

function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <CycleProvider>
                    <Router />
                    <GlobalToast />
                </CycleProvider>
            </ToastProvider>
        </AuthProvider>
    );
}

export default App;
