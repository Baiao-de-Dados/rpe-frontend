import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import { useCycle } from '../../hooks/useCycle';
import { useCommitteeCollaboratorsSummary } from '../../hooks/api/useCommitteeQuery';

import Searchbar from '../../components/common/Searchbar';
import Typography from '../../components/common/Typography';
import AdvancedFilter from '../../components/common/AdvancedFilter';
import EqualizacaoCard from '../../components/common/EqualizacaoCard';
import CycleLoading from '../../components/common/CycleLoading';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';

import { useAdvancedCollaboratorFilter } from '../../hooks/useAdvancedCollaboratorFilter';

function Equalizacao() {

    const navigate = useNavigate();
    const { currentCycle, isLoading: cycleLoading } = useCycle();

    // API queries
    const { data: collaboratorsSummary, isLoading: collaboratorsLoading } = useCommitteeCollaboratorsSummary();

    const isLoading = cycleLoading || collaboratorsLoading;

    // Converter dados para o formato esperado pelo filtro
    const collaboratorsWithCalculatedScores = useMemo(() => {
        if (!collaboratorsSummary) return [];

        return collaboratorsSummary.map(summary => ({
            collaborator: {
                id: summary.collaborator.id,
                name: summary.collaborator.name,
                position: summary.collaborator.position,
                email: 'colaborador@example.com', // TODO: Adicionar email na API
                track: { id: 1, name: 'Default Track' } // TODO: Adicionar track na API
            },
            autoEvaluationScore: summary.autoEvaluation,
            evaluation360Score: summary.evaluation360,
            managerEvaluationScore: summary.managerEvaluation,
            finalEvaluationScore: summary.committeeEqualization, // Nota final é a equalização
            status: summary.status === 'completed' ? 'finalizado' as const : 'pendente' as const,
        }));
    }, [collaboratorsSummary]);

    const positions = [...new Set(collaboratorsWithCalculatedScores.map(e => e.collaborator.position))];
    const tracks: string[] = [];

    const { search, setSearch, setFilters, filteredCollaborators } = useAdvancedCollaboratorFilter({
        collaboratorsSummary: collaboratorsWithCalculatedScores,
        positions,
        tracks,
    });

    const handleCardClick = (collaboratorId: number) => {
        navigate(`/colaboradores/${collaboratorId}/avaliacao`);
    };

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <Searchbar
                        placeholder="Buscar por colaborador ou cargo..."
                        value={search}
                        onChange={setSearch}
                    />
                </div>
                <div className="lg:w-80">
                    <AdvancedFilter
                        positions={positions}
                        tracks={tracks}
                        onApply={setFilters}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {filteredCollaborators.length === 0 ? (
                    <div className="text-center py-12">
                        <Typography variant="body" className="text-gray-500">
                            {collaboratorsLoading ? 'Carregando colaboradores...' : 'Nenhuma avaliação encontrada com os critérios selecionados.'}
                        </Typography>
                    </div>
                ) : (
                    filteredCollaborators.map((evaluation) => (
                        <EqualizacaoCard
                            key={evaluation.collaborator.id}
                            collaboratorName={evaluation.collaborator.name}
                            position={evaluation.collaborator.position}
                            status={evaluation.status === 'finalizado' ? 'Finalizado' : 'Em andamento'}
                            finalScore={evaluation.finalEvaluationScore ?? 0}
                            selfEvalScore={evaluation.autoEvaluationScore ?? 0}
                            managerEvalScore={evaluation.managerEvaluationScore ?? 0}
                            onClick={() => handleCardClick(evaluation.collaborator.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Equalizacao;
