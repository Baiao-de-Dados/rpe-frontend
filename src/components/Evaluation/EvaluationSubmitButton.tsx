import { memo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../Button';
import type { EvaluationFormData } from '../../schemas/evaluation';
import {
    transformFormData,
    validateTransformedData,
} from '../../utils/evaluationTransform';
import { useCycle } from '../../hooks/useCycle';
import { useToast } from '../../hooks/useToast';

const EvaluationSubmitButton = memo(() => {
    const {
        handleSubmit,
        formState: { isValid },
    } = useFormContext<EvaluationFormData>();

    const { currentCycle, submitEvaluation } = useCycle();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = () => {
        handleSubmit(async data => {
            try {
                setIsSubmitting(true);

                const transformedData = transformFormData(
                    data,
                    currentCycle?.id || '2025.1',
                    '1',
                );

                const validation = validateTransformedData(transformedData);
                if (validation !== true) {
                    console.error('Erro na validação dos dados:', validation);
                    showToast(
                        'Alguns campos obrigatórios não foram preenchidos ou contêm dados inválidos.',
                        'error',
                        {
                            title: 'Erro de Validação',
                            duration: 8000,
                        },
                    );
                    return;
                }

                console.log(
                    'Dados formatados para API:',
                    JSON.stringify(transformedData, null, 2),
                );

                const success = await submitEvaluation();

                if (success) {
                    console.log('Avaliação enviada com sucesso!');
                }
            } catch (error) {
                console.error('Erro ao processar dados do formulário:', error);
                showToast(
                    'Ocorreu um erro inesperado ao processar suas informações. Verifique sua conexão e tente novamente.',
                    'error',
                    {
                        title: 'Erro no Processamento',
                        duration: 7000,
                    },
                );
            } finally {
                setIsSubmitting(false);
            }
        })();
    };

    return (
        <div className="fixed top-[5.5rem] right-8 z-[100]">
            <Button
                variant="primary"
                size="md"
                disabled={!isValid || isSubmitting}
                onClick={onSubmit}
                className={`transition-all duration-200 ${
                    !isValid || isSubmitting
                        ? 'bg-primary-200 text-primary-400 cursor-not-allowed hover:bg-primary-200'
                        : 'bg-primary-500 text-white hover:bg-primary-600 cursor-pointer'
                }`}
            >
                {isSubmitting ? 'Enviando...' : 'Concluir e enviar'}
            </Button>
        </div>
    );
});

export default EvaluationSubmitButton;
