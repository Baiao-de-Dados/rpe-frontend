import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { SectionPreloader } from './SectionPreloader';
import { evaluationSections, type SectionType } from './EvaluationSections';

import { SectionLoadingSpinner } from '../../common/SectionLoadingSpinner';

import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

const SelfAssessmentSection = lazy(() =>
    import('./SelfAssessmentSection').then(module => ({
        default: module.SelfAssessmentSection,
    })),
);

const Evaluation360Section = lazy(() =>
    import('./Evaluation360Section').then(module => ({
        default: module.Evaluation360Section,
    })),
);

const ReferencesSection = lazy(() =>
    import('./ReferencesSection').then(module => ({
        default: module.ReferencesSection,
    })),
);

const MentoringSection = lazy(() =>
    import('./MentoringSection').then(module => ({
        default: module.MentoringSection,
    })),
);

interface SectionRendererProps {
    activeSection: SectionType;
}

export function SectionRenderer({ activeSection }: SectionRendererProps) {

    const { variants } = useOptimizedAnimation();
    
    const renderSection = () => {
        switch (activeSection) {
            case 'Autoavaliação':
                return <SelfAssessmentSection />;
            case 'Avaliação 360':
                return <Evaluation360Section />;
            case 'Referências':
                return <ReferencesSection />;
            case 'Mentoring':
                return <MentoringSection />;
            default:
                return <SelfAssessmentSection />;
        }
    };

    return (
        <>
            <SectionPreloader activeSection={activeSection} sections={evaluationSections} />
            <AnimatePresence mode="wait">
                <motion.div key={activeSection} variants={variants.evaluationSectionRenderer} initial="initial" animate="animate" exit="exit" className="min-h-[200px]">
                    <Suspense fallback={<SectionLoadingSpinner />}>
                        {renderSection()}
                    </Suspense>
                </motion.div>
            </AnimatePresence>
        </>
    );
}