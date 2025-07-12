import DropdownButton from '../../common/DropdownButton';
import { useMemo } from 'react';

interface CycleDropdownButtonProps {
    cycles: string[];
    selectedCycle: string;
    onSelect: (cycle: string) => void;
}

function CycleDropdownButton({ cycles, selectedCycle, onSelect }: CycleDropdownButtonProps) {
    const sortedCycles = useMemo(() => 
        [...cycles].sort((a, b) => 
            b.localeCompare(a, undefined, { 
                numeric: true, 
                sensitivity: 'base' 
            })),
        [cycles]
    );

    return (
        <DropdownButton
            items={sortedCycles}
            selected={selectedCycle}
            onSelect={onSelect}
        />
    );
}

export default CycleDropdownButton;
