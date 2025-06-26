import { useState, useEffect, useMemo } from 'react';
import { mockTracks } from '../../../data/mockTracks';
import { AddPillarButton } from '../Buttons/AddPillarButton';
import { PillarCard } from '../Cards/PillarCard';
import { AnimatePresence, motion, easeIn, easeOut } from 'framer-motion';
import { PillarCriteriaCard } from '../Cards/PillarCriteriaCard';
import { useQueryState } from 'nuqs';

export function PillarSection() {
    const pillars = useMemo(() => mockTracks[0]?.sections || [], []);
    const [pillarId, setPillarId] = useQueryState('pillar');
    const [selectedPillar, setSelectedPillar] = useState<null | {
        sectionId: string;
        title: string;
        criteria: { id: string; name: string; description?: string }[];
    }>(null);

    useEffect(() => {
        if (pillarId) {
            const found = pillars.find(p => p.id === pillarId);
            if (found) {
                setSelectedPillar({
                    sectionId: found.id,
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
                    <AddPillarButton />
                    {pillars.map(section => (
                        <div
                            key={section.id}
                            onClick={() => handleCardClick(section)}
                        >
                            <PillarCard
                                title={section.title}
                                criteriaCount={section.criteria.length}
                            />
                        </div>
                    ))}
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
                        sectionId={selectedPillar.sectionId}
                        onBack={handleBack}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
