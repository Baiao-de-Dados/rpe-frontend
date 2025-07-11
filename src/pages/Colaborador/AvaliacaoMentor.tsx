import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { fullMentorEvaluationSchema, type FullMentorEvaluationFormData } from '../../schemas/mentorEvaluation';

import { MentorEvaluationForm } from '../../components/Evaluation/MentorEvaluationForm';
import CycleLoading from '../../components/common/CycleLoading';
import Typography from '../../components/common/Typography';
import CycleClosedEvaluationMessage from '../../components/CycleMessages/CycleClosedEvaluationMessage';

import { useCycle } from '../../hooks/useCycle';
import { useToast } from '../../hooks/useToast';

import { mockCollaborators } from '../../data/mockCollaborators';
import { getCollaboratorSelfAssessment } from '../../data/mockCollaboratorSelfAssessment';

export function ColaboradorAvaliacao() {
    const { collaboratorId } = useParams<{ collaboratorId: string }>();
    const navigate = useNavigate();
    const { currentCycle, isLoading: cycleLoading } = useCycle();
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

    const methods = useForm<FullMentorEvaluationFormData>({
        resolver: zodResolver(fullMentorEvaluationSchema),
        mode: 'onSubmit',
        defaultValues: {
            collaboratorId: collaboratorId || '',
            cycleId: currentCycle?.id?.toString() || '',
            mentorAssessment: [],
            generalRating: null,
            generalJustification: '',
            strengths: '',
            improvements: ''
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

    const handleSubmit = async (data: FullMentorEvaluationFormData) => {
        try {
            console.log('Dados da avaliação do mentor:', data);
            
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

    if (cycleLoading) {
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
                <MentorEvaluationForm 
                    collaborator={collaborator}
                    cycleName={currentCycle.name}
                    collaboratorSelfAssessment={collaboratorSelfAssessment}
                />
            </form>
        </FormProvider>
    );
}
