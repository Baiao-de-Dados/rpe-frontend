import { memo, useMemo } from 'react';

import Typography from '../../common/Typography';
import CardContainer from '../../common/CardContainer';
import { useCollaboratorAllEvaluations } from '../../../hooks/api/useManagerQuery';
import { useCycleGradesQuery } from '../../../hooks/api/useCollaboratorQuery';
import { PerfomanceEvolution } from '../../Evolution/PerfomanceEvolution';
import { CyclesEvolution } from '../../Evolution/CyclesEvolution';

interface CollaboratorHistorySectionProps {
    collaboratorId: number;
    collaboratorName: string;
}

export const CollaboratorHistorySection = memo(({ 
    collaboratorId, 
    collaboratorName 
}: CollaboratorHistorySectionProps) => {

    const { isLoading: historyLoading } = useCollaboratorAllEvaluations(collaboratorId);
    const { data: cyclesGrades, isLoading: evolutionLoading } = useCycleGradesQuery();

    const isLoading = historyLoading || evolutionLoading;

    // Adapta CycleGrade para Cycle (igual à página de evolução)
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!cyclesGrades) {
        return (
            <CardContainer className="p-6">
                <Typography variant="h3" color="primary" className="mb-4">
                    Histórico de Avaliações - {collaboratorName}
                </Typography>
                <Typography variant="body" color="muted">
                    Nenhuma avaliação encontrada para {collaboratorName}.
                </Typography>
            </CardContainer>
        );
    }

    const lastCycle = sortedCycles[0];
    const previousFinalizedCycle = sortedCycles.find(
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
        sortedCycles.findIndex(
            cycle => cycle.cycleName === displayedCycleName,
        ) + 1;
    const previousCycle = sortedCycles[previousCycleIndex];

    const growth =
        lastCycle && previousCycle && previousCycle.finalScore !== undefined && previousCycle.finalScore !== null
            ? (Number(displayedScore) - previousCycle.finalScore).toFixed(1)
            : '0.0';
    const finalizedCyclesCount = sortedCycles.filter(
        cycle => cycle.finalScore !== null && cycle.finalScore !== undefined && cycle.finalScore > 0
    ).length;

    return (
        <div className="space-y-6">
            <Typography variant="h3" color="primary" className="mb-6">
                Histórico de Avaliações - {collaboratorName}
            </Typography>

            {/* Conteúdo da página de evolução sem o header */}
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
    );
});
