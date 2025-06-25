import { memo } from 'react';
import Button from '../Button';

const EvaluationSubmitButton = memo(() => {
    const isValid = true; // Replace with actual validation logic
    const isSubmitting = false; // Replace with actual submitting state

    const onSubmit = () => {
        // Replace with actual submit logic
        console.log('Form submitted');
    };

    return (
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
            {isSubmitting ? 'Enviando...' : 'Salvar'}
        </Button>
    );
});

export default EvaluationSubmitButton;
