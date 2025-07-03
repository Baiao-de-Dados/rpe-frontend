import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export default function Modal({ open, onClose, children, className = '' }: ModalProps) {

    const { variants } = useOptimizedAnimation();

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
                <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-xs animate-fadeIn" onClick={handleClose} variants={variants.modalBackdrop} initial="initial" animate="animate" exit="exit">
                    <motion.div className={`bg-white rounded-xl shadow-xl p-6 ${className}`} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" variants={variants.modalContainer} initial="initial" animate="animate" exit="exit">
                        {children}
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>,
        typeof window !== 'undefined' && typeof document !== 'undefined' && 
        document.body ? document.body : document.createElement('div')
    );
}