import React from 'react';
import Typography from './Typography';
import Button from './Button';

interface AnotacoesModalProps {
    open: boolean;
    title: string;
    onCancel: () => void;
    onContinue: () => void;
}

const AnotacoesModal: React.FC<AnotacoesModalProps> = ({
    open,
    title,
    onCancel,
    onContinue,
}) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
            <div
                className={`bg-white rounded-lg shadow-lg p-8 min-w-[320px] max-w-[90vw] transition-transform duration-300 ${open ? 'scale-100' : 'scale-95'}`}
            >
                <Typography
                    variant="h2"
                    className="mb-6 text-xl font-semibold text-center"
                >
                    {title}
                </Typography>
                <div className="flex justify-end gap-3 mt-8">
                    <Button variant="secondary" size="md" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button variant="primary" size="md" onClick={onContinue}>
                        Continuar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AnotacoesModal;
