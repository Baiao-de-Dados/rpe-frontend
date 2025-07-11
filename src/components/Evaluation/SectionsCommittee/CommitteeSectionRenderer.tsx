import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { SectionPreloader } from '../Sections/SectionPreloader';
import { committeeEvaluationSections, type CommitteeSectionType } from './CommitteeEvaluationSections';

import { SectionLoadingSpinner } from '../../common/SectionLoadingSpinner';

import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

// Importando o componente de equalização
import Equalizacao from '../../../pages/Colaboradores/Equalizacao';

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

const ManagerLeaderEvaluationSection = lazy(() =>
    import('../SectionsMentor/ManagerLeaderEvaluationSection').then(module => ({
        default: module.ManagerLeaderEvaluationSection,
    })),
);

const ManagerMentoringEvaluationSection = lazy(() =>
    import('../SectionsMentor/ManagerMentoringEvaluationSection').then(module => ({
        default: module.ManagerMentoringEvaluationSection,
    })),
);

// Seção de equalização
const EqualizationSection = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
        <Equalizacao />
    </div>
);

interface CommitteeSectionRendererProps {
    activeSection: CommitteeSectionType;
    collaborator: {
        id: string;
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
    };
    collaboratorSelfAssessment?: Array<{
        pilarId: string;
        criterionId: string;
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
                        collaboratorId={collaborator?.id || ''}
                        collaboratorName={collaborator?.nome || 'Colaborador'}
                    />
                );
            case 'Líderes':
                return (
                    <ManagerLeaderEvaluationSection 
                        collaboratorId={collaborator?.id || ''}
                        collaboratorName={collaborator?.nome || 'Colaborador'}
                    />
                );
            case 'Histórico':
                return (
                    <CollaboratorHistorySection 
                        collaboratorId={collaborator?.id || ''}
                        collaboratorName={collaborator?.nome || 'Colaborador'}
                    />
                );
            case 'Equalização':
                return <EqualizationSection />;
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
