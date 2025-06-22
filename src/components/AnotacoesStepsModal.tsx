import React from 'react';
import Typography from './Typography';
import Button from './Button';
import { Check, X } from 'lucide-react';

function LoadingSpinner() {
    return (
        <svg
            className="animate-spin h-4 w-4 text-primary-500"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
    );
}

interface Step {
    label: string;
    completed: boolean;
    error?: boolean;
}

interface AnotacoesStepsModalProps {
    open: boolean;
    steps: Step[];
    onCancel: () => void;
    onContinue: () => void;
    canContinue?: boolean;
}

const AnotacoesStepsModal: React.FC<AnotacoesStepsModalProps> = ({
    open,
    steps,
    onCancel,
    onContinue,
    canContinue,
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
                    Processando avaliações
                </Typography>
                <div className="flex flex-col gap-4 mb-8">
                    {steps.map((step, idx) => {
                        const isCurrent =
                            !step.completed &&
                            !step.error &&
                            (idx === 0 || steps[idx - 1].completed);
                        return (
                            <div
                                key={step.label}
                                className="flex items-center gap-3"
                            >
                                <div
                                    className={`w-6 h-6 rounded-full border-1 flex items-center justify-center transition-colors duration-200 ${step.completed ? 'bg-check-color border-check-color' : step.error ? 'bg-red-500 border-red-500 text-white' : 'border-gray-600 text-gray-600'}`}
                                >
                                    {step.completed ? (
                                        <Check
                                            fill="none"
                                            stroke="white"
                                            strokeWidth={2}
                                            size={20}
                                        />
                                    ) : step.error ? (
                                        <X
                                            stroke="white"
                                            strokeWidth={2}
                                            size={20}
                                        />
                                    ) : isCurrent ? (
                                        <LoadingSpinner />
                                    ) : (
                                        idx + 1
                                    )}
                                </div>
                                <span
                                    className={`text-base ${step.completed ? 'text-primary-500' : step.error ? 'font-bold text-red-500' : isCurrent ? 'font-bold text-primary-500' : 'text-primary-500'}`}
                                >
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <Button variant="secondary" size="md" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={onContinue}
                        disabled={!canContinue}
                    >
                        Continuar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AnotacoesStepsModal;
