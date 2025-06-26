import { memo } from 'react';
import Button from '../../common/Button';
import { useToast } from '../../../hooks/useToast';

interface TrackSubmitButtonProps {
    isCycleClosed: boolean;
    className?: string;
}

const TrackSubmitButton = memo(
    ({ isCycleClosed, className }: TrackSubmitButtonProps) => {
        const isValid = true;
        const isSubmitting = false;
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
                }${className ? ` ${className}` : ''}`}
            >
                {isSubmitting ? 'Enviando...' : 'Salvar trilhas'}
            </Button>
        );
    },
);

export default TrackSubmitButton;
