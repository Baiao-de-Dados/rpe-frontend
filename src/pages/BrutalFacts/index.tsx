import { useCycle } from '../../hooks/useCycle';
import { useAdvancedCollaboratorFilter } from '../../hooks/useAdvancedCollaboratorFilter';

import { mockCycles } from '../../data/mockCycles';
import { mockCommitteeData } from '../../data/mockCommitteeData';

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

const chartData: { cycleName: string; score: number }[] = mockCycles.map(cycle => ({
    cycleName: cycle.cycleName,
    score: cycle.score
}));

const uniquePositions = Array.from(
    new Set(mockCommitteeData.collaboratorsSummary.map(s => s.collaborator.position))
);

const uniqueTracks = Array.from(
    new Set(mockCommitteeData.collaboratorsSummary.map(s => s.collaborator.track?.name ?? ''))
);

const positions = uniquePositions;
const tracks = uniqueTracks;   

export function BrutalFactsPage() {

    const { currentCycle, isLoading } = useCycle();

    const collaboratorsSummary = mockCommitteeData.collaboratorsSummary;

    const { search, setSearch, setFilters, filteredCollaborators } = useAdvancedCollaboratorFilter({ collaboratorsSummary, positions, tracks });

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    return (
        <div>
            <PageHeader title="Brutal Facts" />
            <div className="flex flex-col gap-6 p-6">
                <BrutalFactsMetrics
                    score={4.5}
                    cycleLabel="2024.2"
                    growth={+0.3}
                    growthCycleLabel="2024.1"
                    total={150}
                />

                <CardContainer className="-mt-6 flex flex-col gap-6">
                    <Typography variant="h2" className="text-black font-bold text-2xl">Resumo</Typography>
                    <SummaryBox summary={mockCycles[0].summary} title="Insights" />
                </CardContainer>

                <CardContainer className="flex flex-col gap-6 p-6">
                    <Typography variant="h2" className="text-black font-bold text-2xl">Desempenho</Typography>
                    <PerformanceChart cycles={chartData} />
                    <SummaryBox summary={mockCycles[0].summary} title="Insights" />
                </CardContainer>

                <CardContainer className="flex flex-col gap-6">
                    <div className="flex flex-row justify-between items-center">
                        <Typography variant="h2" className="text-black font-bold text-2xl">Resumo de equalizações</Typography>
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
                            />
                        ))}
                    </div>
                </CardContainer>
            </div>
        </div>
    );
}
