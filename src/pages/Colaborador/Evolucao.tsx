import { useState } from 'react';
import { mockCycles } from '../../data/mockCycles';
import { EvolutionHeader } from '../../components/Evolution/EvolutionHeader';
import { PerfomanceEvolution } from '../../components/Evolution/PerfomanceEvolution';
import { CyclesEvolution } from '../../components/Evolution/CyclesEvolution';

export function Evolucao() {
    const [selectedCycle, setSelectedCycle] = useState('all');
    const sortedCycles = mockCycles
        .slice()
        .sort((a, b) => b.cycleName.localeCompare(a.cycleName));
    const filteredCycles =
        selectedCycle === 'all'
            ? sortedCycles
            : sortedCycles.filter(cycle => cycle.cycleName === selectedCycle);
    const lastCycle = filteredCycles[0];
    const previousFinalizedCycle = filteredCycles.find(
        cycle => cycle.status === 'Finalizado',
    );
    const displayedScore =
        lastCycle?.score > 0
            ? lastCycle.score
            : previousFinalizedCycle?.score || '-';
    const displayedCycleName =
        lastCycle?.score > 0
            ? lastCycle.cycleName
            : previousFinalizedCycle?.cycleName || 'N/A';
    const previousCycleIndex =
        filteredCycles.findIndex(
            cycle => cycle.cycleName === displayedCycleName,
        ) + 1;
    const previousCycle = filteredCycles[previousCycleIndex];
    const growth =
        lastCycle && previousCycle
            ? (Number(displayedScore) - previousCycle.score).toFixed(1)
            : '0.0';
    const finalizedCyclesCount = filteredCycles.filter(
        cycle => cycle.status === 'Finalizado',
    ).length;

    return (
        <>
            <EvolutionHeader
                selectedCycle={selectedCycle}
                onSelectCycle={setSelectedCycle}
            />
            <main className="p-4 sm:p-8 space-y-6">
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
