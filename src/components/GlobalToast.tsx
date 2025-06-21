import React from 'react';
import Toast from './Toast';
import { useToast } from '../hooks/useToast';

const GlobalToast: React.FC = () => {
    const { toast, hideToast } = useToast();

    if (!toast) return null;

    return (
        <Toast
            message={toast.message}
            type={toast.type}
            show={toast.show}
            onClose={hideToast}
        />
    );
};

export default GlobalToast;
