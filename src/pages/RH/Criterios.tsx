import CriteriosSubmitButton from '../../components/Criterios/CriteriosSubmitButton';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import PageHeader from '../../components/PageHeader';

import { useCycle } from '../../hooks/useCycle';
import CycleLoading from '../../components/CycleLoading';
import { motion } from 'framer-motion';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';
import { mockTracks } from '../../data/mockTracks';
import TrackSection from '../../components/Criterios/TrackSection';

export function Criterios() {
    const { currentCycle, isLoading } = useCycle();
    const { shouldReduceMotion } = useOptimizedAnimation();

    const isCycleClosed = !currentCycle?.isOpen;

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    return (
        <>
            <PageHeader
                title="Critérios de Avaliação"
                button={<CriteriosSubmitButton isCycleClosed={isCycleClosed} />}
            />
            <main className="p-8 pt-6">
                {mockTracks.map((track, idx) => (
                    <motion.div
                        key={track.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: shouldReduceMotion ? 0.01 : 0.3,
                            ease: [0.4, 0, 0.2, 1],
                            delay: shouldReduceMotion ? 0 : idx * 0.13,
                        }}
                    >
                        <TrackSection
                            trackTitle={track.title}
                            sections={track.sections}
                            isCycleClosed={isCycleClosed}
                        />
                    </motion.div>
                ))}
            </main>
        </>
    );
}
