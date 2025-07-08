import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { SectionPreloader } from '../Sections/SectionPreloader';
import { mentorEvaluationSections, type MentorSectionType } from './MentorEvaluationSections';

import { SectionLoadingSpinner } from '../../common/SectionLoadingSpinner';

import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

const MentorSelfAssessmentSection = lazy(() =>
    import('./MentorSelfAssessmentSection').then(module => ({
        default: module.MentorSelfAssessmentSection,
    })),
);

const MentorGeneralAssessmentSection = lazy(() =>
    import('./MentorGeneralAssessmentSection').then(module => ({
        default: module.MentorGeneralAssessmentSection,
    })),
);

interface MentorSectionRendererProps {
    activeSection: MentorSectionType;
    // Dados da autoavaliação do colaborador (read-only)
    collaboratorSelfAssessment?: Array<{
        pilarId: string;
        criterionId: string;
        rating?: number | null;
        justification?: string;
    }>;
}

export function MentorSectionRenderer({ 
    activeSection, 
    collaboratorSelfAssessment 
}: MentorSectionRendererProps) {

    const { variants } = useOptimizedAnimation();
    
    const renderSection = () => {
        switch (activeSection) {
            case 'Autoavaliação':
                return (
                    <MentorSelfAssessmentSection 
                        collaboratorSelfAssessment={collaboratorSelfAssessment}
                    />
                );
            case 'Avaliação Geral':
                return <MentorGeneralAssessmentSection />;
            default:
                return (
                    <MentorSelfAssessmentSection 
                        collaboratorSelfAssessment={collaboratorSelfAssessment}
                    />
                );
        }
    };

    return (
        <>
            <SectionPreloader activeSection={activeSection} sections={[...mentorEvaluationSections]} />
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
