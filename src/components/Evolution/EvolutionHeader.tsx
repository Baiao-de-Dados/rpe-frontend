import PageHeader from '../common/PageHeader';
import { mockCycles } from '../../data/mockCycles';

interface EvolutionHeaderProps {
    selectedCycle: string;
    onSelectCycle: (cycle: string) => void;
}

export function EvolutionHeader({
    selectedCycle,
    onSelectCycle,
}: EvolutionHeaderProps) {
    const sortedCycles = mockCycles
        .slice()
        .sort((a, b) => b.cycleName.localeCompare(a.cycleName));

    const cycleSelector = (
        <select
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600"
            value={selectedCycle}
            onChange={e => onSelectCycle(e.target.value)}
        >
            <option value="all">Todos os ciclos</option>
            {sortedCycles.map(cycle => (
                <option key={cycle.cycleName} value={cycle.cycleName}>
                    {cycle.cycleName}
                </option>
            ))}
        </select>
    );

    return (
        <PageHeader
            title="Evolução"
            button={cycleSelector}
        />
    );
}
