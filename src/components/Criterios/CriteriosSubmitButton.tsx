import { memo } from 'react';
import Button from '../Button';
import { useToast } from '../../hooks/useToast';

const CriteriosSubmitButton = memo(
    ({ isCycleClosed }: { isCycleClosed: boolean }) => {
        const isValid = true; // Replace with actual validation logic
        const isSubmitting = false; // Replace with actual submitting state
        const { showToast } = useToast();

        const onSubmit = () => {
            if (!isCycleClosed) {
                showToast(
                    'Não é possível editar pois o ciclo está aberto.',
                    'error',
                    { title: 'Edição não permitida', duration: 5000 },
                );
                return;
            }
            // Replace with actual submit logic
            console.log('Form submitted');
        };

        return (
            <Button
                variant="primary"
                size="md"
                disabled={!isValid || isSubmitting || !isCycleClosed}
                onClick={onSubmit}
                title={
                    !isCycleClosed
                        ? 'Não é possível editar pois o ciclo está aberto.'
                        : undefined
                }
                className={`transition-all duration-200 ${
                    !isValid || isSubmitting || !isCycleClosed
                        ? 'bg-primary-200 text-primary-400 cursor-not-allowed hover:bg-primary-200'
                        : 'bg-primary-500 text-white hover:bg-primary-600 cursor-pointer'
                }`}
            >
                {isSubmitting ? 'Enviando...' : 'Salvar'}
            </Button>
        );
    },
);

export default CriteriosSubmitButton;
