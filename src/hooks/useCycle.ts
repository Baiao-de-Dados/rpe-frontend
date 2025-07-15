
import { CycleContext } from '../contexts/CycleContextDefinition';
import type { CycleContextType } from '../contexts/CycleContextDefinition';
import { getRemainingDays } from '../utils/globalUtils';
import { getCycleStatus } from '../utils/cycleUtils';
import type { CycleStatus } from '../utils/cycleUtils';
import { useContext } from 'react';

export const useCycle = (): CycleContextType & { status?: CycleStatus } => {
    const context = useContext(CycleContext);
    if (context === undefined) {
        throw new Error('useCycle deve ser usado dentro de um CycleProvider');
    }
    let status: CycleStatus | undefined = undefined;
    if (context.currentCycle) {
        const { isActive, done, startDate, endDate } = context.currentCycle;
        const remainingDays = getRemainingDays({ startDate, endDate });
        status = getCycleStatus({ isActive, done, ...remainingDays });
    }
    return { ...context, status };
};
