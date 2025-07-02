import { useState, useEffect, useRef } from 'react';
import { usePillarsQuery } from '../../../hooks/usePillarsQuery';
import { useQueryState } from 'nuqs';
import type { Pillar } from '../../../types/pillar';
import { PillarCard } from '../Cards/PillarCard';
import { AnimatePresence, motion, easeIn, easeOut } from 'framer-motion';
import { PillarCriteriaCard } from '../Cards/PillarCriteriaCard';
import { AddPillarButton } from '../Buttons/AddPillarButton';
import AddPillarModal from '../Modals/AddPillarModal';
import { useToast } from '../../../hooks/useToast';
import { PillarCardSkeleton } from '../Skeletons/PillarCardSkeleton';
import { PillarCriteriaCardSkeleton } from '../Skeletons/PillarCriteriaCardSkeleton';

export function PillarSection() {
    const { data: pillars = [], isLoading, isError } = usePillarsQuery();
    const [pillarId, setPillarId] = useQueryState('pillar');
    const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
    const [isAddPillarOpen, setAddPillarOpen] = useState(false);
    const { showToast } = useToast();
    const errorToastShown = useRef(false);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        if (isError && !errorToastShown.current) {
            showToast('Erro ao carregar pilares. Tente novamente mais tarde.', 'error', {
                title: 'Erro de carregamento',
                duration: 10000,
            });
            errorToastShown.current = true;
        }
        if (!isError) {
            errorToastShown.current = false;
        }
    }, [isError, showToast]);

    useEffect(() => {
        if (pillarId) {
            const found = pillars.find(p => String(p.id) === String(pillarId));
            if (found) {
                setSelectedPillar(found);
            }
        } else {
            setSelectedPillar(null);
        }
    }, [pillarId, pillars]);

    useEffect(() => {
        if (!isLoading) {
            const timeout = setTimeout(() => setShowLoading(false), 500);
            return () => clearTimeout(timeout);
        } else {
            setShowLoading(true);
        }
    }, [isLoading]);

    const handleCardClick = (pillar: Pillar) => {
        setPillarId(String(pillar.id));
    };

    const handleBack = () => setPillarId(null);

    if (showLoading && pillarId) {
        return (
            <div className="flex flex-col items-center">
                <PillarCriteriaCardSkeleton />
            </div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            {!selectedPillar ? (
                <motion.div key="list" className="flex flex-wrap gap-6 justify-center sm:justify-start" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                    <span onClick={() => setAddPillarOpen(true)}>
                        <AddPillarButton />
                    </span>
                    {showLoading
                        ? Array.from({ length: 7 }).map((_, i) => <PillarCardSkeleton key={i} />)
                        : pillars.map(pillar => (
                              <div key={pillar.id} onClick={() => handleCardClick(pillar)}>
                                  <PillarCard title={pillar.name} criteriaCount={pillar.criteria.length} />
                              </div>
                          ))}
                    <AddPillarModal open={isAddPillarOpen} onClose={() => setAddPillarOpen(false)} />
                </motion.div>
            ) : (
                <motion.div key="card" className="flex flex-col items-center" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                    <PillarCriteriaCard pillarName={selectedPillar.name} criteria={selectedPillar.criteria} pillarId={selectedPillar.id} onBack={handleBack} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

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
