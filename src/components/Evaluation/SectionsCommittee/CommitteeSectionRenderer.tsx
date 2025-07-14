import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { SectionPreloader } from '../Sections/SectionPreloader';
import { committeeEvaluationSections, type CommitteeSectionType } from './CommitteeEvaluationSections';

import { SectionLoadingSpinner } from '../../common/SectionLoadingSpinner';

import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

// Remover imports não usados
import EqualizacaoCard from '../../common/EqualizacaoCard';
import { useForm, Controller } from 'react-hook-form';
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
const EqualizationSection = ({ collaborator }: { collaborator: Collaborator }) => {
    // Mock de dados de avaliação (substitua pelos dados reais do colaborador)
    const scores: {
        selfEvalScore: number;
        managerEvalScore: number;
        postureScore: number;
        finalScore: number | null;
        status: 'Finalizado' | 'Em andamento';
        summary: string;
    } = {
        selfEvalScore: 4.0,
        managerEvalScore: 4.2,
        postureScore: 5.0,
        finalScore: null,
        status: 'Em andamento',
        summary: 'Você se saiu muito bem por conta disso e isso.'
    };
    const { control, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            rating: 0,
            justification: '',
        },
    });
    // rating removido, não é mais necessário
    const justification = watch('justification');
    const onSubmit = () => {
        // TODO: Integrar com API
        // alert('Equalização salva!');
    };
    return (
        <Controller
            name="rating"
            control={control}
            rules={{ required: 'A nota é obrigatória', min: 1, max: 5 }}
            render={({ field }) => (
                <EqualizacaoCard
                    collaboratorName={collaborator.name}
                    position={collaborator.position}
                    status={scores.status}
                    finalScore={scores.finalScore ?? 0}
                    selfEvalScore={scores.selfEvalScore}
                    managerEvalScore={scores.managerEvalScore}
                    postureScore={scores.postureScore}
                    summary={scores.summary}
                    rating={field.value}
                    onChangeRating={field.onChange}
                    ratingError={errors.rating?.message as string}
                    justification={justification}
                    onChangeJustification={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue('justification', e.target.value)}
                    justificationError={errors.justification?.message as string}
                    editable={true}
                    onSubmit={onSubmit}
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
}

export function CommitteeSectionRenderer({ 
    activeSection, 
    collaborator,
    collaboratorSelfAssessment,
    evaluations360,
    cycleName
}: CommitteeSectionRendererProps) {

    const { variants } = useOptimizedAnimation();
    
    const renderSection = () => {
        switch (activeSection) {
            case 'Avaliação':
                return (
                    <ReadOnlyManagerSelfAssessmentSection 
                        collaboratorSelfAssessment={collaboratorSelfAssessment}
                    />
                );
            case 'Avaliações 360':
                return (
                    <Manager360ReceivedSection 
                        evaluations360={evaluations360 || []}
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
                return <EqualizationSection collaborator={collaborator} />;
            default:
                return (
                    <ReadOnlyManagerSelfAssessmentSection 
                        collaboratorSelfAssessment={collaboratorSelfAssessment}
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
