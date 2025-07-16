import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { useCycle } from '../../hooks/useCycle';
import { useToast } from '../../hooks/useToast';
import { useCommitteeCollaboratorDetails, useCommitteeEqualization, useCommitteeSaveEqualization } from '../../hooks/api/useCommitteeQuery';

import { CommitteeEvaluationForm } from '../../components/Evaluation/CommitteeEvaluationForm';
import CycleLoading from '../../components/common/CycleLoading';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import CollaboratorNotFoundMessage from '../../components/Evaluation/CollaboratorNotFoundMessage';

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

    const isLoading = cycleLoading || detailsLoading || equalizationLoading;

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
        console.log('🎯 CommitteeAvaliacao: handleSaveEqualization chamada!');
        console.log('🎯 CommitteeAvaliacao: Dados do formulário:', data);
        
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
                    })
                },
            };

            console.log('🚀 Enviando payload para equalização:', payload);
            console.log('📡 URL esperada: POST /committee/equalization');
            console.log('🔍 Dados do formulário:', data);

            const response = await saveEqualizationMutation.mutateAsync(payload);
            
            console.log('✅ Resposta da API:', response);
            
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
        } catch (error: unknown) {
            console.error('❌ Erro ao salvar equalização:', error);
            console.error('❌ Detalhes do erro:', {
                message: (error as Error)?.message,
                status: (error as { response?: { status?: number } })?.response?.status,
                data: (error as { response?: { data?: unknown } })?.response?.data,
                url: (error as { config?: { url?: string } })?.config?.url,
                method: (error as { config?: { method?: string } })?.config?.method
            });
            showToast('Erro ao salvar a equalização.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    });

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
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
    const committeeEqualization = justSaved ? {
        finalScore: methods.getValues('committeeEqualization.finalScore'),
        comments: methods.getValues('committeeEqualization.comments'),
        committee: {
            id: 1, // TODO: Pegar do usuário logado
            name: 'Comitê',
            position: 'Membro'
        },
        lastUpdated: new Date().toISOString()
    } : collaboratorDetails.committeeEqualization;

    // Converter dados para o formato esperado pelo formulário
    const collaboratorSelfAssessment = autoEvaluation?.criteria || [];
    const referencesReceived: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        justification: string;
    }> = []; // TODO: Implementar referências se necessário

    // Converter evaluations360 para o formato esperado
    const formattedEvaluations360 = evaluations360.map(evaluation => ({
        collaratorName: evaluation.collaboratorName,
        collaboratorPosition: evaluation.collaboratorPosition,
        rating: evaluation.rating,
        improvements: evaluation.improvements,
        strengths: evaluation.strengths,
    }));

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen bg-[#FAFAFA]">
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
                    onEnterEditMode={() => {
                        console.log('🎯 CommitteeAvaliacao: Usuário entrou em modo de edição');
                        setJustSaved(false); // Resetar justSaved quando entrar em modo de edição
                    }}
                />
            </div>
        </FormProvider>
    );
}
