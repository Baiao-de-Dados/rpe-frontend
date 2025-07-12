import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { SectionPreloader } from '../Sections/SectionPreloader';
import { managerEvaluationSections, type ManagerSectionType } from './ManagerEvaluationSections';

import { SectionLoadingSpinner } from '../../common/SectionLoadingSpinner';

import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

const ManagerSelfAssessmentSection = lazy(() =>
    import('./ManagerSelfAssessmentSection').then(module => ({
        default: module.ManagerSelfAssessmentSection,
    })),
);

const Manager360ReceivedSection = lazy(() =>
    import('./Manager360ReceivedSection').then(module => ({
        default: module.Manager360ReceivedSection,
    })),
);

const ManagerReferencesReceivedSection = lazy(() =>
    import('./ManagerReferencesReceivedSection').then(module => ({
        default: module.ManagerReferencesReceivedSection,
    })),
);

const CollaboratorHistorySection = lazy(() =>
    import('./CollaboratorHistorySection').then(module => ({
        default: module.CollaboratorHistorySection,
    })),
);

const ManagerLeaderEvaluationSection = lazy(() =>
    import('./ManagerLeaderEvaluationSection').then(module => ({
        default: module.ManagerLeaderEvaluationSection,
    })),
);

const ManagerMentoringEvaluationSection = lazy(() =>
    import('./ManagerMentoringEvaluationSection').then(module => ({
        default: module.ManagerMentoringEvaluationSection,
    })),
);

interface ManagerSectionRendererProps {
    activeSection: ManagerSectionType;
    // Dados do colaborador
    collaborator?: {
        id: number;
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
    };
    // Dados da autoavaliação do colaborador (read-only)
    collaboratorSelfAssessment?: Array<{
        pilarId: number;
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>;
    // Dados das avaliações 360° recebidas
    evaluations360?: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        rating: number;
        improvements: string;
        strengths: string;
    }>;
    // Dados das referências recebidas
    referencesReceived?: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        justification: string;
    }>;
    cycleName?: string;
}

export function ManagerSectionRenderer({ 
    activeSection, 
    collaborator,
    collaboratorSelfAssessment,
    evaluations360,
    referencesReceived,
    cycleName
}: ManagerSectionRendererProps) {

    const { variants } = useOptimizedAnimation();
    
    const renderSection = () => {
        switch (activeSection) {
            case 'Autoavaliação':
                return (
                    <ManagerSelfAssessmentSection 
                        collaboratorSelfAssessment={collaboratorSelfAssessment}
                    />
                );
            case 'Avaliações 360°':
                return (
                    <Manager360ReceivedSection 
                        evaluations360={evaluations360 || []}
                        cycleName={cycleName || 'Não definido'}
                    />
                );
            case 'Líderes':
                return (
                    <ManagerLeaderEvaluationSection 
                        collaboratorId={collaborator!.id}
                        collaboratorName={collaborator?.nome || 'Colaborador'}
                    />
                );
            case 'Mentoring':
                return (
                    <ManagerMentoringEvaluationSection 
                        collaboratorId={collaborator!.id}
                        collaboratorName={collaborator?.nome || 'Colaborador'}
                    />
                );
            case 'Referências':
                return (
                    <ManagerReferencesReceivedSection 
                        referencesReceived={referencesReceived || []}
                        cycleName={cycleName || 'Não definido'}
                    />
                );
            case 'Histórico':
                return (
                    <CollaboratorHistorySection 
                        collaboratorId={collaborator!.id}
                        collaboratorName={collaborator?.nome || 'Colaborador'}
                    />
                );
            default:
                return (
                    <ManagerSelfAssessmentSection 
                        collaboratorSelfAssessment={collaboratorSelfAssessment}
                    />
                );
        }
    };

    return (
        <>
            <SectionPreloader activeSection={activeSection} sections={[...managerEvaluationSections]} />
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
