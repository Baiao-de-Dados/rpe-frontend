import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../Button';
import type { EvaluationFormData } from '../../schemas/evaluation';
import {
    transformFormData,
    validateTransformedData,
} from '../../utils/evaluationTransform';

const FloatingSubmitButton = memo(() => {
    const {
        handleSubmit,
        formState: { isValid },
    } = useFormContext<EvaluationFormData>();

    const onSubmit = () => {
        handleSubmit(data => {
            try {
                const transformedDataMock = {
                    cicle: '2025.1',
                    collaboratorId: '1',
                };
                const transformedData = transformFormData(
                    data,
                    transformedDataMock.cicle,
                    transformedDataMock.collaboratorId,
                );

                console.log(
                    'Dados do formulário:',
                    JSON.stringify(data, null, 2),
                );

                const validation = validateTransformedData(transformedData);
                if (validation !== true) {
                    console.error('Erro na validação dos dados:', validation);
                    return;
                }

                console.log(
                    'Dados formatados para API:',
                    JSON.stringify(transformedData, null, 2),
                );
            } catch (error) {
                console.error('Erro ao processar dados do formulário:', error);
            }
        })();
    };

    return (
        <div className="fixed top-[5.5rem] right-8 z-[100]">
            <Button
                variant="primary"
                size="md"
                disabled={!isValid}
                onClick={onSubmit}
                className={`transition-all duration-200 ${
                    !isValid
                        ? 'bg-primary-200 text-primary-400 cursor-not-allowed hover:bg-primary-200'
                        : 'bg-primary-500 text-white hover:bg-primary-600 cursor-pointer'
                }`}
            >
                Concluir e enviar
            </Button>
        </div>
    );
});

export default FloatingSubmitButton;
