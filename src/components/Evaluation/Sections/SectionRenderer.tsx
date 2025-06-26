import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLoadingSpinner } from '../../common/SectionLoadingSpinner';
import { SectionPreloader } from './SectionPreloader';
import { evaluationSections, type SectionType } from './EvaluationSections';

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
            <SectionPreloader
                activeSection={activeSection}
                sections={evaluationSections}
            />
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
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
