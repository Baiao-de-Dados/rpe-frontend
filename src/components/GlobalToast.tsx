import React from 'react';
import Toast from './Toast';
import { useToast } from '../hooks/useToast';

const GlobalToast: React.FC = () => {
    const { toasts, hideToast } = useToast();

    if (!toasts.length) return null;

    return (
        <div className="fixed bottom-4 right-7 z-[9999] flex flex-col space-y-2 max-w-sm w-full">
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    show={toast.show}
                    title={toast.title}
                    onClose={() => hideToast(toast.id)}
                />
            ))}
        </div>
    );
};

export default GlobalToast;
