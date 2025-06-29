import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export default function Modal({
    open,
    onClose,
    children,
    className = '',
}: ModalProps) {
    const [isVisible, setIsVisible] = useState(open);

    useEffect(() => {
        if (!open && isVisible) {
            const timeout = setTimeout(() => setIsVisible(false), 50);
            return () => clearTimeout(timeout);
        }
        if (open && !isVisible) setIsVisible(true);
    }, [open, isVisible]);

    useEffect(() => {
        if (!isVisible) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isVisible, onClose]);

    const handleClose = () => {
        onClose();
    };

    return createPortal(
        <AnimatePresence>
            {open || isVisible ? (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-xs animate-fadeIn"
                    onClick={handleClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className={`bg-white rounded-xl shadow-xl p-6 ${className}`}
                        onClick={e => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>,
        typeof window !== 'undefined' &&
            typeof document !== 'undefined' &&
            document.body
            ? document.body
            : document.createElement('div'),
    );
}
