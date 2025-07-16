import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { SectionPreloader } from '../Sections/SectionPreloader';
import { committeeEvaluationSections, type CommitteeSectionType } from './CommitteeEvaluationSections';

import { SectionLoadingSpinner } from '../../common/SectionLoadingSpinner';

import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

// Remover imports não usados
import EqualizacaoCard from '../../common/EqualizacaoCard';
import { Controller, useFormContext } from 'react-hook-form';
import type { Collaborator } from '../../../types/collaborator';

// Reutilizando componentes do gestor em modo readonly
const ReadOnlyManagerSelfAssessmentSection = lazy(() =>
    import('./ReadOnlyManagerSelfAssessmentSection').then(module => ({
        default: module.ReadOnlyManagerSelfAssessmentSection,
    })),
);

const Manager360ReceivedSection = lazy(() =>
    import('../SectionsMentor/Manager360ReceivedSection').then(module => ({
        default: module.Manager360ReceivedSection,
    })),
);

const CollaboratorHistorySection = lazy(() =>
    import('../SectionsMentor/CollaboratorHistorySection').then(module => ({
        default: module.CollaboratorHistorySection,
    })),
);


const ManagerMentoringEvaluationSection = lazy(() =>
    import('../SectionsMentor/ManagerMentoringEvaluationSection').then(module => ({
        default: module.ManagerMentoringEvaluationSection,
    })),
);

// Seção de equalização
const EqualizationSection = ({ 
    collaborator, 
    autoEvaluation, 
    managerEvaluation, 
    evaluations360, 
    committeeEqualization,
    onSaveEqualization,
    isReadOnly,
}: { 
    collaborator: Collaborator;
    autoEvaluation: {
        score: number;
        criteria: Array<{
            pilarId: number;
            criterionId: number;
            rating: number;
            justification: string;
        }>;
    } | null;
    managerEvaluation: {
        score: number;
        criteria: Array<{
            pilarId: number;
            criterionId: number;
            rating: number;
            justification: string;
        }>;
    } | null;
    evaluations360: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        rating: number;
        improvements: string;
        strengths: string;
    }>;
    committeeEqualization: {
        finalScore: number;
        comments: string;
        committee: {
            id: number;
            name: string;
            position: string;
        };
        lastUpdated: string;
    } | null;
    onSaveEqualization?: () => void;
    isReadOnly?: boolean;
}) => {
    // ✅ CORREÇÃO: Usar o formulário principal em vez de criar um local
    const { control, setValue, watch, formState: { errors } } = useFormContext();
    
    // Calcular scores reais
    const selfEvalScore = autoEvaluation?.score || 0;
    const managerEvalScore = managerEvaluation?.score || 0;
    
    // Calcular média das avaliações 360
    const postureScore = evaluations360.length > 0 
        ? evaluations360.reduce((sum, evaluation) => sum + evaluation.rating, 0) / evaluations360.length 
        : 0;
    
    const finalScore = committeeEqualization?.finalScore || null;
    const status = committeeEqualization ? 'Finalizado' as const : 'Em andamento' as const;
    // ✅ CORREÇÃO: Resumo deve ficar vazio até ser implementada a geração automática
    const summary = '';

    // ✅ DEBUG: Log dos scores calculados
    console.log('🎯 EqualizationSection: Scores calculados:', {
        selfEvalScore,
        managerEvalScore,
        postureScore,
        finalScore,
        evaluations360Count: evaluations360.length
    });
    
    // ✅ CORREÇÃO: Usar os campos do formulário principal
    const watchedFinalScore = watch('committeeEqualization.finalScore');
    const watchedComments = watch('committeeEqualization.comments');
    
    const onSubmit = () => {
        console.log('🎯 EqualizationSection: Botão Concluir clicado!');
        console.log('🎯 EqualizationSection: Dados do formulário principal:', {
            finalScore: watchedFinalScore,
            comments: watchedComments
        });
        if (onSaveEqualization) {
            onSaveEqualization();
        } else {
            console.warn('⚠️ EqualizationSection: onSaveEqualization não foi passada');
        }
    };
    
    return (
        <Controller
            name="committeeEqualization.finalScore"
            control={control}
            rules={{ required: 'A nota é obrigatória', min: 1, max: 5 }}
            render={({ field }) => (
                <EqualizacaoCard
                    collaboratorName={collaborator.name}
                    position={collaborator.position}
                    status={status}
                    finalScore={finalScore ?? 0}
                    selfEvalScore={selfEvalScore}
                    managerEvalScore={managerEvalScore}
                    postureScore={postureScore}
                    summary={summary}
                    rating={field.value}
                    onChangeRating={field.onChange}
                    ratingError={(errors.committeeEqualization as { finalScore?: { message?: string } })?.finalScore?.message as string}
                    justification={watchedComments}
                    onChangeJustification={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue('committeeEqualization.comments', e.target.value)}
                    justificationError={(errors.committeeEqualization as { comments?: { message?: string } })?.comments?.message as string}
                    editable={true}
                    onSubmit={onSubmit}
                    isReadOnly={isReadOnly}
                />
            )}
        />
    );
};

