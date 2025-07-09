import { useState } from 'react';
import { motion } from 'framer-motion';

import type { Leader, Collaborator } from '../../types/leadership';

import LeaderAssignmentCard from './LeaderAssignmentCard';

import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import AlertMessage from '../common/AlertMessage';

import { useToast } from '../../hooks/useToast';
import { useCycle } from '../../hooks/useCycle';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

interface LeadershipManagementProps {
    leaders: Leader[];
    collaborators: Collaborator[];
    onCollaboratorAssignmentChange?: (collaborators: Collaborator[]) => void;
}

const LeadershipManagement = ({ leaders, collaborators: initialCollaborators, onCollaboratorAssignmentChange }: LeadershipManagementProps) => {

    const { showToast } = useToast();

    const { currentCycle } = useCycle();

    const { variants, optimizedTransition } = useOptimizedAnimation();

    const [collaborators, setCollaborators] = useState<Collaborator[]>(initialCollaborators);

    const handleAssignCollaborator = (collaboratorId: number, leaderId: number) => {
        if (!currentCycle.isActive) {
            showToast(
                'Não é possível atribuir colaboradores. O ciclo está fechado.',
                'warning',
                { 
                    title: 'Ciclo Fechado',
                    duration: 4000 
                }
            );
            return;
        }
        console.log({
            collaboratorId,
            cycleId: currentCycle.id,
            leaderId
        });
        
        const collaborator = collaborators.find(c => c.id === collaboratorId);
        const leader = leaders.find(l => l.id === leaderId);
        
        const updatedCollaborators = collaborators.map(collaborator =>
            collaborator.id === collaboratorId
                ? { ...collaborator, leaderId, leaderRating: null }
                : collaborator
        );
        setCollaborators(updatedCollaborators);
        onCollaboratorAssignmentChange?.(updatedCollaborators);
        
        showToast(`${collaborator?.name} foi atribuído(a) ao líder ${leader?.name}`, 'success', { 
                title: 'Colaborador Atribuído',
                duration: 3000 
            }
        );
    };

    const handleUnassignCollaborator = (collaboratorId: number) => {
        if (!currentCycle.isActive) {
            showToast(
                'Não é possível remover colaboradores. O ciclo está fechado.',
                'warning',
                { 
                    title: 'Ciclo Fechado',
                    duration: 4000 
                }
            );
            return;
        }
        
        const collaborator = collaborators.find(c => c.id === collaboratorId);
        
        if (collaborator?.leaderRating !== null) {
            showToast(`${collaborator?.name} já foi avaliado(a) e não pode ser removido(a)`, 'warning', { 
                    title: 'Ação Bloqueada',
                    duration: 4000 
                }
            );
            return;
        }
        console.log({
            collaboratorId,
            cycleId: currentCycle.id,
            leaderId: null
        });
        
        const leader = leaders.find(l => l.id === collaborator?.leaderId);
        
        const updatedCollaborators = collaborators.map(collaborator =>
            collaborator.id === collaboratorId
                ? { ...collaborator, leaderId: null, leaderRating: null }
                : collaborator
        );

        setCollaborators(updatedCollaborators);
        onCollaboratorAssignmentChange?.(updatedCollaborators);
        
        showToast(`${collaborator?.name} foi removido(a) do líder ${leader?.name}`, 'success', { 
                title: 'Colaborador Removido',
                duration: 3000 
            }
        );
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
            </CardContainer>
        </motion.div>
    );
};

export default LeadershipManagement;
