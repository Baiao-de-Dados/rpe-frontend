import { memo } from 'react';
import Button from '../../common/Button';

interface TrackSubmitButtonProps {
    isCycleClosed: boolean;
    isSubmitting?: boolean;
    isValid?: boolean;
    className?: string;
}

const TrackSubmitButton = memo(({ isCycleClosed, isSubmitting = false, isValid = true, className }: TrackSubmitButtonProps) => {
    return (
        <Button variant="primary" size="md" disabled={!isValid || isSubmitting || !isCycleClosed} title={!isCycleClosed ? 'Não é possível editar pois o ciclo está aberto.' : undefined} className={`transition-all duration-200 ${!isValid || isSubmitting || !isCycleClosed ? 'bg-primary-200 text-primary-400 cursor-not-allowed hover:bg-primary-200' : 'bg-primary-500 text-white hover:bg-primary-600 cursor-pointer'}${className ? ` ${className}` : ''}`}>
            {isSubmitting ? 'Salvando...' : 'Salvar trilhas'}
        </Button>
    );
});

export default TrackSubmitButton;
