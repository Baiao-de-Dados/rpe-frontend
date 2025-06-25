import Typography from '../common/Typography';
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
        <header className="sticky top-0 z-50 bg-white flex flex-col justify-start shadow-sm">
            {/* Layout para desktop */}
            <div className="hidden lg:flex px-12 pt-12 pb-12 items-center justify-between">
                <Typography
                    variant="h1"
                    color="primary500"
                    className="text-4xl lg:text-4xl font-bold"
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

            {/* Layout para mobile */}
            <div className="lg:hidden flex flex-col pt-6 pb-6">
                {/* Título ao lado do ícone hambúrguer */}
                <div className="flex items-center mb-8 px-6">
                    <Typography
                        variant="h1"
                        color="primary500"
                        className="text-4xl font-bold leading-none ml-14"
                    >
                        Evolução
                    </Typography>
                </div>

                {/* Seletor de ciclos embaixo, alinhado com o ícone */}
                <div className="px-4">
                    <select
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 w-full max-w-xs"
                        value={selectedCycle}
                        onChange={e => onSelectCycle(e.target.value)}
                    >
                        <option value="all">Todos os ciclos</option>
                        {sortedCycles.map(cycle => (
                            <option
                                key={cycle.cycleName}
                                value={cycle.cycleName}
                            >
                                {cycle.cycleName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </header>
    );
}
