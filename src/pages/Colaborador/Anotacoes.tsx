import { Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import CardContainer from '../../components/common/CardContainer';
import AnotacoesStepsModal from '../../components/Notes/AnotacoesStepsModal';

import { useAnotacoes } from '../../hooks/useAnotacoes';
import { anotacoesSchema, type AnotacoesFormData } from '../../schemas/anotacoesSchema';

export default function Anotacoes() {

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<AnotacoesFormData>({
        resolver: zodResolver(anotacoesSchema),
        mode: 'onChange',
        defaultValues: {
            text: '',
        },
    });
    
    const anotacoes = useAnotacoes();

    const textValue = watch('text');
    const isButtonDisabled = !isValid || textValue.trim().length === 0 || anotacoes.isAvaliando || anotacoes.modalOpen;

    return (
        <>
            <AnotacoesStepsModal
                open={anotacoes.modalOpen}
                steps={anotacoes.steps}
                avaliacaoSections={anotacoes.avaliacaoSectionsToShow}
                onCancel={anotacoes.handleModalCancel}
                onContinue={anotacoes.handleModalContinue}
                canContinue={anotacoes.canContinue}
            />
            <div className="w-full flex justify-center py-9 px-2 md:px-8">
                <CardContainer className="w-full min-h-[800px] p-15 pb-0">
                    <form onSubmit={handleSubmit(anotacoes.handleAvaliarComIA)}>
                        <div className="flex items-center justify-between mb-10 gap-8">
                            <Typography variant="h1" className="text-3xl font-bold mb-0">
                                Anotações
                            </Typography>
                            <div className="flex gap-3">
                                <Button type="submit" variant="primary" size="md" className="flex items-center gap-2"  disabled={isButtonDisabled}>
                                    {anotacoes.isAvaliando ? 'Avaliando...' : 'Avaliar com IA'}
                                    <Sparkles size={18} />
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <textarea className={`w-full min-h-[600px] border rounded-lg p-4 text-lg mb-8 resize-none focus:outline-primary-500 focus:bg-white transition-colors bg-[#f8fdfa] 
                            ${errors.text ? 'border-red-500' : 'border-green-100'}`}
                                {...register('text')}
                                placeholder="Escreva suas anotações aqui..."
                                readOnly={anotacoes.isAvaliando} 
                            />
                        </div>
                    </form>
                </CardContainer>
            </div>
        </>
    );
}
