import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import Typography from './Typography';
import Button from './Button';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    show: boolean;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!isVisible) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-check-color" />;
            case 'error':
                return <XCircle className="w-5 h-5 text-error-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-primary-500" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-primary-50 border-check-color/20 shadow-lg';
            case 'error':
                return 'bg-primary-50 border-error-500/20 shadow-lg';
            case 'info':
                return 'bg-primary-50 border-primary-200 shadow-lg';
        }
    };

    return (
        <div
            className={`fixed bottom-4 right-4 z-[9999] max-w-sm w-full transform transition-all duration-300 ease-in-out ${
                isAnimating
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-4 opacity-0 scale-95'
            }`}
        >
            <div
                className={`rounded-xl border-2 p-4 backdrop-blur-sm ${getStyles()}`}
                role="alert"
            >
                <div className="flex items-start">
                    <div className="flex-shrink-0">{getIcon()}</div>
                    <div className="ml-3 w-0 flex-1">
                        <Typography variant="body" className="font-semibold">
                            {message}
                        </Typography>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <Button
                            variant="link"
                            size="sm"
                            onClick={onClose}
                            className="text-neutral-400 hover:text-neutral-600 p-1 hover:bg-neutral-100 rounded"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toast;
