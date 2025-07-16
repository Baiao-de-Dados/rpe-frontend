import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import Typography from './Typography';
import Button from './Button';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    show: boolean;
    title?: string;
    onClose: () => void;
    isMobile?: boolean;
}

const Toast: React.FC<ToastProps> = ({
    message,
    type,
    show,
    title,
    onClose,
    isMobile = false,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    console.log('Toast rendered:', { message, type, show, title });

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
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
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
            case 'warning':
                return 'bg-primary-50 border-yellow-200 shadow-lg';
        }
    };

    return (
        <div
            className={`w-full transform transition-all duration-300 ease-in-out ${
                isAnimating
                    ? 'translate-y-0 opacity-100 scale-100'
                    : isMobile
                    ? 'translate-y-8 opacity-0 scale-95'
                    : 'translate-y-4 opacity-0 scale-95'
            }`}
        >
            <div
                className={`rounded-xl border-2 p-4 backdrop-blur-sm ${getStyles()}`}
                role="alert"
            >
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">{getIcon()}</div>
                            {title && (
                                <Typography
                                    variant="body"
                                    className="font-bold ml-2"
                                >
                                    {title}
                                </Typography>
                            )}
                        </div>
                        <Button
                            variant="link"
                            size="sm"
                            onClick={onClose}
                            className="text-neutral-400 hover:text-neutral-600 p-1 hover:bg-neutral-100 rounded"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="mt-2">
                        <Typography
                            variant="body"
                            className={title ? 'font-normal' : 'font-semibold'}
                        >
                            {message}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toast;
