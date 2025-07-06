import { Sparkles } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../../components/common/Button';
import PageHeader from '../../components/common/PageHeader';
import CardContainer from '../../components/common/CardContainer';
import TextAreaWithTitle from '../../components/common/TextAreaWithTitle';
import AnotacoesStepsModal from '../../components/Notes/AnotacoesStepsModal';

import { useNotes } from '../../hooks/useNotes';
import { anotacoesSchema, type AnotacoesFormData } from '../../schemas/anotacoesSchema';

export default function Anotacoes() {

    const { control, handleSubmit, watch, formState: { isValid } } = useForm<AnotacoesFormData>({
        resolver: zodResolver(anotacoesSchema),
        mode: 'onChange',
        defaultValues: {
            text: '',
        },
    });
    
    const notes = useNotes();

    const textValue = watch('text');
    const isButtonDisabled = !isValid || textValue.trim().length === 0 || notes.isEvaluating || notes.isModalOpen;

    return (
        <>
            <AnotacoesStepsModal
                open={notes.isModalOpen}
                steps={notes.steps}
                avaliacaoSections={notes.evaluationSectionsToShow}
                onCancel={notes.handleModalCancel}
                onContinue={notes.handleModalContinue}
                canContinue={notes.canContinue}
            />
            <div className="min-h-screen">
                <PageHeader
                    title="Anotações"
                    button={
                        <Button 
                            type="submit" 
                            variant="primary" 
                            size="md" 
                            className="flex items-center gap-2"  
                            disabled={isButtonDisabled}
                            onClick={handleSubmit(notes.handleEvaluateWithAI)}
                        >
                            {notes.isEvaluating ? 'Avaliando...' : 'Avaliar com IA'}
                            <Sparkles size={18} />
                        </Button>
                    }
                />
                <div className="px-4 md:px-8">
                    <CardContainer className="mt-6 w-full md:p-8" shadow={false}>
                        <form onSubmit={handleSubmit(notes.handleEvaluateWithAI)}>
                            <div className="relative">
                                <Controller 
                                    name="text" 
                                    control={control}
                                    render={({ field }) => (
                                        <TextAreaWithTitle
                                            title="Escreva anotações sobre o seu cotidiano"
                                            placeholder="Descreva observações, feedbacks, pontos de melhoria e destaques no seu dia a dia de trabalho..."
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            readOnly={notes.isEvaluating}
                                            minHeight="min-h-[500px] md:min-h-[600px]"
                                            className="text-lg bg-[#f8fdfa]"
                                        />
                                    )}
                                />
                            </div>
                        </form>
                    </CardContainer>
                </div>
            </div>
        </>
    );
}
