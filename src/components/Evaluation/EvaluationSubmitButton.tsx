import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import Button from '../common/Button';

import { useCycle } from '../../hooks/useCycle';
import { useToast } from '../../hooks/useToast';
import { useEvaluationSubmit } from '../../hooks/useEvaluationSubmit';

import type { EvaluationFormData } from '../../schemas/evaluation';

import { transformFormData, validateTransformedData } from './utils/evaluationTransform';

const EvaluationSubmitButton = memo(() => {

    const { handleSubmit, formState: { isValid } } = useFormContext<EvaluationFormData>();

    const { showToast } = useToast();

    const { currentCycle } = useCycle();

    const { submitEvaluation, isSubmitting } = useEvaluationSubmit();

    const onSubmit = () => {
        handleSubmit(async data => {
            try {
                const transformedData = transformFormData(data, currentCycle.name, '1');

                const validation = validateTransformedData(transformedData);
                if (validation !== true) {
                    showToast(
                        'Alguns campos obrigatórios não foram preenchidos ou contêm dados inválidos.', 
                        'error', {
                        title: 'Erro de Validação',
                        duration: 8000,
                    });
                    return;
                }

                console.log('Dados formatados para API:', JSON.stringify(transformedData, null, 2));

                await submitEvaluation();

            } catch (error) {
                console.error('Erro ao processar dados do formulário:', error);
                showToast(
                    'Ocorreu um erro inesperado ao processar suas informações. Verifique sua conexão e tente novamente.', 'error', {
                    title: 'Erro no Processamento',
                    duration: 7000,
                });
            }
        })();
    };

    return (
        <Button 
            variant="primary" 
            size="md" 
            disabled={!isValid || isSubmitting} 
            onClick={onSubmit} 
            className={`transition-all duration-200 
            ${!isValid || isSubmitting 
                ? 'bg-primary-200 text-primary-400 cursor-not-allowed hover:bg-primary-200' 
                : 'bg-primary-500 text-white hover:bg-primary-600 cursor-pointer'
            }`
        }>
            {isSubmitting ? 'Enviando...' : 'Concluir e enviar'}
        </Button>
    );
});

export default EvaluationSubmitButton;