interface CommitteeSectionRendererProps {
    activeSection: CommitteeSectionType;
    collaborator: Collaborator;
    collaboratorSelfAssessment?: Array<{
        pilarId: number;
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>;
    evaluations360?: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        rating: number;
        improvements: string;
        strengths: string;
    }>;
    referencesReceived?: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        justification: string;
    }>;
    cycleName: string;
    // Novos dados para equalização
    autoEvaluation?: {
        score: number;
        criteria: Array<{
            pilarId: number;
            criterionId: number;
            rating: number;
            justification: string;
        }>;
    } | null;
    managerEvaluation?: {
        score: number;
        criteria: Array<{
            pilarId: number;
            criterionId: number;
            rating: number;
            justification: string;
        }>;
    } | null;
    committeeEqualization?: {
        finalScore: number;
        comments: string;
        committee: {
            id: number;
            name: string;
            position: string;
        };
        lastUpdated: string;
    } | null;
    // ✅ NOVO: Função de submit do formulário principal
    onSaveEqualization?: () => void;
    // ✅ NOVO: Prop para controlar estado de edição
    isReadOnly?: boolean;
    // ✅ NOVO: Callback para quando entrar em modo de edição
    onEnterEditMode?: () => void;
}

export function CommitteeSectionRenderer({ 
    activeSection, 
    collaborator,
    collaboratorSelfAssessment,
    evaluations360 = [],
    cycleName,
    autoEvaluation,
    managerEvaluation,
    committeeEqualization,
    onSaveEqualization,
    isReadOnly,
}: CommitteeSectionRendererProps) {

    const { variants } = useOptimizedAnimation();
    
    const renderSection = () => {
        switch (activeSection) {
            case 'Avaliação':
                console.log('🎯 CommitteeSectionRenderer: Renderizando seção Avaliação', {
                    collaboratorSelfAssessment,
                    managerEvaluation,
                    managerEvaluationData: managerEvaluation?.criteria || []
                });
                console.log('🎯 CommitteeSectionRenderer: Dados completos do manager:', managerEvaluation);
                console.log('🎯 CommitteeSectionRenderer: Score do manager:', managerEvaluation?.score);
                return (
                    <ReadOnlyManagerSelfAssessmentSection 
                        collaboratorSelfAssessment={collaboratorSelfAssessment}
                        managerEvaluationData={managerEvaluation?.criteria || []}
                    />
                );
            case 'Avaliações 360':
                return (
                    <Manager360ReceivedSection 
                        evaluations360={evaluations360.map(evaluation => ({
                            collaratorName: evaluation.collaratorName,
                            collaboratorPosition: evaluation.collaboratorPosition,
                            rating: evaluation.rating,
                            improvements: evaluation.improvements,
                            strengths: evaluation.strengths,
                        }))}
                        cycleName={cycleName || 'Não definido'}
                    />
                );
            case 'Mentoring':
                return (
                    <ManagerMentoringEvaluationSection 
                        collaboratorId={collaborator?.id || 0}
                        collaboratorName={collaborator?.name || 'Colaborador'}
                    />
                );
            case 'Histórico':
                return (
                    <CollaboratorHistorySection 
                        collaboratorId={collaborator?.id || 0}
                        collaboratorName={collaborator?.name || 'Colaborador'}
                    />
                );
            case 'Equalização':
                console.log('🎯 CommitteeSectionRenderer: Renderizando seção Equalização', {
                    autoEvaluation,
                    managerEvaluation,
                    evaluations360,
                    committeeEqualization
                });
                return (
                    <EqualizationSection 
                        collaborator={collaborator}
                        autoEvaluation={autoEvaluation || null}
                        managerEvaluation={managerEvaluation || null}
                        evaluations360={evaluations360}
                        committeeEqualization={committeeEqualization || null}
                        onSaveEqualization={onSaveEqualization}
                        isReadOnly={isReadOnly}
                    />
                );
            default:
                return (
                    <ReadOnlyManagerSelfAssessmentSection 
                        collaboratorSelfAssessment={collaboratorSelfAssessment}
                        managerEvaluationData={managerEvaluation?.criteria || []}
                    />
                );
        }
    };

    return (
        <>
            <SectionPreloader activeSection={activeSection} sections={[...committeeEvaluationSections]} />
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeSection} 
                    variants={variants.evaluationSectionRenderer} 
                    initial="initial" 
                    animate="animate" 
                    exit="exit" 
                    className="min-h-[200px]"
                >
                    <Suspense fallback={<SectionLoadingSpinner />}>
                        {renderSection()}
                    </Suspense>
                </motion.div>
            </AnimatePresence>
        </>
    );
}
