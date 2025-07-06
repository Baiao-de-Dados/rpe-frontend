import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
/* import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; */
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { Router } from './router';
import { AuthProvider } from './contexts/AuthContext';
import { CycleProvider } from './contexts/CycleContext';
import { ToastProvider } from './contexts/ToastContext';
import GlobalToast from './components/GlobalToast';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 30 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: import.meta.env.PROD,
            refetchOnReconnect: 'always',
        },
        mutations: {
            retry: 1,
            networkMode: 'always',
        },
    },
});

const LoadingFallback = () => (
    <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <span className="sr-only">Carregando...</span>
    </div>
);

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NuqsAdapter>
                <BrowserRouter>
                    <Suspense fallback={<LoadingFallback />}>
                        <AuthProvider>
                            <ToastProvider>
                                <CycleProvider>
                                    <Router />
                                    <GlobalToast />
                                </CycleProvider>
                            </ToastProvider>
                        </AuthProvider>
                    </Suspense>
                    {/* {import.meta.env.DEV && (
                        <ReactQueryDevtools initialIsOpen={false} />
                    )} */}
                </BrowserRouter>
            </NuqsAdapter>
        </QueryClientProvider>
    );
}
