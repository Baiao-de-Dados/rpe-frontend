import { motion } from 'framer-motion';
import { mockTracks } from '../../../data/mockTracks';
import TrackCard from '../TrackCard';
import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';
import { useCycle } from '../../../hooks/useCycle';

export function TrackSection() {
    const { shouldReduceMotion } = useOptimizedAnimation();

    const { currentCycle } = useCycle();

    const isCycleClosed = !currentCycle?.isOpen;

    return (
        <>
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
                    <TrackCard
                        trackTitle={track.title}
                        sections={track.sections}
                        isCycleClosed={isCycleClosed}
                    />
                </motion.div>
            ))}
        </>
    );
}
