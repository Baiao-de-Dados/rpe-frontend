import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';

import Button from '../common/Button';
import Avatar from '../common/Avatar';
import Typography from '../common/Typography';
import CollaboratorCard from '../common/CollaboratorCard';
import EvaluationScoreDisplay from '../common/EvaluationScoreDisplay';

import type { Leader, Collaborator } from '../../types/leadership';

import { useCycle } from '../../hooks/useCycle';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

interface LeaderAssignmentCardProps {
    leader: Leader;
    collaborators: Collaborator[];
    onAssignCollaborator: (collaboratorId: number, leaderId: number) => void;
    onUnassignCollaborator: (collaboratorId: number) => void;
    isLast?: boolean;
}

const LeaderAssignmentCard = ({ leader, collaborators, onAssignCollaborator, onUnassignCollaborator, isLast = false }: LeaderAssignmentCardProps) => {

    const { currentCycle: { isActive } } = useCycle();

    const [isExpanded, setIsExpanded] = useState(false);

    const { variants, optimizedTransition } = useOptimizedAnimation();
    
    const projectCollaborators = collaborators.filter(
        collaborator => collaborator.project.projectId === leader.project.projectId
    );
    
    const assignedCollaborators = projectCollaborators.filter(
        collaborator => collaborator.leaderId === leader.id
    );
    
    const unassignedCollaborators = projectCollaborators.filter(
        collaborator => collaborator.leaderId === null
    );

    const handleAssignCollaborator = (collaboratorId: number) => {
        onAssignCollaborator(collaboratorId, leader.id);
    };

    const handleUnassignCollaborator = (collaboratorId: number) => {
        onUnassignCollaborator(collaboratorId);
    };

    return (
        <div className={`bg-white overflow-hidden ${!isLast ? 'border-b-2 border-b-gray-300' : ''}`}>
            <div onClick={() => setIsExpanded(!isExpanded)} className="flex items-center justify-between mb-4 cursor-pointer p-4 pt-6">
                <div className="flex items-center gap-4">
                    <Avatar name={leader.name} />
                    <div>
                        <Typography variant="h3" className="text-lg font-semibold text-primary-600">
                            {leader.name}
                        </Typography>
                        <Typography variant="body" className="text-gray-500">
                            Projeto: {leader.project.projectName}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Typography variant="body" className="text-sm text-gray-600">
                        {assignedCollaborators.length} {assignedCollaborators.length === 1 ? 'colaborador' : 'colaboradores'}
                    </Typography>
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        title={isExpanded ? 'Recolher' : 'Gerenciar'} 
                        className="p-1 cursor-pointer"
                    >
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div variants={variants.evaluationSectionRenderer} initial="initial" animate="animate" exit="exit" transition={optimizedTransition} className="p-4 pt-0 space-y-6">
                        {assignedCollaborators.length > 0 && (
                            <div>
                                <Typography variant="h4" className="text-md font-semibold mb-3 text-gray-700">
                                    Colaboradores Atribuídos
                                </Typography>
                                <div className="space-y-2">
                                    {assignedCollaborators.map((collaborator, index) => (
                                        <motion.div key={collaborator.id} variants={variants.pillarMotion} initial="initial" animate="animate" exit="exit" transition={{ ...optimizedTransition, delay: index * 0.05}} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors duration-200">
                                            <CollaboratorCard
                                                collaborator={{
                                                    id: collaborator.id.toString(),
                                                    nome: collaborator.name,
                                                    cargo: collaborator.position
                                                }}
                                                variant="compact"
                                            />
                                            {collaborator.leaderRating !== null ? (
                                                <EvaluationScoreDisplay
                                                    score={collaborator.leaderRating}
                                                    label="Nota"
                                                    showLabel={false}
                                                />
                                            ) : (
                                                <button
                                                    onClick={() => handleUnassignCollaborator(collaborator.id)}
                                                    title={isActive ? "Remover" : "Ciclo fechado"}
                                                    className={`p-1 ${isActive ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                                                    disabled={!isActive}
                                                >
                                                    <Trash2 className={`w-5 h-5 transition-colors duration-200 ${isActive ? 'text-error-500 hover:text-error-600' : 'text-gray-400'}`} />
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {unassignedCollaborators.length > 0 && (
                            <div>
                                <Typography variant="h4" className="text-md font-semibold mb-3 text-gray-700">
                                    Colaboradores Disponíveis
                                </Typography>
                                <div className="space-y-2">
                                    {unassignedCollaborators.map((collaborator, index) => (
                                        <motion.div key={collaborator.id} variants={variants.pillarMotion} initial="initial" animate="animate" exit="exit" transition={{ ...optimizedTransition, delay: index * 0.05}} className="flex items-center justify-between p-3 bg-primary-50 rounded-lg transition-colors duration-200">
                                            <CollaboratorCard
                                                collaborator={{
                                                    id: collaborator.id.toString(),
                                                    nome: collaborator.name,
                                                    cargo: collaborator.position
                                                }}
                                                variant="compact"
                                            />
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => handleAssignCollaborator(collaborator.id)}
                                                title={isActive ? "Atribuir" : "Ciclo fechado"}
                                                disabled={!isActive}
                                                className={!isActive ? 'opacity-50 cursor-not-allowed' : ''}
                                            >
                                                <Plus className="w-5 h-5" />
                                            </Button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {assignedCollaborators.length === 0 && unassignedCollaborators.length === 0 && (
                            <motion.div variants={variants.emptyMessage} initial="initial" animate="animate" exit="exit">
                                <Typography variant="body" className="text-gray-500 text-center py-4">
                                    Nenhum colaborador disponível neste projeto.
                                </Typography>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LeaderAssignmentCard;
