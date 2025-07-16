import { useCycleGradesQuery } from '../../hooks/api/useCollaboratorQuery';

import PageHeader from '../common/PageHeader';
import DropdownButton from '../common/DropdownButton';

interface EvolutionHeaderProps {
    selectedCycle: string;
    onSelectCycle: (cycle: string) => void;
}

export function EvolutionHeader({ selectedCycle, onSelectCycle }: EvolutionHeaderProps) {
    const { data: cyclesGrades } = useCycleGradesQuery();
    const sortedCycles = cyclesGrades?.cycles
        ? cyclesGrades.cycles.slice().sort((a, b) => b.cycleName.localeCompare(a.cycleName)).map(cycle => cycle.cycleName)
        : [];

    const cyclesWithAll = ['Todos', ...sortedCycles];
    const selected = selectedCycle === 'all' ? 'Todos' : selectedCycle;

    const cycleSelector = (
        <DropdownButton
            items={cyclesWithAll}
            selected={selected}
            onSelect={item => onSelectCycle(item === 'Todos' ? 'all' : item)}
        />
    );

    return (
        <PageHeader
            title="Evolução"
            button={cycleSelector}
        />
    );
}
