
import { useState, useMemo } from 'react';
import { useCycleGradesQuery } from '../../hooks/api/useCollaboratorQuery';
import { EvolutionHeader } from '../../components/Evolution/EvolutionHeader';
import { PerfomanceEvolution } from '../../components/Evolution/PerfomanceEvolution';
import { CyclesEvolution } from '../../components/Evolution/CyclesEvolution';
import CycleLoading from '../../components/common/CycleLoading';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';

export function Evolucao() {
    const [selectedCycle, setSelectedCycle] = useState('all');
    const { data: cyclesGrades, isLoading } = useCycleGradesQuery();

    // Adapta CycleGrade para Cycle
    const sortedCycles = useMemo(() => {
        if (!cyclesGrades?.cycles) return [];
        return cyclesGrades.cycles
            .slice()
            .sort((a, b) => b.cycleName.localeCompare(a.cycleName))
            .map(cycle => ({
                cycleName: cycle.cycleName,
                status: cycle.finalEvaluation !== null && cycle.finalEvaluation !== undefined ? 'Finalizado' : 'Pendente',
                finalScore: cycle.finalEvaluation ?? 0,
                selfEvalScore: cycle.autoEvaluation ?? 0,
                managerScore: cycle.managerEvaluation ?? 0,
                summary: '', // Ignorar summary por enquanto
            }));
    }, [cyclesGrades]);

    const filteredCycles = useMemo(() => {
        if (selectedCycle === 'all') return sortedCycles;
        return sortedCycles.filter(cycle => cycle.cycleName === selectedCycle);
    }, [sortedCycles, selectedCycle]);

    if (isLoading) {
        return <CycleLoading />;
    }
    
    if (!cyclesGrades) {
        return <CycleLoadErrorMessage />;
    }

    const lastCycle = filteredCycles[0];
    const previousFinalizedCycle = filteredCycles.find(
        cycle => cycle.finalScore !== null && cycle.finalScore !== undefined && cycle.finalScore > 0,
    );

    const displayedScore =
        lastCycle?.finalScore !== undefined && lastCycle?.finalScore !== null && lastCycle.finalScore > 0
            ? lastCycle.finalScore
            : previousFinalizedCycle?.finalScore || '-';

    const displayedCycleName =
        lastCycle?.finalScore !== undefined && lastCycle?.finalScore !== null && lastCycle.finalScore > 0
            ? lastCycle.cycleName
            : previousFinalizedCycle?.cycleName || 'N/A';

    const previousCycleIndex =
        filteredCycles.findIndex(
            cycle => cycle.cycleName === displayedCycleName,
        ) + 1;
    const previousCycle = filteredCycles[previousCycleIndex];

    const growth =
        lastCycle && previousCycle && previousCycle.finalScore !== undefined && previousCycle.finalScore !== null
            ? (Number(displayedScore) - previousCycle.finalScore).toFixed(1)
            : '0.0';

    const finalizedCyclesCount = filteredCycles.filter(
        cycle => cycle.finalScore !== null && cycle.finalScore !== undefined && cycle.finalScore > 0,
    ).length;

    return (
        <>
            <EvolutionHeader
                selectedCycle={selectedCycle}
                onSelectCycle={setSelectedCycle}
            />
            <main className="p-8 pt-6 space-y-6">
                <PerfomanceEvolution
                    displayedScore={displayedScore}
                    displayedCycleName={displayedCycleName}
                    growth={growth}
                    previousCycleName={previousCycle?.cycleName || 'N/A'}
                    finalizedCyclesCount={finalizedCyclesCount}
                    sortedCycles={filteredCycles}
                />
                <CyclesEvolution sortedCycles={filteredCycles} />
            </main>
        </>
    );
}
