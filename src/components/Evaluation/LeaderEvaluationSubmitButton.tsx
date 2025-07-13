import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import Button from '../common/Button';

import type { FullLeaderEvaluationFormData } from '../../schemas/leaderEvaluation';

const LeaderEvaluationSubmitButton = memo(() => {

    const { formState: { isSubmitting, isValid } } = useFormContext<FullLeaderEvaluationFormData>();

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
