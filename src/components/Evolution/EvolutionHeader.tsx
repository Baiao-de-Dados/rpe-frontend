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
        <header className="sticky top-0 z-50 bg-white flex flex-col justify-between shadow-sm">
            <div className="px-8 pt-6 pb-2 flex items-center justify-between">
                <Typography
                    variant="h1"
                    className="text-2xl md:text-4xl font-bold"
                >
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
            </div>
        </header>
    );
}
