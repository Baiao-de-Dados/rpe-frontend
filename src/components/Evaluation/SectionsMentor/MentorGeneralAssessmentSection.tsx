import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import StarRating from '../../common/StarRating';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';
import Typography from '../../common/Typography';
import CardContainer from '../../common/CardContainer';

import type { FullMentorEvaluationFormData } from '../../../schemas/mentorEvaluation';

export const MentorGeneralAssessmentSection = memo(() => {

    const { control } = useFormContext<FullMentorEvaluationFormData>();

    return (
        <section className="space-y-6">
            <CardContainer className="p-6">
                <Typography variant="h3" className="mb-6 text-primary-700">
                    Avaliação Geral do Mentor
                </Typography>

                <div className="space-y-6">
                    {/* Nota Geral */}
                    <Controller 
                        name="generalRating"
                        control={control}
                        render={({ field, fieldState }) => (
                            <div>
                                <Typography variant="h4" className="mb-3">
                                    Nota Geral do Colaborador
                                </Typography>
                                <Typography variant="body" color="muted" className="mb-4">
                                    Considerando todos os critérios avaliados, qual seria sua nota geral para este colaborador?
                                </Typography>
                                <StarRating 
                                    value={field.value} 
                                    onChange={field.onChange}
                                />
                                {fieldState.error?.message && (
                                    <Typography variant="caption" color="error" className="mt-2 block">
                                        {fieldState.error.message}
                                    </Typography>
                                )}
                            </div>
                        )}
                    />

                    {/* Justificativa Geral */}
                    <Controller 
                        name="generalJustification"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextAreaWithTitle
                                title="Justificativa da Nota Geral"
                                placeholder="Explique de forma abrangente o motivo da nota geral atribuída, considerando os critérios avaliados e o desempenho geral do colaborador..."
                                value={field.value || ''}
                                onChange={field.onChange}
                                maxLength={2000}
                                error={fieldState.error?.message}
                            />
                        )}
                    />

                    {/* Pontos Fortes */}
                    <Controller 
                        name="strengths"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextAreaWithTitle
                                title="Pontos Fortes (Opcional)"
                                placeholder="Destaque os principais pontos fortes e qualidades do colaborador..."
                                value={field.value || ''}
                                onChange={field.onChange}
                                maxLength={1000}
                                error={fieldState.error?.message}
                            />
                        )}
                    />

                    {/* Pontos de Melhoria */}
                    <Controller 
                        name="improvements"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextAreaWithTitle
                                title="Pontos de Melhoria (Opcional)"
                                placeholder="Sugira áreas de desenvolvimento e melhorias para o colaborador..."
                                value={field.value || ''}
                                onChange={field.onChange}
                                maxLength={1000}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
            </CardContainer>
        </section>
    );
});
