import Typography from '../common/Typography';
import Button from '../common/Button';
import Modal from "../common/Modal";
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

import LoadingSpinner from './StepsLoadingSpinner';

interface Step {
    label: string;
    completed: boolean;
    error?: boolean;
}

interface AnotacoesStepsModalProps {
    open: boolean;
    steps: Step[];
    error?: string;
    written?: string;
    applicable?: string[];
    onCancel: () => void;
    onClose?: () => void;
    onContinue?: () => void;
    canContinue?: boolean;
    avaliacaoSections?: string[];
    wasAborted?: boolean;
    title?: string;
    isEqualization?: boolean;
}

function AnotacoesStepsModal({ 
    open, 
    steps, 
    error, 
    written, 
    applicable, 
    onCancel, 
    onClose, 
    onContinue, 
    canContinue, 
    avaliacaoSections = [], 
    wasAborted = false,
    title = "Processando avaliações",
    isEqualization = false
}: AnotacoesStepsModalProps) {

    const hasInsightError = open && steps[1]?.error;
    const hasConnectionError = open && steps[0]?.error && !wasAborted;
    const hasNoIdentificationError = open && written && applicable && steps[1]?.error;

    const handleModalClose = onClose || onCancel;

    return (
        <Modal open={open} onClose={handleModalClose} className="w-full h-full sm:min-w-[600px] sm:max-w-[800px] sm:h-[540px] sm:max-h-[540px] flex flex-col sm:rounded-lg">
            <div className="flex flex-col h-full p-4 sm:p-6">
                <Typography variant="h2" className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-center sm:text-left">
                    {title}
                </Typography>
                <div className="flex-1 overflow-y-auto sm:overflow-y-visible">
                    <div className="flex flex-col gap-3 sm:gap-4 border-b border-gray-200 pb-4 sm:pb-8">
                        { steps.map((step, idx) => { 
                            const isCurrent = !step.completed && !step.error && (idx === 0 || steps[idx - 1].completed);
                            return (
                                <div key={step.label} className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full border-1 flex items-center justify-center transition-colors duration-200 
                                    ${  step.completed ? 'bg-check-color border-check-color' : 
                                        step.error ? 'bg-red-500 border-red-500 text-white' : 'border-gray-600 text-gray-600'
                                    }`}>
                                    {
                                            step.completed ? (
                                            <CheckCircle fill="none" stroke="white" strokeWidth={2} size={20} />
                                        ) : step.error ? (
                                            <XCircle stroke="white" strokeWidth={2} size={20} />
                                        ) : isCurrent ? (
                                            <LoadingSpinner />
                                        ) : (
                                            idx + 1
                                        )
                                    }
                                    </div>
                                    <Typography variant="body" className={`text-sm sm:text-base ${step.completed ? 'text-gray-900' : step.error ? 'text-red-600' : 'text-gray-600'}`}>
                                        {step.label}
                                    </Typography>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                        {(() => {
                            if (error && !hasConnectionError && !hasInsightError && !hasNoIdentificationError) {
                                return (
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <Typography variant="h2" className="text-base font-bolder text-red-600 mb-1 text-center">
                                            Erro na geração
                                        </Typography>
                                        <Typography variant="body" className="text-2 text-gray-700 text-center">
                                            {error}
                                        </Typography>
                                    </div>
                                );
                            }
                            if (hasConnectionError) {
                                return (
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <Typography variant="h2" className="text-base font-bolder text-red-600 mb-1 text-center">
                                            Erro de conexão
                                        </Typography>
                                        <Typography variant="body" className="text-2 text-gray-700 text-center">
                                            Verifique sua conexão com a internet e tente novamente.
                                        </Typography>
                                    </div>
                                );
                            }
                            if (hasInsightError) {
                                return (
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <Typography variant="h2" className="text-base font-bolder text-red-600 mb-1 text-center">
                                            {isEqualization ? 'Não há informações suficientes para gerar um resumo' : 'Não há informações suficientes para gerar uma avaliação'}
                                        </Typography>
                                        <Typography variant="body" className="text-2 text-gray-700 text-center">
                                            {isEqualization 
                                                ? 'Verifique se o colaborador possui avaliações suficientes para gerar um resumo.'
                                                : 'Escreva mais detalhes para que a IA possa gerar uma avaliação personalizada.'
                                            }
                                        </Typography>
                                    </div>
                                );
                            }
                            if (!error && avaliacaoSections.length === 0) {
                                return (
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
                                    </div>
                                );
                            }
                            return null;
                        })()}
                    </div>
                </div>
                
                <div className="flex gap-3 pt-4 sm:pt-6">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        className="flex-1"
                    >
                        Cancelar
                    </Button>
                    {canContinue && onContinue && (
                        <Button
                            variant="primary"
                            onClick={onContinue}
                            className="flex-1"
                        >
                            Continuar
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default AnotacoesStepsModal;
