import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { fullLeaderEvaluationSchema, type FullLeaderEvaluationFormData } from '../../schemas/leaderEvaluation';

import { LeaderEvaluationForm } from '../../components/Evaluation/LeaderEvaluationForm';
import CycleLoading from '../../components/common/CycleLoading';
import Typography from '../../components/common/Typography';
import CycleClosedEvaluationMessage from '../../components/CycleMessages/CycleClosedEvaluationMessage';

import { useCycle } from '../../hooks/useCycle';
import { useToast } from '../../hooks/useToast';

import { mockCollaborators } from '../../data/mockCollaborators';

interface LeaderAvaliacaoProps {
    collaboratorId: number;
}

export function LeaderAvaliacao({ collaboratorId }: LeaderAvaliacaoProps) {
    const navigate = useNavigate();
    const { currentCycle, isLoading } = useCycle();
    const { showToast } = useToast();
    
    const [collaborator, setCollaborator] = useState<{
        id: number;
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
    } | null>(null);

    const methods = useForm<FullLeaderEvaluationFormData>({
        resolver: zodResolver(fullLeaderEvaluationSchema),
        mode: 'onSubmit',
        defaultValues: {
            collaboratorId: collaboratorId,
            cycleId: currentCycle?.id,
            generalRating: 0,
            generalJustification: '',
            strengths: '',
            improvements: '',
        }
    });

    useEffect(() => {
        if (collaboratorId) {
            // Buscar dados do colaborador
            const foundCollaborator = mockCollaborators.find(c => c.id === collaboratorId);
            if (foundCollaborator) {
                setCollaborator(foundCollaborator);
                
                // Atualizar form values
                methods.setValue('collaboratorId', foundCollaborator.id);
                if (currentCycle?.id) {
                    methods.setValue('cycleId', currentCycle.id);
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

    const handleSubmit = async (data: FullLeaderEvaluationFormData) => {
        try {
            console.log('Dados da avaliação do líder:', data);
            
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

    if (!currentCycle.isActive) {
        return <CycleClosedEvaluationMessage cycleName={currentCycle?.name} className="mb-6" />;
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <LeaderEvaluationForm 
                    collaborator={collaborator}
                    cycleName={currentCycle.name}
                />
            </form>
        </FormProvider>
    );
}
