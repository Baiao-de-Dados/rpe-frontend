import { useContext } from 'react';
import { CycleContext } from '../contexts/CycleContextDefinition';
import type { CycleContextType } from '../contexts/CycleContextDefinition';

export const useCycle = (): CycleContextType => {
    const context = useContext(CycleContext);
    if (context === undefined) {
        throw new Error('useCycle deve ser usado dentro de um CycleProvider');
    }
    return context;
};
