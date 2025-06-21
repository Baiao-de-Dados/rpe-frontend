import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from './Button';

const FloatingSubmitButton = memo(() => {
    const {
        handleSubmit,
        formState: { isValid },
    } = useFormContext();

    const onSubmit = () => {
        handleSubmit(data => {
            console.log('Form data:', data);
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
