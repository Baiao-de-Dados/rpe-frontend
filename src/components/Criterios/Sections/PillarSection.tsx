import { useState, useEffect, useMemo } from 'react';
import { mockTracks } from '../../../data/mockTracks';
import { PillarCard } from '../Cards/PillarCard';
import { AnimatePresence, motion, easeIn, easeOut } from 'framer-motion';
import { PillarCriteriaCard } from '../Cards/PillarCriteriaCard';
import { useQueryState } from 'nuqs';
import AddPillarModal from '../AddPillarModal';
import { AddPillarButton } from '../Buttons/AddPillarButton';

export function PillarSection() {
    const pillars = useMemo(() => mockTracks[0]?.pillars || [], []);
    const [pillarId, setPillarId] = useQueryState('pillar');
    const [selectedPillar, setSelectedPillar] = useState<null | {
        pillarId: string;
        title: string;
        criteria: { id: string; name: string; description?: string }[];
    }>(null);
    const [isAddPillarOpen, setAddPillarOpen] = useState(false);

    useEffect(() => {
        if (pillarId) {
            const found = pillars.find(p => p.id === pillarId);
            if (found) {
                setSelectedPillar({
                    pillarId: found.id,
                    title: found.title,
                    criteria: found.criteria,
                });
            }
        } else {
            setSelectedPillar(null);
        }
    }, [pillarId, pillars]);

    const handleCardClick = (pillar: (typeof pillars)[number]) => {
        setPillarId(pillar.id);
    };

    const handleBack = () => setPillarId(null);

    const fadeVariants = {
        initial: { opacity: 0, y: 24 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.28, ease: easeOut },
        },
        exit: {
            opacity: 0,
            y: -24,
            transition: { duration: 0.18, ease: easeIn },
        },
    };

    return (
        <AnimatePresence mode="wait">
            {!selectedPillar ? (
                <motion.div
                    key="list"
                    className="flex flex-wrap gap-6 justify-center sm:justify-start"
                    variants={fadeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <span onClick={() => setAddPillarOpen(true)}>
                        <AddPillarButton />
                    </span>
                    {pillars.map(pillar => (
                        <div
                            key={pillar.id}
                            onClick={() => handleCardClick(pillar)}
                        >
                            <PillarCard
                                title={pillar.title}
                                criteriaCount={pillar.criteria.length}
                            />
                        </div>
                    ))}
                    <AddPillarModal
                        open={isAddPillarOpen}
                        onClose={() => setAddPillarOpen(false)}
                    />
                </motion.div>
            ) : (
                <motion.div
                    key="card"
                    className="flex flex-col items-center"
                    variants={fadeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <PillarCriteriaCard
                        title={selectedPillar.title}
                        criteria={selectedPillar.criteria}
                        pillarId={selectedPillar.pillarId}
                        onBack={handleBack}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
