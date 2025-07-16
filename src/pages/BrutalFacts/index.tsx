import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCycle } from '../../hooks/useCycle';
import { useLeaderCollaboratorsEvaluation } from '../../hooks/api/useLeaderQuery';
import { useAdvancedCollaboratorFilter } from '../../hooks/useAdvancedCollaboratorFilter';
import { leaderEndpoints } from '../../services/api/leader';

import SearchBar from '../../components/common/Searchbar';
import SummaryBox from '../../components/common/SummaryBox';
import Typography from '../../components/common/Typography';
import PageHeader from '../../components/common/PageHeader';
import CycleLoading from '../../components/common/CycleLoading';
import CardContainer from '../../components/common/CardContainer';
import AdvancedFilter from '../../components/common/AdvancedFilter';
import { PerformanceChart } from '../../components/Charts/PerformanceChart';
import BrutalFactsMetrics from '../../components/Lideranca/BrutalFactsMetrics';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import CollaboratorEvaluationCard from '../../components/common/CollaboratorEvaluationCard';
import { BrutalFactsNotClosedMessage } from '../../components/Lideranca/BrutalFactsNotClosedMessage';
import type { Cycle } from '../../types/cycle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPositionsAndTracks(collaboratorsSummary: any[]) {
    const positions = Array.from(new Set(collaboratorsSummary.map(s => s.collaborator.position)));
    const tracks = Array.from(new Set(collaboratorsSummary.map(s => s.collaborator.track?.name ?? '')));
    return { positions, tracks };
}

export function BrutalFactsPage() {
    const navigate = useNavigate();
    const { currentCycle, isLoading, status } = useCycle();
    const {
        data: collaboratorsSummary = [],
        isLoading: isLeaderLoading,
        allCycleAvg = [],
        isLoadingAllCycleAvg
    } = useLeaderCollaboratorsEvaluation();
    const { positions, tracks } = getPositionsAndTracks(collaboratorsSummary);

    const { search, setSearch, setFilters, filteredCollaborators } = useAdvancedCollaboratorFilter({ collaboratorsSummary, positions, tracks });

    const averageFinalScore = useMemo(() => {
        const finalScores = collaboratorsSummary
            .map(c => c.finalEvaluationScore)
            .filter(score => typeof score === 'number');
        return finalScores.length > 0
            ? finalScores.reduce((acc, score) => acc + score, 0) / finalScores.length
            : 0;
    }, [collaboratorsSummary]);

    const { growth, growthCycleLabel } = useMemo(() => {
        if (!allCycleAvg || allCycleAvg.length < 2 || !currentCycle) {
            return { growth: 0, growthCycleLabel: '' };
        }

        const sortedCycles = [...allCycleAvg].sort((a, b) =>
            a.cycleName.localeCompare(b.cycleName)
        );

        const currentCycleIndex = sortedCycles.findIndex(
            (cycle) => cycle.cycleName === currentCycle.name
        );
        
        if (currentCycleIndex > 0) {
            const currentCycleData = sortedCycles[currentCycleIndex];
            const previousCycleData = sortedCycles[currentCycleIndex - 1];

            const calculatedGrowth =
                currentCycleData.averageEqualizationScore - 
                previousCycleData.averageEqualizationScore;

            return {
                growth: calculatedGrowth,
                growthCycleLabel: previousCycleData.cycleName,
            };
        }

        return { growth: 0, growthCycleLabel: '' };
    }, [allCycleAvg, currentCycle]);

    const chartData = useMemo(() => {
        if (!allCycleAvg || !Array.isArray(allCycleAvg)) return [];
        return allCycleAvg.map(cycle => ({
            cycleName: String(cycle.cycleName),
            score: cycle.averageEqualizationScore
        }));
    }, [allCycleAvg]);

    // Adicionar lógica para buscar o resumo de IA
    const [aiSummary, setAiSummary] = useState<string | null>(null);
    const [loadingSummary, setLoadingSummary] = useState<boolean>(true);

    useEffect(() => {
        const fetchAiSummary = async () => {
            if (!currentCycle) return;
            try {
                const response = await leaderEndpoints.getLeaderEvaluation({
                    leaderId: currentCycle.leaderId ?? 0, // Adicionar fallback para 0 caso leaderId não exista
                    cycleId: currentCycle.id ?? 0,
                    collaboratorId: collaboratorsSummary[0]?.collaborator?.id || 0, // Use o ID do primeiro colaborador ou padrão para 0
                });
                setAiSummary(response.data.aiSummary || 'Nenhum resumo disponível.');
            } catch (error) {
                console.error('Erro ao buscar resumo de IA:', error);
                setAiSummary('Erro ao carregar resumo.');
            } finally {
                setLoadingSummary(false);
            }
        };

        fetchAiSummary();
    }, [currentCycle]);

    if (isLoading || isLeaderLoading || isLoadingAllCycleAvg) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    if (status !== 'closed') {
        return <BrutalFactsNotClosedMessage cycle={currentCycle as Cycle}/>
    }

    return (
        <>
            <PageHeader title="Brutal Facts" />
            <main className="p-8 pt-6">
                <BrutalFactsMetrics
                    score={averageFinalScore}
                    cycleLabel={currentCycle.name}
                    growth={growth}
                    growthCycleLabel={growthCycleLabel}
                    total={collaboratorsSummary.filter(c => c.finalEvaluationScore !== null && c.finalEvaluationScore !== undefined).length}
                />

                <CardContainer className="flex flex-col gap-6 mb-6">
                    <Typography variant="h2" className="text-black font-bold text-2xl">Resumo</Typography>
                    <SummaryBox 
                        summary={loadingSummary ? 'Carregando resumo...' : aiSummary || 'Nenhum resumo disponível.'} 
                        title="Insights" 
                    />
                </CardContainer>

                <CardContainer className="flex flex-col gap-6 p-6">
                    <Typography variant="h2" className="text-black font-bold text-2xl">Desempenho</Typography>
                    <PerformanceChart cycles={chartData} />
                </CardContainer>

                <CardContainer className="flex flex-col gap-6 mt-6">
                    <div className="flex flex-row justify-between items-center">
                        <Typography variant="h2" className="text-black font-bold text-2xl">Resumo dos liderados</Typography>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <div className="flex flex-col items-center justify-center border-2 border-gray-200 rounded-xl">
                                <SearchBar
                                    placeholder="Buscar colaboradores..."
                                    className="flex flex-row justify-center items-center bg-gray-200 rounded-xl"
                                    value={search}
                                    onChange={setSearch}
                                    searchFunction={() => filteredCollaborators}
                                    getItemKey={(item: typeof collaboratorsSummary[number]) => String(item.collaborator.id)}
                                    onItemSelect={(item: typeof collaboratorsSummary[number]) => setSearch(item.collaborator.name)}
                                    showResults={filteredCollaborators.length === 0}
                                />
                            </div>
                            <AdvancedFilter positions={positions} tracks={tracks} onApply={setFilters} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 -z-1 max-h-[520px] overflow-y-auto" style={{ minHeight: 460, maxHeight: 460 }}>
                        {filteredCollaborators.map((summary: typeof collaboratorsSummary[number]) => (
                            <CollaboratorEvaluationCard
                                key={summary.collaborator.id}
                                summary={summary}
                                onClick={() => navigate(`/colaboradores/${summary.collaborator.id}/avaliacao`)}
                                className="-z-1 shadow-none border border-[#f0f0f0] px-2 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full cursor-pointer hover:shadow-md transition-shadow"
                            />
                        ))}
                    </div>
                </CardContainer>
            </main>
        </>
    );
}
