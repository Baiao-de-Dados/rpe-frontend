import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { useCycle } from '../../hooks/useCycle';
import { useToast } from '../../hooks/useToast';
import { useLeaderCollaboratorsEvaluation } from '../../hooks/api/useLeaderQuery';
import { useAuth } from '../../hooks/useAuth';
import { LeaderEvaluationReadonlyContext } from '../../contexts/LeaderEvaluationReadonlyContext';

import type { Collaborator } from '../../types/collaborator';

import CycleLoading from '../../components/common/CycleLoading';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import { LeaderEvaluationForm } from '../../components/Evaluation/LeaderEvaluationForm';
import CollaboratorNotFoundMessage from '../../components/Evaluation/CollaboratorNotFoundMessage';
import CycleClosedEvaluationMessage from '../../components/CycleMessages/CycleClosedEvaluationMessage';

import { fullLeaderEvaluationSchema, type FullLeaderEvaluationFormData } from '../../schemas/leaderEvaluation';

interface LeaderAvaliacaoProps {
    collaboratorId: number;
}

export function LeaderAvaliacao({ collaboratorId }: LeaderAvaliacaoProps) {

    const { user } = useAuth();

    const navigate = useNavigate();

    const { showToast } = useToast();

    const { currentCycle, isLoading } = useCycle();

    const { data: collaboratorsData = [], leaderEvaluation, getLeaderEvaluation } = useLeaderCollaboratorsEvaluation();
    const [collaborator, setCollaborator] = useState<Collaborator| null>(null);
    const [isReadonly, setIsReadonly] = useState(false);
    const [evaluationData, setEvaluationData] = useState<Partial<FullLeaderEvaluationFormData>>();

    const methods = useForm<FullLeaderEvaluationFormData>({
        resolver: zodResolver(fullLeaderEvaluationSchema),
        mode: 'onSubmit',
        defaultValues: {
            collaboratorId: collaboratorId,
            cycleId: currentCycle?.id,
            leaderId: user?.id,
            generalRating: 0,
            generalJustification: '',
            strengths: '',
            improvements: '',
        }
    });

    useEffect(() => {
        if (collaboratorId) {
            const foundCollaborator = collaboratorsData.find(c => c.collaborator.id === collaboratorId)?.collaborator;
            if (foundCollaborator) {
                setCollaborator(foundCollaborator);
                methods.setValue('collaboratorId', foundCollaborator.id);
                if (currentCycle?.id) {
                    methods.setValue('cycleId', currentCycle.id);
                }
                // Fetch leader evaluation and set as default values if exists
                if (currentCycle?.id && user?.id) {
                    getLeaderEvaluation({ cycleId: currentCycle.id, collaboratorId: foundCollaborator.id })
                        .then(evaluation => {
                            if (evaluation && evaluation.score !== undefined) {
                                const evalData = {
                                    collaboratorId: foundCollaborator.id,
                                    cycleId: currentCycle.id,
                                    leaderId: user.id,
                                    generalRating: evaluation.score,
                                    generalJustification: evaluation.justification,
                                    strengths: evaluation.strengths || '',
                                    improvements: evaluation.improvements || '',
                                };
                                methods.reset(evalData);
                                setIsReadonly(true);
                                setEvaluationData(evalData);
                            } else {
                                setIsReadonly(false);
                                setEvaluationData(undefined);
                            }
                        })
                        .catch(() => {
                            setIsReadonly(false);
                            setEvaluationData(undefined);
                        });
                }
            } else {
                if (collaboratorsData.length > 0) {
                    showToast(
                        'Colaborador não encontrado',
                        'error',
                        { title: 'Erro', duration: 5000 }
                    );
                }
                navigate('/colaboradores');
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collaboratorId, collaboratorsData, currentCycle, navigate, showToast, user]);

    const handleSubmit = async (data: FullLeaderEvaluationFormData) => {
        if (isReadonly) return; 
        try {
            await leaderEvaluation(data); 
            showToast(
                `Avaliação de ${collaborator?.name} enviada com sucesso!`,
                'success',
                {
                    title: 'Avaliação Enviada',
                    duration: 5000,
                }
            );
            navigate('/colaboradores');
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

    console.log('Current Cycle:', currentCycle);

    if (!currentCycle.isActive) {
        return <CycleClosedEvaluationMessage cycleName={currentCycle?.name} className="mb-6" />;
    }
    console.log(evaluationData)
    return (
        <LeaderEvaluationReadonlyContext.Provider value={{ readonly: isReadonly, setReadonly: setIsReadonly, evaluationData }}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit)}>
                    <LeaderEvaluationForm 
                        collaborator={collaborator}
                        cycleName={currentCycle.name}
                    />
                </form>
            </FormProvider>
        </LeaderEvaluationReadonlyContext.Provider>
    );
}
