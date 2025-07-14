import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { useCycle } from '../../hooks/useCycle';
import { useToast } from '../../hooks/useToast';

import type { Collaborator } from '../../types/collaborator';

import { mockCollaborators } from '../../data/mockCollaborators';

import { getCollaborator360Evaluations } from '../../data/mockCollaborator360Data';
import { getCollaboratorSelfAssessment } from '../../data/mockCollaboratorSelfAssessment';

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
    const { currentCycle, isLoading } = useCycle();
    const { showToast } = useToast();
    
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
        if (collaboratorId) {
            // Buscar dados do colaborador
            const foundCollaborator = mockCollaborators.find(c => c.id === collaboratorId);
            if (foundCollaborator) {
                setCollaborator(foundCollaborator);
                
                // Buscar autoavaliação do colaborador
                const selfAssessment = getCollaboratorSelfAssessment(collaboratorId);
                setCollaboratorSelfAssessment(selfAssessment);
                
                // Buscar avaliações 360° recebidas pelo colaborador
                const { evaluations360, referencesReceived } = getCollaborator360Evaluations(collaboratorId);
                setEvaluations360(evaluations360);
                setReferencesReceived(referencesReceived);
                
                // Atualizar form values
                methods.setValue('collaboratorId', collaboratorId);
                if (currentCycle?.id) {
                    methods.setValue('cycleId', currentCycle.id);
                }
            } else {
                if (mockCollaborators.length > 0) {
                    showToast(
                        'Colaborador não encontrado',
                        'error',
                        { title: 'Erro', duration: 5000 }
                    );
                }
                navigate('/colaboradores');
            }
        }
    }, [collaboratorId, currentCycle, methods, navigate, showToast]);

    const handleSubmit = async (data: FullManagerEvaluationFormData) => {
        try {
            console.log('Dados da avaliação do manager:', data);
            
            // Simular envio para API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
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

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    if (!collaborator) {
        return <CollaboratorNotFoundMessage />;
    }

    if (currentCycle.isActive) {
        return (
            <StatusMessageCard
                icon={<span className="material-icons text-primary-500 text-4xl">hourglass_top</span>}
                title="Ciclo em andamento"
                message={
                    <>O ciclo de avaliação ainda está em andamento. A visualização das avaliações estará disponível quando o ciclo for fechado.</>
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
