import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import Button from '../common/Button';

import type { FullLeaderEvaluationFormData } from '../../schemas/leaderEvaluation';

const LeaderEvaluationSubmitButton = memo(() => {
    const { formState: { isSubmitting } } = useFormContext<FullLeaderEvaluationFormData>();

    return (
        <Button
            type="submit"
            variant="primary"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
        >
            {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
        </Button>
    );
});

export default LeaderEvaluationSubmitButton;
