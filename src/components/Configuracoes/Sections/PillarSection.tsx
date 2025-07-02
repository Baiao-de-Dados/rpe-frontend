import { useQueryState } from 'nuqs';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import type { Pillar } from '../../../types/pillar';

import { PillarCard } from '../Cards/PillarCard';
import AddPillarModal from '../Modals/AddPillarModal';
import { AddPillarButton } from '../Buttons/AddPillarButton';
import { PillarCriteriaCard } from '../Cards/PillarCriteriaCard';

import { useToast } from '../../../hooks/useToast';
import { usePillarsQuery } from '../../../hooks/usePillarsQuery';
import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

import { PillarCardSkeleton } from '../Skeletons/PillarCardSkeleton';
import { PillarCriteriaCardSkeleton } from '../Skeletons/PillarCriteriaCardSkeleton';

export function PillarSection() {

    const { showToast } = useToast();
    const { variants } = useOptimizedAnimation();

    const errorToastShown = useRef(false);

    const [pillarId, setPillarId] = useQueryState('pillar');

    const { data: pillars = [], isLoading, isError } = usePillarsQuery();

    const [showLoading, setShowLoading] = useState(true);
    const [isAddPillarOpen, setAddPillarOpen] = useState(false);
    const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);

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
                <motion.div key="list" className="flex flex-wrap gap-6 justify-center sm:justify-start" variants={variants.pillarMotion} initial="initial" animate="animate" exit="exit">
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
                <motion.div key="card" className="flex flex-col items-center" variants={variants.pillarMotion} initial="initial" animate="animate" exit="exit">
                    <PillarCriteriaCard pillarName={selectedPillar.name} criteria={selectedPillar.criteria} pillarId={selectedPillar.id} onBack={handleBack} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
