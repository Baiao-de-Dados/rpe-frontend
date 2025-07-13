import { motion } from 'framer-motion';

import type { Leader, LeaderCollaborator } from '../../types/leadership';

import LeaderAssignmentCard from './LeaderAssignmentCard';

import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import AlertMessage from '../common/AlertMessage';

import { useToast } from '../../hooks/useToast';
import { useCycle } from '../../hooks/useCycle';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';
import { useAssignLeaderEvaluation } from '../../hooks/api/useManagerQuery';

interface LeadershipManagementProps {
    leaders: Leader[];
    collaborators: LeaderCollaborator[];
    onCollaboratorAssignmentChange?: (collaborators: LeaderCollaborator[]) => void;
}

const LeadershipManagement = ({ leaders, collaborators }: LeadershipManagementProps) => {

    const { showToast } = useToast();
    const { currentCycle } = useCycle();
    const { variants, optimizedTransition } = useOptimizedAnimation();
    const assignLeaderEvaluationMutation = useAssignLeaderEvaluation();

    const handleAssignCollaborator = (collaboratorId: number, leaderId: number) => {
        if (!currentCycle.isActive) {
            showToast(
                'Não é possível atribuir colaboradores. O ciclo está fechado.',
                'warning',
                { title: 'Ciclo Fechado', duration: 4000 }
            );
            return;
        }
        if (typeof leaderId === 'number' && typeof currentCycle.id === 'number') {
            assignLeaderEvaluationMutation.mutate({ collaboratorId, leaderId, cycleId: currentCycle.id }, {
                onSuccess: () => {
                    showToast('Colaborador atribuído com sucesso!', 'success', {
                        title: 'Atribuição',
                        duration: 5000
                    });
                },
                onError: () => {
                    showToast('Tente novamente mais tarde.', 'error', {
                        title: 'Erro ao atribuir colaborador',
                        duration: 100000
                    });
                }
            });
        }
    };

    const handleUnassignCollaborator = (collaboratorId: number) => {
        if (!currentCycle.isActive) {
            showToast(
                'Não é possível remover colaboradores. O ciclo está fechado.',
                'warning',
                { title: 'Ciclo Fechado', duration: 4000 }
            );
            return;
        }
        if (typeof currentCycle.id === 'number') {
            assignLeaderEvaluationMutation.mutate({ collaboratorId, leaderId: 0, cycleId: currentCycle.id }, {
                onSuccess: () => {
                    showToast('Colaborador removido com sucesso!', 'success', {
                        title: 'Remoção bem sucedida',
                        duration: 5000
                    });
                },
                onError: () => {
                    showToast('Tente novamente mais tarde.', 'error', {
                        title: 'Erro ao remover colaborador',
                        duration: 10000
                    });
                }
            });
        }
    };

    return (
        <motion.div variants={variants.animatedCard} initial="hidden" animate="visible" transition={optimizedTransition}>
            <CardContainer className="mt-6">
                <div className="flex items-center justify-between mb-6">
                    <Typography variant="h2" className="text-xl font-bold text-gray-800">
                        Atribuição de Colaboradores {currentCycle?.name ? `- ${currentCycle.name}` : ''}
                    </Typography>
                </div>
                {!currentCycle.isActive && (
                    <AlertMessage 
                        message="O ciclo está fechado. Não é possível atribuir ou remover colaboradores."
                        type="alert"
                        className="mb-6"
                    />
                )}
                {leaders.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[120px]">
                        <Typography variant="body" className="text-gray-500 text-lg font-semibold">Nenhum líder encontrado</Typography>
                    </div>
                ) : (
                    <div className="space-y-0">
                        {leaders.map((leader, index) => (
                            <motion.div key={leader.id} variants={variants.pillarMotion} initial="initial" animate="animate" exit="exit" transition={{...optimizedTransition, delay: index * 0.1 }}>
                                <LeaderAssignmentCard
                                    leader={leader}
                                    collaborators={collaborators}
                                    onAssignCollaborator={handleAssignCollaborator}
                                    onUnassignCollaborator={handleUnassignCollaborator}
                                    isLast={index === leaders.length - 1}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </CardContainer>
        </motion.div>
    );
};

export default LeadershipManagement;
