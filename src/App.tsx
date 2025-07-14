import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Router } from './router';

import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

import GlobalToast from './components/GlobalToast';
import LoadingSpinner from './components/RouterLoadingSpinner';

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

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NuqsAdapter>
                <BrowserRouter>
                    <Suspense fallback={<LoadingSpinner />}>
                        <AuthProvider>
                            <ToastProvider>
                                    <Router />
                                    <GlobalToast />
                            </ToastProvider>
                        </AuthProvider>
                    </Suspense>
                </BrowserRouter>
            </NuqsAdapter>
        </QueryClientProvider>
    );
}
