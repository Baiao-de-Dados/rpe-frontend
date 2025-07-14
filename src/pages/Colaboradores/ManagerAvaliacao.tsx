import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { useCycle } from '../../hooks/useCycle';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';
import { 
    useUserAutoEvaluation, 
    useManagerEvaluation,
    useCollaboratorEvaluationDetails,
    useCollaboratorAllEvaluations
} from '../../hooks/api/useManagerQuery';

import type { Collaborator } from '../../types/collaborator';

import CycleLoading from '../../components/common/CycleLoading';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import { ManagerEvaluationForm } from '../../components/Evaluation/ManagerEvaluationForm';
import CollaboratorNotFoundMessage from '../../components/Evaluation/CollaboratorNotFoundMessage';
import StatusMessageCard from '../../components/common/StatusMessageCard';

import { fullManagerEvaluationSchema, type FullManagerEvaluationFormData } from '../../schemas/managerEvaluation';

interface ManagerAvaliacaoProps {
    collaboratorId: number;
}

export function ManagerAvaliacao({ collaboratorId }: ManagerAvaliacaoProps) {
    const navigate = useNavigate();
    const { currentCycle, isLoading: cycleLoading } = useCycle();
    const { showToast } = useToast();
    const { user } = useAuth();
    
    const [collaborator, setCollaborator] = useState<Collaborator | null>({
        id: collaboratorId,
        name: `Colaborador ${collaboratorId}`,
        email: 'carregando@example.com',
        position: 'Carregando...',
        track: { 
            id: 1, 
            name: 'Default Track'
        },
    });
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

    // API queries
    const { data: userAutoEvaluation, isLoading: autoEvaluationLoading } = useUserAutoEvaluation(collaboratorId);
    const { data: collaboratorEvaluationDetails, isLoading: evaluationDetailsLoading } = useCollaboratorEvaluationDetails(
        collaboratorId,
        currentCycle?.id || 0
    );
    const { data: collaboratorAllEvaluations, isLoading: allEvaluationsLoading } = useCollaboratorAllEvaluations(collaboratorId);
    const managerEvaluationMutation = useManagerEvaluation();

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
            currentCycle: currentCycle?.id
        });

        if (collaboratorId && collaboratorEvaluationDetails?.collaborator) {
            // Criar objeto collaborator baseado nos dados da API
            const collaboratorData: Collaborator = {
                id: collaboratorEvaluationDetails.collaborator.id,
                name: collaboratorEvaluationDetails.collaborator.name,
                email: 'colaborador@example.com', // TODO: Adicionar email na API
                position: collaboratorEvaluationDetails.collaborator.position,
                track: { 
                    id: 1, 
                    name: 'Default Track' // TODO: Adicionar track na API
                },
            };
            
            console.log('Setting collaborator:', collaboratorData);
            setCollaborator(collaboratorData);
            
            // Só processar dados de avaliação se houver ciclo ativo
            if (collaboratorEvaluationDetails.cycle) {
                // Converter autoavaliação da API para o formato esperado
                if (collaboratorEvaluationDetails.autoEvaluation) {
                    const selfAssessment = collaboratorEvaluationDetails.autoEvaluation.pilares.flatMap((pilar) =>
                        pilar.criterios.map((criterio) => ({
                            pilarId: pilar.pilarId,
                            criterionId: criterio.criterioId,
                            rating: criterio.nota,
                            justification: criterio.justificativa,
                        }))
                    );
                    setCollaboratorSelfAssessment(selfAssessment);
                }
                
                // Converter avaliações 360° da API para o formato esperado
                if (collaboratorEvaluationDetails.evaluation360) {
                    const evaluations360Data = collaboratorEvaluationDetails.evaluation360.map((eval360) => ({
                        collaratorName: `Colaborador ${eval360.avaliadoId}`, // TODO: Obter nome real
                        collaboratorPosition: 'Desenvolvedor', // TODO: Obter posição real
                        rating: eval360.score,
                        improvements: eval360.pontosMelhoria,
                        strengths: eval360.pontosFortes,
                    }));
                    setEvaluations360(evaluations360Data);
                }
                
                // Converter referências da API para o formato esperado
                if (collaboratorEvaluationDetails.references) {
                    const referencesData = collaboratorEvaluationDetails.references.map((ref) => ({
                        collaratorName: `Colaborador ${ref.colaboradorId}`, // TODO: Obter nome real
                        collaboratorPosition: 'Desenvolvedor', // TODO: Obter posição real
                        justification: ref.justificativa,
                    }));
                    setReferencesReceived(referencesData);
                }
                
                // Atualizar form values
                methods.setValue('collaboratorId', collaboratorId);
                if (currentCycle?.id) {
                    methods.setValue('cycleId', currentCycle.id);
                }
            }
        }
    }, [collaboratorId, collaboratorEvaluationDetails, currentCycle, methods]);

    const handleSubmit = async (data: FullManagerEvaluationFormData) => {
        try {
            if (!user?.id || !currentCycle?.id || !collaborator) {
                throw new Error('Dados de usuário, ciclo ou colaborador não encontrados');
            }

            // Converter dados do form para o formato da API
            const payload = {
                managerId: user.id,
                collaboratorId: collaboratorId,
                cycleId: currentCycle.id,
                trackId: collaborator.track.id,
                criteria: data.managerAssessment.map(assessment => ({
                    criterionId: assessment.criterionId,
                    score: assessment.rating || 0,
                    // justification: assessment.justification, // Removido se backend não suportar
                })),
            };

            await managerEvaluationMutation.mutateAsync(payload);
            
            showToast(
                `Avaliação de ${collaborator?.name} enviada com sucesso!`,
                'success',
                {
                    title: 'Avaliação Enviada',
                    duration: 5000,
                }
            );
            
            // Redirecionar de volta para lista de colaboradores
            setTimeout(() => {
                navigate('/colaboradores');
            }, 1500);
            
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
        currentCycle: currentCycle?.id,
        collaborator,
        collaboratorId,
        collaboratorEvaluationDetails,
        userAutoEvaluation,
        collaboratorAllEvaluations
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
            cycleLoading
        });
        return <CollaboratorNotFoundMessage />;
    }

    // Verificar se há dados de avaliação disponíveis
    const hasEvaluationData = collaboratorEvaluationDetails?.cycle !== null;
    
    // Remover bloqueio para ciclo ativo - gestor deve poder ver sempre
    
    if (!hasEvaluationData) {
        return (
            <StatusMessageCard
                icon={<span className="material-icons text-primary-500 text-4xl">info</span>}
                title="Nenhum ciclo ativo"
                message={
                    <>Nenhum ciclo de avaliação ativo no momento. As avaliações estarão disponíveis quando um novo ciclo for iniciado.</>
                }
            />
        );
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <ManagerEvaluationForm 
                    collaborator={collaborator}
                    cycleName={currentCycle.name}
                    collaboratorSelfAssessment={collaboratorSelfAssessment}
                    evaluations360={evaluations360}
                    referencesReceived={referencesReceived}
                />
            </form>
        </FormProvider>
    );
}
