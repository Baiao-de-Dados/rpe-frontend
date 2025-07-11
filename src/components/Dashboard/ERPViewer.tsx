import { useQueryState } from 'nuqs';
import { Users, UserCog, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { getBadgeText } from '../../utils/globalUtils';

import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import CollaboratorCard from '../common/CollaboratorCard';

import type { ProjectType, UserExtra } from '../../data/mockAdmin';

import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

type ERPViewerProps = {
    users: UserExtra[];
    projects: ProjectType[];
};

export function ERPViewer({ users, projects }: ERPViewerProps) {

    const { variants } = useOptimizedAnimation();

    const [openProject, setOpenProject] = useQueryState('projeto', { 
        history: 'replace' 
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
            <CardContainer>
                <Typography variant="h2" className="text-lg font-bold mb-4">
                    Usuários
                </Typography>
                <div className="space-y-0 max-h-[400px] overflow-y-auto pr-2">
                    {users.map((user, idx) => (
                        <div key={user.email} className={`flex items-center justify-between gap-4 ${idx !== 0 ? 'py-4' : 'pb-4'} ${idx !== users.length - 1 ? 'border-b-2 border-b-gray-300' : ''}`}>
                            <CollaboratorCard collaborator={{ id: user.email, nome: user.name, cargo: user.position ?? '' }} />
                            <div className="flex flex-col min-w-0 items-end text-right">
                                <Typography color='primary' variant="body" className="font-medium truncate">
                                    {user.track ?? ''}
                                </Typography>
                                <Typography color='secondary' variant="caption" className="truncate">
                                    {user.primaryRole ?? ''}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContainer>
            <CardContainer>
                <Typography variant="h2" className="text-lg font-bold mb-4">
                    Projetos 
                </Typography>
                <div className="space-y-0 max-h-[400px] overflow-y-auto pr-2">
                    {projects.map((project, idx) => {
                        const managerUser = users.find(u => u.email === project.manager.email);
                        const isOpen = openProject === project.name;
                        const activeLeaders = project.leaders.filter((l) => !l.endDate);
                        const activeCollaborators = project.collaborators.filter((c) => !c.endDate);
                        return (
                            <div key={project.name} className={`border-b-2 border-b-gray-300 last:border-b-0 ${idx !== 0 ? 'py-4' : 'pb-4'}`}> 
                                <div className="flex items-center justify-between gap-4 cursor-pointer" onClick={() => setOpenProject(isOpen ? null : project.name)}>
                                    <Typography variant="h3" className="font-semibold">
                                        {project.name}
                                    </Typography>
                                    <div className="flex items-center gap-6">
                                        <div title='Líderes' className="flex items-center gap-2">
                                            <UserCog size={28} className="text-gray-500" />
                                            <span className="text-xl font-bold text-primary-500">{activeLeaders.length}</span>
                                        </div>
                                        <div title='Colaboladores' className="flex items-center gap-2">
                                            <Users size={28} className="text-gray-500" />
                                            <span className="text-xl font-bold text-primary-500">{activeCollaborators.length}</span>
                                        </div>
                                        <ChevronDown size={24} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                                <AnimatePresence initial={false}>
                                    {isOpen && managerUser && (
                                        <motion.div key="gestor" variants={variants.projectManagerCollapse} initial="initial" animate="animate" exit="exit" className="overflow-hidden">
                                            <div className="pt-4 flex flex-col gap-4 w-full">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs font-semibold text-gray-500 mb-1">Gestor</span>
                                                    <div className="flex flex-row flex-wrap gap-5 pb-1">
                                                        <div className="flex flex-col items-start max-w-xs">
                                                            <CollaboratorCard collaborator={{ id: managerUser.email, nome: managerUser.name, cargo: managerUser.position ?? '' }} variant="compact" />
                                                            <span className={`px-2 py-0.5 rounded text-xs mt-3 ${project.manager.endDate ? 'bg-gray-200 text-gray-600' : 'bg-primary-100 text-primary-700'}`}>{getBadgeText(project.manager.startDate, project.manager.endDate)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs font-semibold text-gray-500 mb-1">Líderes</span>
                                                    <div className="flex flex-row flex-wrap gap-5 pb-1">
                                                        {project.leaders.length > 0 ? (
                                                            project.leaders.map((leader) => {
                                                                const leaderUser = users.find(u => u.email === leader.email);
                                                                return leaderUser ? (
                                                                    <div key={leader.email} className="flex flex-col items-start max-w-xs">
                                                                        <CollaboratorCard collaborator={{ id: leaderUser.email, nome: leaderUser.name, cargo: leaderUser.position ?? '' }} variant="compact" />
                                                                        <span className={`px-2 py-0.5 rounded text-xs mt-3 ${leader.endDate ? 'bg-gray-200 text-gray-600' : 'bg-primary-100 text-primary-700'}`}>{getBadgeText(leader.startDate, leader.endDate)}</span>
                                                                    </div>
                                                                ) : null;
                                                            })
                                                        ) : (
                                                            <span className="text-xs text-gray-400">Nenhum líder</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs font-semibold text-gray-500 mb-1">Colaboradores</span>
                                                    <div className="flex flex-row flex-wrap gap-5 pb-1 pr-1">
                                                        {project.collaborators.length > 0 ? (
                                                            project.collaborators.map((collab) => {
                                                                const collabUser = users.find(u => u.email === collab.email);
                                                                return collabUser ? (
                                                                    <div key={collab.email} className="flex flex-col items-start max-w-xs">
                                                                        <CollaboratorCard collaborator={{ id: collabUser.email, nome: collabUser.name, cargo: collabUser.position ?? '' }} variant="compact" />
                                                                        <span className={`px-2 py-0.5 rounded text-xs mt-3 ${collab.endDate ? 'bg-gray-200 text-gray-600' : 'bg-primary-100 text-primary-700'}`}>{getBadgeText(collab.startDate, collab.endDate)}</span>
                                                                    </div>
                                                                ) : null;
                                                            })
                                                        ) : (
                                                            <span className="text-xs text-gray-400">Nenhum colaborador</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </CardContainer>
        </div>
    );
}
