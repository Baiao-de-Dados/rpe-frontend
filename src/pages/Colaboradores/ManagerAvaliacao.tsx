import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { useCycle } from '../../hooks/useCycle';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';
import { 
    useUserAutoEvaluation, 
    useManagerEvaluation,
    useManagerEvaluationQuery,
    useCollaboratorEvaluationDetails,
    useCollaboratorAllEvaluations
} from '../../hooks/api/useManagerQuery';

import type { Collaborator } from '../../types/collaborator';

import CycleLoading from '../../components/common/CycleLoading';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import { ManagerEvaluationForm } from '../../components/Evaluation/ManagerEvaluationForm';
import CollaboratorNotFoundMessage from '../../components/Evaluation/CollaboratorNotFoundMessage';
// StatusMessageCard removido pois não está sendo usado

import { fullManagerEvaluationSchema, type FullManagerEvaluationFormData } from '../../schemas/managerEvaluation';
import { transformManagerEvaluationData } from '../../components/Evaluation/utils/evaluationTransform';
// useRef removido pois não está sendo usado

interface ManagerAvaliacaoProps {
    collaboratorId: number;
}

export function ManagerAvaliacao({ collaboratorId }: ManagerAvaliacaoProps) {
    const navigate = useNavigate();
    const { currentCycle, isLoading: cycleLoading } = useCycle();
    const { showToast } = useToast();
    const { user } = useAuth();
    
    const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
    const [collaboratorSelfAssessment, setCollaboratorSelfAssessment] = useState<Array<{
        pilarId: number;
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>>([]);
    const [evaluations360, setEvaluations360] = useState<Array<{
        collaratorName: string;
        collaboratorPosition: string;
        rating: number;
        improvements: string;
        strengths: string;
    }>>([]);
    const [referencesReceived, setReferencesReceived] = useState<Array<{
        collaratorName: string;
        collaboratorPosition: string;
        justification: string;
    }>>([]);
    const [allCriteria, setAllCriteria] = useState<Array<{
        id: number;
        nome: string;
        pilarId: number;
        pilarNome: string;
        weight?: number;
    }>>([]);

    // API queries - usar cycleConfigId em vez de cycleId
    const { data: userAutoEvaluation, isLoading: autoEvaluationLoading } = useUserAutoEvaluation(collaboratorId);
    const { data: collaboratorEvaluationDetails, isLoading: evaluationDetailsLoading } = useCollaboratorEvaluationDetails(
        collaboratorId,
        currentCycle?.id || 0
    );
    const { data: collaboratorAllEvaluations, isLoading: allEvaluationsLoading } = useCollaboratorAllEvaluations(collaboratorId);
    const { data: managerEvaluationResponse, isLoading: managerEvaluationLoading } = useManagerEvaluationQuery(
        collaboratorId,
        currentCycle?.id || 0
    );

    console.log('ManagerAvaliacao cycle debug:', {
        currentCycle,
        currentCycleId: currentCycle?.id,
        hasCurrentCycle: !!currentCycle
    });
    const managerEvaluationMutation = useManagerEvaluation();

    console.log('ManagerAvaliacao API debug:', {
        collaboratorId,
        currentCycleId: currentCycle?.id,
        cycleConfigId: currentCycle?.id || 0
    });

    const methods = useForm<FullManagerEvaluationFormData>({
        resolver: zodResolver(fullManagerEvaluationSchema),
        mode: 'onSubmit',
        defaultValues: {
            collaboratorId: collaboratorId,
            cycleId: currentCycle?.id,
            managerAssessment: [],
        }
    });

    useEffect(() => {
        console.log('ManagerAvaliacao useEffect:', {
            collaboratorId,
            collaboratorEvaluationDetails,
            currentCycle: currentCycle?.id,
            evaluationDetailsLoading
        });

        // Se temos dados do colaborador da API, usar eles
        if (collaboratorId && collaboratorEvaluationDetails?.user) {
            const collaboratorData: Collaborator = {
                id: collaboratorEvaluationDetails.user.id,
                name: collaboratorEvaluationDetails.user.name,
                email: 'colaborador@example.com', // TODO: Adicionar email na API
                position: 'Desenvolvedor', // TODO: Adicionar posição na API
                track: { 
                    id: 1, 
                    name: collaboratorEvaluationDetails.user.track || 'Desenvolvimento'
                },
            };
            setCollaborator(collaboratorData);

            // Extrair dados da autoavaliação do colaborador
            if (collaboratorEvaluationDetails.autoEvaluation?.pilares) {
                const selfAssessmentData = collaboratorEvaluationDetails.autoEvaluation.pilares.flatMap(pilar =>
                    pilar.criterios.map(criterio => ({
                        pilarId: pilar.pilarId,
                        criterionId: criterio.criterioId,
                        rating: criterio.nota,
                        justification: criterio.justificativa,
                    }))
                );
                setCollaboratorSelfAssessment(selfAssessmentData);
            }

            // Extrair dados das avaliações 360°
            if (collaboratorEvaluationDetails.evaluation360) {
                const evaluations360Data = collaboratorEvaluationDetails.evaluation360.map(evaluation => ({
                    collaratorName: 'Colaborador', // TODO: Buscar nome real
                    collaboratorPosition: 'Desenvolvedor', // TODO: Buscar posição real
                    rating: evaluation.score,
                    improvements: evaluation.pontosMelhoria,
                    strengths: evaluation.pontosFortes,
                }));
                setEvaluations360(evaluations360Data);
            }

            // Extrair dados das referências
            if (collaboratorEvaluationDetails.reference) {
                const referencesData = collaboratorEvaluationDetails.reference.map(ref => ({
                    collaratorName: 'Colaborador', // TODO: Buscar nome real
                    collaboratorPosition: 'Desenvolvedor', // TODO: Buscar posição real
                    justification: ref.justificativa,
                }));
                setReferencesReceived(referencesData);
            }
        }
    }, [collaboratorId, collaboratorEvaluationDetails, evaluationDetailsLoading, currentCycle?.id]);

    // Extrair dados da avaliação do manager para mostrar em modo read-only
    const managerEvaluationData = useMemo(() => {
        if (!managerEvaluationResponse?.autoavaliacao?.pilares) {
            return [];
        }

        // Extrair todos os critérios dos pilares da avaliação do manager
        return managerEvaluationResponse.autoavaliacao.pilares.flatMap(pilar =>
            pilar.criterios.map(criterio => ({
                pilarId: pilar.pilarId,
                criterionId: criterio.criterioId,
                rating: criterio.nota,
                justification: criterio.justificativa,
            }))
        );
    }, [managerEvaluationResponse]);

    // Verificar se a avaliação do manager já foi enviada
    const managerEvaluationAlreadySubmitted = useMemo(() => {
        // Verificar se há dados de avaliação do manager (pilares com critérios)
        const hasManagerEvaluation = managerEvaluationResponse?.autoavaliacao?.pilares && 
            managerEvaluationResponse.autoavaliacao.pilares.length > 0 &&
            managerEvaluationResponse.autoavaliacao.pilares.some(pilar => 
                pilar.criterios && pilar.criterios.length > 0
            );
        
        console.log('Manager evaluation already submitted check:', {
            hasManagerEvaluation,
            managerEvaluationResponse,
            hasPilares: !!managerEvaluationResponse?.autoavaliacao?.pilares,
            pilaresLength: managerEvaluationResponse?.autoavaliacao?.pilares?.length,
            hasCriterios: managerEvaluationResponse?.autoavaliacao?.pilares?.some(pilar => 
                pilar.criterios && pilar.criterios.length > 0
            )
        });
        
        return hasManagerEvaluation;
    }, [managerEvaluationResponse]);

    console.log('ManagerAvaliacao managerEvaluation debug:', {
        collaboratorEvaluationDetails,
        managerEvaluationResponse,
        managerEvaluationAlreadySubmitted,
        managerEvaluationData,
        criteriaCount: managerEvaluationData.length
    });

    // Reset do formulário quando há dados da avaliação do manager
    useEffect(() => {
        if (managerEvaluationAlreadySubmitted && managerEvaluationData.length > 0 && allCriteria.length > 0) {
            console.log('Resetting form with manager evaluation data:', managerEvaluationData);
            // Ordenar os dados conforme a ordem dos critérios
            const orderedFormData = allCriteria.map(criterion => {
                const found = managerEvaluationData.find(
                    d => d.criterionId === criterion.id
                );
                return {
                    pilarId: found?.pilarId ?? criterion.pilarId,
                    criterionId: criterion.id,
                    rating: found?.rating ?? null,
                    justification: found?.justification ?? '',
                };
            });
            console.log('Ordered form data to reset:', orderedFormData);
            methods.reset({
                collaboratorId: collaboratorId,
                cycleId: currentCycle?.id,
                managerAssessment: orderedFormData,
            });
        }
    }, [managerEvaluationAlreadySubmitted, managerEvaluationData, methods, collaboratorId, currentCycle?.id, allCriteria]);

    const handleSubmit = async (data: FullManagerEvaluationFormData) => {
        try {
            if (!user?.id || !currentCycle?.id || !collaborator) {
                throw new Error('Dados de usuário, ciclo ou colaborador não encontrados');
            }

            // Transformar dados do form para o formato da API
            const payload = transformManagerEvaluationData(data, user.id, currentCycle.id || 0, collaboratorId);

            console.log('ManagerAvaliacao handleSubmit debug:', {
                user: user.id,
                collaboratorId,
                currentCycle: currentCycle.id || 0,
                trackId: collaborator.track.id,
                formData: data,
                payload,
                collaborator
            });

            await managerEvaluationMutation.mutateAsync(payload);
            
            console.log('Manager evaluation submitted successfully, invalidating cache...');
            
            showToast(
                `Avaliação de ${collaborator?.name} enviada com sucesso!`,
                'success',
                {
                    title: 'Avaliação Enviada',
                    duration: 5000,
                }
            );
            
            // Aguardar um pouco antes de redirecionar para garantir que o cache seja invalidado
            setTimeout(() => {
                navigate('/colaboradores');
            }, 2000);
            
        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
            showToast(
                'Erro ao enviar avaliação. Tente novamente.',
                'error',
                {
                    title: 'Erro no Envio',
                    duration: 7000,
                }
            );
        }
    };

    const isLoading = cycleLoading || autoEvaluationLoading || evaluationDetailsLoading || allEvaluationsLoading;

    console.log('ManagerAvaliacao render:', {
        isLoading,
        cycleLoading,
        autoEvaluationLoading,
        evaluationDetailsLoading,
        allEvaluationsLoading,
        managerEvaluationLoading,
        currentCycle: currentCycle?.id,
        collaborator,
        collaboratorId,
        collaboratorEvaluationDetails,
        userAutoEvaluation,
        collaboratorAllEvaluations,
        managerEvaluationResponse,
        managerEvaluationAlreadySubmitted
    });

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    if (!collaborator) {
        console.log('Collaborator not found, showing CollaboratorNotFoundMessage');
        console.log('Debug info:', {
            collaboratorId,
            currentCycle: currentCycle?.id,
            collaboratorEvaluationDetails,
            evaluationDetailsLoading,
            cycleLoading,
            managerEvaluationResponse,
            managerEvaluationLoading
        });
        return <CollaboratorNotFoundMessage />;
    }

    // Permitir que o gestor veja a avaliação mesmo sem dados de ciclo ativo
    // O gestor deve poder avaliar colaboradores sempre
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <ManagerEvaluationForm 
                    collaborator={collaborator}
                    cycleName={currentCycle.name || 'Ciclo Atual'}
                    collaboratorSelfAssessment={collaboratorSelfAssessment}
                    evaluations360={evaluations360}
                    referencesReceived={referencesReceived}
                    isReadOnly={managerEvaluationAlreadySubmitted}
                    managerEvaluationData={managerEvaluationData}
                    onCriteriaExtracted={setAllCriteria}
                />
            </form>
        </FormProvider>
    );
}
