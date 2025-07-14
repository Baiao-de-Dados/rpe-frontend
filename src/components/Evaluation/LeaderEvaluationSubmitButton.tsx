import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useLeaderEvaluationReadonly } from '../../contexts/LeaderEvaluationReadonlyContext';

import Button from '../common/Button';

import type { FullLeaderEvaluationFormData } from '../../schemas/leaderEvaluation';

const LeaderEvaluationSubmitButton = memo(() => {
    const { formState: { isSubmitting, isValid } } = useFormContext<FullLeaderEvaluationFormData>();
    const { readonly } = useLeaderEvaluationReadonly();
    if (readonly) return null;
    return (
        <Button
            type="submit"
            variant="primary"
            className="w-full sm:w-auto"
            disabled={isSubmitting || !isValid}
        >
            {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
        </Button>
    );
});

export default LeaderEvaluationSubmitButton;
