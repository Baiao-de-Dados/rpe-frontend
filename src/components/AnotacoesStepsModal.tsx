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
    avaliacaoSections?: string[];
}

const AnotacoesStepsModal: React.FC<AnotacoesStepsModalProps> = ({
    open,
    steps,
    onCancel,
    onContinue,
    canContinue,
    avaliacaoSections = [],
}) => {
    // Detecta se há erro na step 2 (Gerando avaliações)
    const hasInsightError = steps[1]?.error;
    const hasConnectionError = steps[0]?.error;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
            <div
                className={`bg-white rounded-lg shadow-lg p-10 min-w-[600px] max-w-[800px] min-h-[520px] flex flex-col transition-transform duration-300 ${open ? 'scale-100' : 'scale-95'}`}
                style={{ maxHeight: '90vh' }}
            >
                <Typography variant="h2" className="mb-6 text-xl font-semibold">
                    Processando avaliações
                </Typography>
                <div className="flex-1 flex flex-col overflow-y-auto">
                    <div className="flex flex-col gap-4 border-b border-gray-200 pb-8">
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
                    <div className="mb-6 mt-6 min-h-[70px] flex flex-col justify-center items-center">
                        <div className="w-full max-w-120 min-h-[40px] flex items-center justify-center">
                            {hasConnectionError && (
                                <div className="w-full flex flex-col items-center justify-center">
                                    <Typography
                                        variant="h2"
                                        className="text-base font-bolder text-red-600 mb-1 text-center"
                                    >
                                        Erro ao se conectar com a IA
                                    </Typography>
                                    <Typography
                                        variant="body"
                                        className="text-2 text-gray-700 text-center"
                                    >
                                        Não foi possível se conectar ao serviço
                                        de avaliação automática. Tente novamente
                                        em instantes.
                                    </Typography>
                                </div>
                            )}
                            {!hasConnectionError && hasInsightError && (
                                <div className="w-full flex flex-col items-center justify-center">
                                    <Typography
                                        variant="h2"
                                        className="text-base font-bolder text-red-600 mb-1 text-center"
                                    >
                                        Não há informações suficientes para
                                        gerar uma avaliação
                                    </Typography>
                                    <Typography
                                        variant="body"
                                        className="text-2 text-gray-700 text-center"
                                    >
                                        Escreva mais detalhes para que a IA
                                        possa gerar uma avaliação personalizada.
                                    </Typography>
                                </div>
                            )}
                        </div>
                        <div className="w-full min-h-[30px] flex flex-col justify-center">
                            {avaliacaoSections.length > 0 && (
                                <>
                                    <Typography
                                        variant="h3"
                                        className="mb-2 text-lg font-semibold text-primary-500"
                                    >
                                        Seções avaliadas:
                                    </Typography>
                                    <ul className="list-disc pl-6">
                                        {avaliacaoSections.map(section => (
                                            <li
                                                key={section}
                                                className="text-base text-primary-500"
                                            >
                                                {section}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className="sticky bottom-0 left-0 right-0 bg-white pt-4 flex justify-end gap-3 mt-8"
                    style={{ zIndex: 10 }}
                >
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
