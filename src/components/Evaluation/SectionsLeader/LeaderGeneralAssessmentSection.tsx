import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useLeaderEvaluationReadonly } from '../../../contexts/LeaderEvaluationReadonlyContext';

import StarRating from '../../common/StarRating';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';
import Typography from '../../common/Typography';
import CardContainer from '../../common/CardContainer';

import type { FullLeaderEvaluationFormData } from '../../../schemas/leaderEvaluation';

export const LeaderGeneralAssessmentSection = memo(() => {

    const { control } = useFormContext<FullLeaderEvaluationFormData>();
    const { readonly } = useLeaderEvaluationReadonly();

    return (
        <section className="space-y-6">
            <CardContainer className="p-6">
                <Typography variant="h3" className="mb-6 text-primary-700">
                    Avaliação Geral do Líder 
                </Typography>

                <div className="space-y-6">
                    <Controller 
                        name="generalRating"
                        control={control}
                        render={({ field, fieldState }) => (
                            <div>
                                <Typography variant="h4" className="mb-3">
                                    Nota Geral do Colaborador*
                                </Typography>
                                <Typography variant="body" color="muted" className="mb-4">
                                    Dê uma nota de 1 a 5 para o liderado
                                </Typography>
                                <StarRating 
                                    value={field.value} 
                                    onChange={field.onChange}
                                    readOnly={readonly}
                                />
                                {fieldState.error?.message && (
                                    <Typography variant="caption" color="error" className="mt-2 block">
                                        {fieldState.error.message}
                                    </Typography>
                                )}
                            </div>
                        )}
                    />

                    <Controller 
                        name="generalJustification"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextAreaWithTitle
                                title="Justificativa da Nota Geral*"
                                placeholder="Explique o motivo da nota geral atribuída..."
                                value={field.value || ''}
                                onChange={field.onChange}
                                maxLength={2000}
                                error={fieldState.error?.message}
                                readOnly={readonly}
                            />
                        )}
                    />

                    <Controller 
                        name="strengths"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextAreaWithTitle
                                title="Pontos Fortes"
                                placeholder="Destaque os principais pontos fortes e qualidades do colaborador..."
                                value={field.value || ''}
                                onChange={field.onChange}
                                maxLength={1000}
                                error={fieldState.error?.message}
                                readOnly={readonly}
                            />
                        )}
                    />

                    <Controller 
                        name="improvements"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextAreaWithTitle
                                title="Pontos de Melhoria"
                                placeholder="Sugira áreas de desenvolvimento e melhorias estratégicas para o colaborador..."
                                value={field.value || ''}
                                onChange={field.onChange}
                                maxLength={1000}
                                error={fieldState.error?.message}
                                readOnly={readonly}
                            />
                        )}
                    />
                </div>
            </CardContainer>
        </section>
    );
});
