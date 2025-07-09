import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { SectionPreloader } from './SectionPreloader';
import { evaluationSections, type SectionType } from './EvaluationSections';
import { useOptimizedAnimation } from '../../../../hooks/useOptimizedAnimation';
import { SectionLoadingSpinner } from '../../../common/SectionLoadingSpinner';


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
    selectedCycle: string;
}

export function SectionRenderer({ activeSection, selectedCycle }: SectionRendererProps) {

    const { variants } = useOptimizedAnimation();
    
    const renderSection = () => {
        switch (activeSection) {
            case 'Autoavaliação':
                return <SelfAssessmentSection selectedCycle={selectedCycle} />;
            case 'Avaliação 360':
                return <Evaluation360Section selectedCycle={selectedCycle} />;
            case 'Referências':
                return <ReferencesSection selectedCycle={selectedCycle} />;
            case 'Mentoring':
                return <MentoringSection selectedCycle={selectedCycle} />;
            default:
                return <SelfAssessmentSection selectedCycle={selectedCycle} />;
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