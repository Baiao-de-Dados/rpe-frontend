import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { fullManagerEvaluationSchema, type FullManagerEvaluationFormData } from '../../schemas/managerEvaluation';

import { ManagerEvaluationForm } from '../../components/Evaluation/ManagerEvaluationForm';
import CycleLoading from '../../components/common/CycleLoading';
import Typography from '../../components/common/Typography';

import { useCycle } from '../../hooks/useCycle';
import { useToast } from '../../hooks/useToast';

import { mockCollaborators } from '../../data/mockCollaborators';
import { getCollaboratorSelfAssessment } from '../../data/mockCollaboratorSelfAssessment';
import { getCollaborator360Evaluations } from '../../data/mockCollaborator360Data';

interface ManagerAvaliacaoProps {
    collaboratorId: string;
}

export function ManagerAvaliacao({ collaboratorId }: ManagerAvaliacaoProps) {
    const navigate = useNavigate();
    const { currentCycle, isLoading } = useCycle();
    const { showToast } = useToast();
    
    const [collaborator, setCollaborator] = useState<{
        id: string;
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
    } | null>(null);
    const [collaboratorSelfAssessment, setCollaboratorSelfAssessment] = useState<Array<{
        pilarId: string;
        criterionId: string;
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
            collaboratorId: collaboratorId || '',
            cycleId: currentCycle?.id?.toString() || '',
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
                    methods.setValue('cycleId', currentCycle.id.toString());
                }
            } else {
                showToast(
                    'Colaborador não encontrado',
                    'error',
                    { title: 'Erro', duration: 5000 }
                );
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
                `Avaliação de ${collaborator?.nome} enviada com sucesso!`,
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
        return (
            <div className="flex items-center justify-center min-h-[60vh] p-4">
                <div className="text-center">
                    <Typography variant="h2" className="mb-4">Ciclo não encontrado</Typography>
                    <Typography variant="body" color="muted">
                        Não foi possível carregar as informações do ciclo atual.
                    </Typography>
                </div>
            </div>
        );
    }

    if (!collaborator) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] p-4">
                <div className="text-center">
                    <Typography variant="h2" className="mb-4">Colaborador não encontrado</Typography>
                    <Typography variant="body" color="muted">
                        Não foi possível encontrar as informações do colaborador.
                    </Typography>
                </div>
            </div>
        );
    }

    if (currentCycle.isActive) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] p-4">
                <div className="text-center">
                    <Typography variant="h2" className="mb-4">Ciclo em andamento</Typography>
                    <Typography variant="body" color="muted">
                        O ciclo de avaliação ainda está em andamento. A visualização das avaliações estará disponível quando o ciclo for fechado.
                    </Typography>
                </div>
            </div>
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
