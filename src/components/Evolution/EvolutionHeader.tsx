import Typography from '../Typography';
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

    return (
        <header className="fixed top-0 left-0 w-full z-30 bg-white pt-8 pb-6 px-8 flex items-center justify-between shadow-md border-b border-gray-100">
            <Typography variant="h1" className="text-2xl md:text-4xl font-bold">
                Evolução
            </Typography>
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
        </header>
    );
}
