import { Check, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Modal from "../common/Modal";
import Button from '../common/Button';
import Typography from '../common/Typography';

import LoadingSpinner from './StepsLoadingSpinner';

import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

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
    wasAborted?: boolean;
}

function AnotacoesStepsModal({ open, steps, onCancel, onContinue, canContinue, avaliacaoSections = [], wasAborted = false }: AnotacoesStepsModalProps) {

    const hasInsightError = open && steps[1]?.error;
    const hasConnectionError = open && steps[0]?.error && !wasAborted;

    const { variants } = useOptimizedAnimation();

    return (
        <Modal open={open} onClose={onCancel} className="min-w-[600px] max-w-[800px] h-[540px] flex flex-col">
            <div className="flex flex-col h-full">
                <Typography variant="h2" className="mb-6 text-xl font-semibold">
                    Processando avaliações
                </Typography>
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-4 border-b border-gray-200 pb-8">
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
                                            <Check fill="none" stroke="white" strokeWidth={2} size={20} />
                                        ) : step.error ? (
                                            <X stroke="white" strokeWidth={2} size={20} />
                                        ) : isCurrent ? (
                                            <LoadingSpinner />
                                        ) : (
                                            idx + 1
                                        )
                                    }
                                    </div>
                                    <span className={ `text-base transition-[color,font-weight] duration-300 ease-in-out ` + (
                                        step.completed ? 'text-primary-500 font-normal' : 
                                        step.error ? 'font-bold text-red-500' : 
                                        isCurrent ? 'font-bold text-primary-500' : 
                                        'text-primary-500 font-normal'
                                    )}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mb-6 mt-6 min-h-[70px] flex flex-col justify-center items-center">
                        <div className="w-full max-w-120 h-40 flex items-center justify-center">
                            {hasConnectionError && (
                                <div className="w-full flex flex-col items-center justify-center">
                                    <Typography variant="h2" className="text-base font-bolder text-red-600 mb-1 text-center">
                                        Erro ao se conectar com a IA
                                    </Typography>
                                    <Typography variant="body" className="text-2 text-gray-700 text-center">
                                        Não foi possível se conectar ao serviço
                                        de avaliação automática. Tente novamente
                                        em instantes.
                                    </Typography>
                                </div>
                            )}
                            {!hasConnectionError && hasInsightError && (
                                <div className="w-full flex flex-col items-center justify-center">
                                    <Typography variant="h2" className="text-base font-bolder text-red-600 mb-1 text-center">
                                        Não há informações suficientes para
                                        gerar uma avaliação
                                    </Typography>
                                    <Typography variant="body" className="text-2 text-gray-700 text-center">
                                        Escreva mais detalhes para que a IA
                                        possa gerar uma avaliação personalizada.
                                    </Typography>
                                </div>
                            )}
                            {!hasConnectionError && !hasInsightError && avaliacaoSections.length === 0 && (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
                                </div>
                            )}
                        </div>
                        <div className="w-full -mt-40 min-h-[30px] flex flex-col justify-center">
                            {avaliacaoSections.length > 0 && (
                                <>
                                    <AnimatePresence>
                                        <motion.div variants={variants.avaliacaoSectionTitle} initial="initial" animate="animate" exit="exit">
                                            <Typography variant="h3" className="mb-2 text-lg font-semibold text-primary-500">
                                                Seções avaliadas:
                                            </Typography>
                                        </motion.div>
                                    </AnimatePresence>
                                    <ul className="list-disc pl-6 overflow-x-hidden">
                                        <AnimatePresence>
                                            {avaliacaoSections.map(
                                                (section, idx) => (
                                                    <motion.li key={section} variants={variants.avaliacaoSectionItem(idx)} initial="initial" animate="animate" exit="exit" className="text-base text-primary-500">
                                                        {section}
                                                    </motion.li>
                                                ),
                                            )}
                                        </AnimatePresence>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-auto">
                    <Button variant="secondary" size="md" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button variant="primary" size="md" onClick={onContinue} disabled={!canContinue}>
                        Continuar
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default AnotacoesStepsModal;
