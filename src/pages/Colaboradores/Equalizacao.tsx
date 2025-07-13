import { useNavigate } from 'react-router-dom';

import Searchbar from '../../components/common/Searchbar';
import Typography from '../../components/common/Typography';
import AdvancedFilter from '../../components/common/AdvancedFilter';
import EqualizacaoCard from '../../components/common/EqualizacaoCard';

import { mockCollaboratorsSummary } from '../../data/mockCollaborators';

import { useAdvancedCollaboratorFilter } from '../../hooks/useAdvancedCollaboratorFilter';

const positions = [...new Set(mockCollaboratorsSummary.map(e => e.collaborator.position))];
const tracks: string[] = [];

function Equalizacao() {

    const navigate = useNavigate();

    const { search, setSearch, setFilters, filteredCollaborators } = useAdvancedCollaboratorFilter({
        collaboratorsSummary: mockCollaboratorsSummary,
        positions,
        tracks,
    });

    const handleCardClick = (idx: number) => {
        navigate(`/avaliacao/${idx}`);
    };

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
                            Nenhuma avaliação encontrada com os critérios selecionados.
                        </Typography>
                    </div>
                ) : (
                    filteredCollaborators.map((evaluation, idx) => (
                        <EqualizacaoCard
                            key={idx}
                            collaboratorName={evaluation.collaborator.name}
                            position={evaluation.collaborator.position}
                            status={evaluation.status === 'finalizado' ? 'Finalizado' : 'Em andamento'}
                            finalScore={evaluation.finalEvaluationScore ?? 0}
                            selfEvalScore={evaluation.autoEvaluationScore ?? 0}
                            managerEvalScore={evaluation.managerEvaluationScore ?? 0}
                            onClick={() => handleCardClick(idx)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Equalizacao;
