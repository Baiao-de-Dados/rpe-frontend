import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import Button from '../common/Button';

import type { FullManagerEvaluationFormData } from '../../schemas/managerEvaluation';

const ManagerEvaluationSubmitButton = memo(() => {

    const { handleSubmit, formState: { isValid, isSubmitting } } = useFormContext<FullManagerEvaluationFormData>();

    const onSubmit = () => {
        handleSubmit(async (data) => {
            // O submit real será feito no componente pai (página)
            // Este botão apenas ativa o handleSubmit do form
            console.log('Trigger submit for manager evaluation:', data);
        })();
    };

    return (
        <Button 
            variant="primary" 
            size="sm" // Tamanho menor para mobile
            disabled={!isValid || isSubmitting} 
            onClick={onSubmit} 
            className={`transition-all duration-200 sm:px-4 sm:py-2 px-3 py-1.5 text-xs sm:text-sm
            ${!isValid || isSubmitting 
                ? 'bg-primary-200 text-primary-400 cursor-not-allowed hover:bg-primary-200' 
                : 'bg-primary-500 text-white hover:bg-primary-600 cursor-pointer'
            }`
        }>
            {/* Texto mais curto no mobile */}
            <span className="sm:hidden">Concluir e Enviar</span>
            <span className="hidden sm:inline">{isSubmitting ? 'Enviando...' : 'Concluir e enviar'}</span>
        </Button>
    );
});

export default ManagerEvaluationSubmitButton;
