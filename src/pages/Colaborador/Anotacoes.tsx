import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formatDateTime } from '../../utils/globalUtils';

import Button from '../../components/common/Button';
import PageHeader from '../../components/common/PageHeader';
import CardContainer from '../../components/common/CardContainer';
import TextAreaWithTitle from '../../components/common/TextAreaWithTitle';
import AnotacoesStepsModal from '../../components/Notes/AnotacoesStepsModal';

import { useAuth } from '../../hooks/useAuth';
import { useCycle } from '../../hooks/useCycle';
import { useNotesAI } from '../../hooks/useNotesAI';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';
import { useNoteQuery, useUpsertNoteMutation } from '../../hooks/useNotesQuery';


import { anotacoesSchema, type AnotacoesFormData } from '../../schemas/anotacoesSchema';

export default function Anotacoes() {

    const notes = useNotesAI();
    const { user } = useAuth();
    const { variants } = useOptimizedAnimation();
    const { currentCycle: {isActive, id: cycleId} } = useCycle();

    const { data: noteData } = useNoteQuery(user!.id);
    const upsertMutation = useUpsertNoteMutation(user!.id);

    const { control, handleSubmit, watch, trigger, setValue, formState: { isValid } } = useForm<AnotacoesFormData>({
        resolver: zodResolver(anotacoesSchema),
        mode: 'onChange',
        defaultValues: {
            text: '',
        },
    });

    const [originalText, setOriginalText] = useState('');

    const textValue = watch('text');

    useEffect(() => {
        if (noteData && noteData.notes !== undefined) {
            setValue('text', noteData.notes);
            setOriginalText(noteData.notes);
            trigger('text');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteData, setValue]);

    const handleBlur = () => {
        if (textValue !== originalText) {
            upsertMutation.mutate({ notes: textValue });
            setOriginalText(textValue);
        }
    };

    const isButtonDisabled = !isValid || textValue.trim().length === 0 || notes.isEvaluating || notes.isModalOpen || !isActive;

    return (
        <>
            <AnotacoesStepsModal
                open={notes.isModalOpen}
                steps={notes.steps}
                error={notes.error}
                written={notes.written}
                applicable={notes.applicable}
                avaliacaoSections={notes.evaluationSectionsToShow}
                onCancel={notes.handleModalCancel}
                onContinue={notes.handleModalContinue}
                canContinue={notes.canContinue}
            />
            <div className="min-h-screen">
                <PageHeader title="Anotações"
                    button={
                        <Button 
                            type="submit" 
                            variant="primary" 
                            size="md" 
                            className="flex items-center gap-2"  
                            disabled={isButtonDisabled}
                            onClick={handleSubmit(() => notes.handleEvaluateWithAI(user!.id, cycleId!))}
                            title={!isActive ? 'Não há ciclo de avaliação aberto' : ''}
                        >
                            {notes.isEvaluating ? 'Avaliando...' : 'Avaliar com IA'}
                            <Sparkles size={18} />
                        </Button>
                    }
                />
                <div className="px-4 md:px-8">
                    <motion.div variants={variants.animatedCard} initial="hidden" animate="visible">
                        <CardContainer className="mt-6 w-full md:p-8" shadow={false}>
                            <form onSubmit={handleSubmit(() => notes.handleEvaluateWithAI(user!.id, cycleId!))}>
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
                                                minHeight="min-h-[500px] md:min-h-[600px]"
                                                className="text-lg bg-[#f8fdfa]"
                                                onBlur={handleBlur}
                                                rightLabel={noteData?.updatedAt ? (
                                                    <span className="text-xs text-gray-500">
                                                        Última atualização: {formatDateTime(noteData.updatedAt)}
                                                    </span>
                                                ) : null}
                                            />
                                        )}
                                    />
                                </div>
                            </form>
                        </CardContainer>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
