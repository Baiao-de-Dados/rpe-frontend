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

    return (
        <>
            <PageHeader title="Colaboradores" />
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
                <div className="flex flex-col gap-3 sm:gap-4 -z-1">
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
        </>
    );
}
