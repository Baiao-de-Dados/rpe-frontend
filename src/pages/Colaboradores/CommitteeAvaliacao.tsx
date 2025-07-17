import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { useCycle } from '../../hooks/useCycle';
import { useToast } from '../../hooks/useToast';
import { useCommitteeCollaboratorDetails, useCommitteeEqualization, useCommitteeSaveEqualization, useCommitteeGenerateAiSummary, useCommitteeAiSummary, useCommitteeExportEvaluations } from '../../hooks/api/useCommitteeQuery';

import CycleLoading from '../../components/common/CycleLoading';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import CycleInProgressMessage from '../../components/CycleMessages/CycleInProgressMessage';
import CollaboratorNotFoundMessage from '../../components/Evaluation/CollaboratorNotFoundMessage';

import { CommitteeEvaluationForm } from '../../components/Evaluation/CommitteeEvaluationForm';

export function CommitteeAvaliacao({ collaboratorId }: { collaboratorId: number }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [justSaved, setJustSaved] = useState(false);
    const { showToast } = useToast();
    const { currentCycle, isLoading: cycleLoading } = useCycle();
    const queryClient = useQueryClient();

    // API queries
    const { data: collaboratorDetails, isLoading: detailsLoading } = useCommitteeCollaboratorDetails(
        collaboratorId,
        currentCycle?.id || 0
    );
    const { data: existingEqualization, isLoading: equalizationLoading } = useCommitteeEqualization(
        collaboratorId,
        currentCycle?.id || 0
    );
    const saveEqualizationMutation = useCommitteeSaveEqualization();
    
    // ✅ NOVO: Hook para geração de resumo da IA
    const aiSummaryGeneration = useCommitteeGenerateAiSummary();
    
    // ✅ NOVO: Hook para buscar resumo da IA salvo
    const { data: aiSummary, isLoading: aiSummaryLoading } = useCommitteeAiSummary(
        collaboratorId,
        currentCycle?.id || 0
    );
    
    // ✅ NOVO: Hook para exportar relatório
    const exportEvaluationsMutation = useCommitteeExportEvaluations();

    const isLoading = cycleLoading || detailsLoading || equalizationLoading || aiSummaryLoading;

    // Formulário para dados do comitê
    const methods = useForm({
        defaultValues: {
            committeeEqualization: {
                finalScore: 0,
                comments: '',
                changeReason: '', // ✅ NOVO: motivo da mudança
            },
        }
    });

    // Preencher formulário com dados existentes
    useEffect(() => {
        if (existingEqualization && existingEqualization.score !== undefined) {
            methods.setValue('committeeEqualization.finalScore', existingEqualization.score as number);
            methods.setValue('committeeEqualization.comments', existingEqualization.justification);
            // Não preencher changeReason pois é apenas para novas mudanças
        }
    }, [existingEqualization, methods]);
    
    // ✅ CORREÇÃO: Inicializar justSaved baseado se já existe equalização
    useEffect(() => {
        if (collaboratorDetails?.committeeEqualization) {
            setJustSaved(true); // Já existe equalização, deve estar em modo readonly
        } else {
            setJustSaved(false); // Não existe equalização, deve estar em modo de edição
        }
    }, [collaboratorDetails?.committeeEqualization]);

    const handleSaveEqualization = methods.handleSubmit(async (data) => {
        if (!currentCycle) {
            showToast('Ciclo não encontrado', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                cycleConfigId: currentCycle.id || 0,
                collaboratorId: collaboratorId,
                equalization: {
                    score: data.committeeEqualization.finalScore,
                    justification: data.committeeEqualization.comments,
                    // ✅ NOVO: Incluir changeReason apenas se for uma atualização e o campo não estiver vazio
                    ...(existingEqualization && data.committeeEqualization.changeReason?.trim() && {
                        changeReason: data.committeeEqualization.changeReason.trim()
                    }),
                    // ✅ CORREÇÃO: Remover aiSummary do payload - deve ser independente da avaliação
                },
            };

            const response = await saveEqualizationMutation.mutateAsync(payload);
            
            // ✅ CORREÇÃO: Forçar atualização imediata dos dados
            await queryClient.refetchQueries({ 
                queryKey: ['committee-collaborator-details', collaboratorId, currentCycle?.id || 0] 
            });
            await queryClient.refetchQueries({ 
                queryKey: ['committee-equalization', collaboratorId, currentCycle?.id || 0] 
            });
            
            // ✅ CORREÇÃO: Marcar como recém salvo para atualizar a interface
            setJustSaved(true);
            
            // ✅ NOVO: Mostrar mensagem específica se foi uma atualização
            if (response.data?.history) {
                showToast(`Equalização atualizada com sucesso! Nota alterada de ${response.data.history.previousScore} para ${response.data.history.newScore}`, 'success');
            } else {
                showToast('Equalização salva com sucesso!', 'success');
            }
        } catch {
            showToast('Erro ao salvar a equalização.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    });

    // ✅ NOVO: Handler para geração de resumo da IA
    const handleGenerateAiSummary = () => {
        if (!currentCycle) {
            showToast('Ciclo não encontrado', 'error');
            return;
        }
        aiSummaryGeneration.generateSummary(collaboratorId, currentCycle.id || 0);
    };

    // ✅ NOVO: Handler para exportar relatório
    const handleExportReport = () => {
        if (!currentCycle) {
            showToast('Ciclo não encontrado', 'error');
            return;
        }
        exportEvaluationsMutation.mutate(currentCycle.id || 0);
    };

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    // ✅ CORREÇÃO: Comitê só pode fazer equalizações quando o ciclo estiver fechado
    if (currentCycle.isActive) {
        return <CycleInProgressMessage cycleName={currentCycle?.name} className="mb-6" />;
    }

    if (!collaboratorDetails) {
        return <CollaboratorNotFoundMessage />;
    }

    // Extrair dados do colaborador
    const collaborator = collaboratorDetails.collaborator;
    const autoEvaluation = collaboratorDetails.autoEvaluation;
    const evaluations360 = collaboratorDetails.evaluation360;
    const managerEvaluation = collaboratorDetails.managerEvaluation;
    
    // ✅ CORREÇÃO: Usar justSaved para determinar se há equalização
    const committeeEqualization = collaboratorDetails.committeeEqualization;
    
    // ✅ DEBUG: Log dos dados do backend
    console.log('🎯 CommitteeAvaliacao: Dados do backend:', {
        collaboratorDetails,
        committeeEqualization,
        aiSummary: collaboratorDetails?.committeeEqualization?.aiSummary
    });

    // Converter dados para o formato esperado pelo formulário
    const collaboratorSelfAssessment = autoEvaluation?.criteria || [];
    const referencesReceived: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        justification: string;
    }> = []; // TODO: Implementar referências se necessário

    // Converter evaluations360 para o formato esperado
    const formattedEvaluations360 = evaluations360.map(evaluation => ({
        collaratorName: evaluation.collaratorName,
        collaboratorPosition: evaluation.collaboratorPosition,
        rating: evaluation.rating,
        improvements: evaluation.improvements,
        strengths: evaluation.strengths,
    }));
    
    return (
        <FormProvider {...methods}>
            <div className="min-h-screen bg-[#FAFAFA]">
                {/* Modal removido - agora apenas texto "Gerando resumo..." no SummaryBox */}
                
                <CommitteeEvaluationForm
                    collaborator={collaborator}
                    cycleName={currentCycle.name || 'Ciclo Atual'}
                    collaboratorSelfAssessment={collaboratorSelfAssessment}
                    evaluations360={formattedEvaluations360}
                    referencesReceived={referencesReceived}
                    isSubmitting={isSubmitting}
                    onSaveEqualization={handleSaveEqualization}
                    autoEvaluation={autoEvaluation}
                    managerEvaluation={managerEvaluation}
                    committeeEqualization={committeeEqualization}
                    isReadOnly={justSaved}
                    // ✅ NOVO: Props para geração de resumo da IA
                    onGenerateAiSummary={handleGenerateAiSummary}
                    hasAiSummary={!!collaboratorDetails?.committeeEqualization?.aiSummary || !!aiSummary?.aiSummary}
                    aiSummary={aiSummary}
                    // ✅ NOVO: Props para exportar relatório
                    onExportReport={handleExportReport}
                    isGeneratingSummary={aiSummaryGeneration.isGenerating}
                />
            </div>
        </FormProvider>
    );
}
