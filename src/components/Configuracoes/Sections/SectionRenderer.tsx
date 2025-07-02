import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { criterionSections, type SectionType } from './CriterionSections';

import { SectionLoadingSpinner } from '../../common/SectionLoadingSpinner';

import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

import { SectionPreloader } from '../../Evaluation/Sections/SectionPreloader';

const PillarSection = lazy(() =>
    import('./PillarSection').then(module => ({
        default: module.PillarSection,
    })),
);

const TrackSection = lazy(() =>
    import('./TrackSection').then(module => ({
        default: module.TrackSection,
    })),
);

const CycleSection = lazy(() =>
    import('./CycleSection').then(module => ({
        default: module.CycleSection,
    })),
);

interface SectionRendererProps {
    activeSection: SectionType;
}

export function SectionRenderer({ activeSection }: SectionRendererProps) {

    const { variants } = useOptimizedAnimation();

    const renderSection = () => {
        switch (activeSection) {
            case 'Pilares':
                return <PillarSection />;
            case 'Trilhas':
                return <TrackSection />;
            case 'Ciclos':
                return <CycleSection />;
            default:
                return <PillarSection />;
        }
    };

    return (
        <>
            <SectionPreloader activeSection={activeSection} sections={criterionSections} />
            <AnimatePresence mode="wait">
                <motion.div key={activeSection} variants={variants.configSectionRenderer} initial="initial" animate="animate" exit="exit" className="min-h-[200px]">
                    <Suspense fallback={<SectionLoadingSpinner />}>{renderSection()}</Suspense>
                </motion.div>
            </AnimatePresence>
        </>
    );
}