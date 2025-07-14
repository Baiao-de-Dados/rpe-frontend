import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import { UserRoleEnum } from '../../types/auth';

import { mockCollaboratorsSummary } from '../../data/mockCollaborators';

import { useLeaderCollaboratorsEvaluation } from '../../hooks/api/useLeaderQuery';
import { useAdvancedCollaboratorFilter } from '../../hooks/useAdvancedCollaboratorFilter';

import Searchbar from '../../components/common/Searchbar';
import PageHeader from '../../components/common/PageHeader';
import AdvancedFilter from '../../components/common/AdvancedFilter';
import CollaboratorEvaluationCard from '../../components/common/CollaboratorEvaluationCard';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import { useState } from 'react';

export function Colaboradores() {

    const { hasRole } = useAuth();

    const navigate = useNavigate();

    const { data: leaderCollaboratorsEvaluations = [] } = useLeaderCollaboratorsEvaluation();

    const getFilteredCollaboratorsSummaryByRole = () => {
        if (hasRole(UserRoleEnum.RH) || hasRole(UserRoleEnum.COMMITTEE) || hasRole(UserRoleEnum.ADMIN) || hasRole(UserRoleEnum.DEVELOPER)) {
            return mockCollaboratorsSummary;
        }
        if (hasRole(UserRoleEnum.MANAGER)) {
            return mockCollaboratorsSummary;
        }
        if (hasRole(UserRoleEnum.LEADER)) {
            return leaderCollaboratorsEvaluations;
        }
        return [];
    };

    const collaboratorsSummaryByRole = getFilteredCollaboratorsSummaryByRole();
    const positions = [...new Set(collaboratorsSummaryByRole.map(e => e.collaborator.position))];
    const tracks: string[] = [];

    const { search, setSearch, setFilters, filteredCollaborators } = useAdvancedCollaboratorFilter({
        collaboratorsSummary: collaboratorsSummaryByRole,
        positions,
        tracks,
    });

    const getNavigationRoute = (collaboratorId: number) => {
        return `/colaboradores/${collaboratorId}/avaliacao`;
    };

    const [showFinalizeModal, setShowFinalizeModal] = useState(false);
    const [finalizeInput, setFinalizeInput] = useState('');
    const isCommittee = hasRole(UserRoleEnum.RH);
    const isFinalizeMatch = finalizeInput.trim().toUpperCase() === 'FINALIZAR';

    const handleFinalize = () => {
        // TODO: Chamar API de finalização
        setShowFinalizeModal(false);
        setFinalizeInput('');
        alert('Equalizações finalizadas com sucesso!');
    };

    return (
        <>
            <PageHeader 
                title="Colaboradores" 
                button={
                    isCommittee && (
                        <Button variant="primary" onClick={() => setShowFinalizeModal(true)}>
                            Finalizar equalizações
                        </Button>
                    )
                }
            />
            <main className="p-8 pt-6">
                <div className="flex flex-row items-stretch gap-2 sm:gap-4 mb-4 z-10">
                    <div className="flex-1">
                        <Searchbar
                            value={search}
                            onChange={setSearch}
                            placeholder="Buscar por colaboradores"
                            className="w-full"
                        />
                    </div>
                    <AdvancedFilter
                        positions={positions}
                        tracks={tracks}
                        onApply={setFilters}
                    />
                </div>
                <div className="flex flex-col gap-3 sm:gap-4">
                    {filteredCollaborators.length === 0 ? (
                        <div className="text-center py-12">
                            <span className="text-gray-500 text-base sm:text-lg">Nenhum colaborador encontrado</span>
                        </div>
                    ) : (
                        filteredCollaborators.map(summary => (
                            <CollaboratorEvaluationCard
                                key={summary.collaborator.id}
                                summary={summary}
                                onClick={() => navigate(getNavigationRoute(summary.collaborator.id))}
                                className="-z-1 shadow-none border border-[#f0f0f0] px-2 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full cursor-pointer hover:shadow-md transition-shadow"
                            />
                        ))
                    )}
                </div>
            </main>
            <Modal open={showFinalizeModal} onClose={() => setShowFinalizeModal(false)}>
                <div className="p-6 bg-white rounded-2xl w-full max-w-lg mx-auto flex flex-col gap-6">
                    <header className="flex flex-col gap-2">
                        <Typography variant="h2" className="font-bold text-primary-600 text-center">
                            Finalizar equalizações
                        </Typography>
                        <Typography variant="body" className="text-gray-700 font-medium text-center">
                            Tem certeza que deseja finalizar as equalizações?
                            <br />
                            <span className="font-semibold text-primary-600">Esse processo é irreversível e todos os colaboradores receberão os resultados do processo.</span>
                        </Typography>
                    </header>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirm-finalize" className="text-sm text-gray-600">
                            Digite <span className="font-bold">FINALIZAR</span> para confirmar:
                        </label>
                        <Input id="confirm-finalize" type="text" value={finalizeInput} onChange={e => setFinalizeInput(e.target.value)} />
                    </div>
                    <div className="flex flex-col-reverse md:flex-row justify-end gap-2 mt-2">
                        <Button variant="secondary" onClick={() => setShowFinalizeModal(false)} className="w-full md:w-auto">
                            Voltar
                        </Button>
                        <Button variant="primary" onClick={handleFinalize} disabled={!isFinalizeMatch} className="w-full md:w-auto">
                            Confirmar finalização
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
