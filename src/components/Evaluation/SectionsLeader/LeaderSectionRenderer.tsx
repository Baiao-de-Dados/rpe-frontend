import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { SectionPreloader } from '../Sections/SectionPreloader';
import { leaderEvaluationSections, type LeaderSectionType } from './LeaderEvaluationSections';

import { SectionLoadingSpinner } from '../../common/SectionLoadingSpinner';

import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

const LeaderGeneralAssessmentSection = lazy(() =>
    import('./LeaderGeneralAssessmentSection').then(module => ({
        default: module.LeaderGeneralAssessmentSection,
    })),
);

const CollaboratorHistorySection = lazy(() =>
    import('../SectionsMentor/CollaboratorHistorySection').then(module => ({
        default: module.CollaboratorHistorySection,
    })),
);

interface LeaderSectionRendererProps {
    activeSection: LeaderSectionType;
    // Dados do colaborador para a seção de histórico
    collaborator?: {
        id: string;
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
    };
}

export function LeaderSectionRenderer({ 
    activeSection,
    collaborator
}: LeaderSectionRendererProps) {

    const { variants } = useOptimizedAnimation();
    
    const renderSection = () => {
        switch (activeSection) {
            case 'Avaliação Geral':
                return <LeaderGeneralAssessmentSection />;
            case 'Histórico':
                return (
                    <CollaboratorHistorySection 
                        collaboratorId={collaborator?.id || ''}
                        collaboratorName={collaborator?.nome || 'Colaborador'}
                    />
                );
            default:
                return <LeaderGeneralAssessmentSection />;
        }
    };

    return (
        <>
            <SectionPreloader activeSection={activeSection} sections={[...leaderEvaluationSections]} />
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
