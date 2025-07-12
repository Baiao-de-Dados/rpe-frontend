import { mockCycles } from '../../../data/mockCycles';
import { PerfomanceEvolution } from '../../Evolution/PerfomanceEvolution';
import { CyclesEvolution } from '../../Evolution/CyclesEvolution';

interface CollaboratorHistorySectionProps {
    collaboratorId: number;
    collaboratorName: string;
}

export function CollaboratorHistorySection({ collaboratorId, collaboratorName: collaboratorName }: CollaboratorHistorySectionProps) {
    // TODO: Filtrar os ciclos pelo collaboratorId quando tiver API real
    void collaboratorId; // Silencia warning do ESLint
    void collaboratorName;
    
    // Sempre mostra todos os ciclos - o filtro é interno do chart
    const sortedCycles = mockCycles
        .slice()
        .sort((a, b) => b.cycleName.localeCompare(a.cycleName));
        
    const lastCycle = sortedCycles[0];
    const previousFinalizedCycle = sortedCycles.find(
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
        sortedCycles.findIndex(
            cycle => cycle.cycleName === displayedCycleName,
        ) + 1;
    const previousCycle = sortedCycles[previousCycleIndex];
    const growth =
        lastCycle && previousCycle
            ? (Number(displayedScore) - previousCycle.score).toFixed(1)
            : '0.0';
    const finalizedCyclesCount = sortedCycles.filter(
        cycle => cycle.status === 'Finalizado',
    ).length;
    
    return (
        <div className="space-y-6"> 
            <div className="space-y-6">
                <PerfomanceEvolution
                    displayedScore={displayedScore}
                    displayedCycleName={displayedCycleName}
                    growth={growth}
                    previousCycleName={previousCycle?.cycleName || 'N/A'}
                    finalizedCyclesCount={finalizedCyclesCount}
                    sortedCycles={sortedCycles}
                />
                <CyclesEvolution sortedCycles={sortedCycles} />
            </div>
        </div>
    );
}
