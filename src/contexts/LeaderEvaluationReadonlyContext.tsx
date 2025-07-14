import { createContext, useContext } from 'react';
import type { FullLeaderEvaluationFormData } from '../schemas/leaderEvaluation';

export const LeaderEvaluationReadonlyContext = createContext<{
    readonly: boolean;
    setReadonly: (value: boolean) => void;
    evaluationData?: Partial<FullLeaderEvaluationFormData>;
} | undefined>(undefined);

export function useLeaderEvaluationReadonly() {
    const context = useContext(LeaderEvaluationReadonlyContext);
    if (!context) {
        throw new Error('useLeaderEvaluationReadonly must be used within a LeaderEvaluationReadonlyContext.Provider');
    }
    return context;
}
