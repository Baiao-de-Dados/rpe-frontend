import React, { useState } from 'react';
import Typography from '../../components/common/Typography';
import Searchbar from '../../components/common/Searchbar';
import AdvancedFilter from '../../components/common/AdvancedFilter';
import EqualizacaoCard from '../../components/common/EqualizacaoCard';
import { useNavigate } from 'react-router-dom';
import type { Filters } from '../../components/common/AdvancedFilter';

interface EvaluationData {
    id: string;
    collaboratorName: string;
    position: string;
    status: 'Finalizado' | 'Em andamento';
    finalScore: number;
    selfEvalScore: number;
    managerEvalScore: number;
    postureScore: number;
    summary: string;
}

const Equalizacao: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Filters>({
        pendentes: true,
        finalizados: true,
        maiorParaMenor: true,
        menorParaMaior: false,
        notaRange: [0, 5],
    });
    const navigate = useNavigate();

    // Mock data - em produção, isso viria de uma API
    const mockEvaluations: EvaluationData[] = [
        {
            id: '1',
            collaboratorName: 'João Silva',
            position: 'Desenvolvedor Senior',
            status: 'Finalizado',
            finalScore: 4.2,
            selfEvalScore: 4.0,
            managerEvalScore: 4.3,
            postureScore: 4.5,
            summary: 'Colaborador demonstrou excelente desempenho técnico e liderança.'
        },
        {
            id: '2',
            collaboratorName: 'Maria Santos',
            position: 'Product Manager',
            status: 'Em andamento',
            finalScore: 3.8,
            selfEvalScore: 3.5,
            managerEvalScore: 4.0,
            postureScore: 4.0,
            summary: 'Bom desempenho geral com oportunidades de melhoria em comunicação.'
        },
        {
            id: '3',
            collaboratorName: 'Pedro Oliveira',
            position: 'Designer UX/UI',
            status: 'Finalizado',
            finalScore: 4.7,
            selfEvalScore: 4.5,
            managerEvalScore: 4.8,
            postureScore: 4.9,
            summary: 'Excelente colaborador com forte capacidade de inovação e colaboração.'
        },
        {
            id: '4',
            collaboratorName: 'Ana Costa',
            position: 'QA Engineer',
            status: 'Finalizado',
            finalScore: 3.9,
            selfEvalScore: 3.7,
            managerEvalScore: 4.0,
            postureScore: 4.1,
            summary: 'Desempenho sólido com foco em qualidade e atenção aos detalhes.'
        },
        {
            id: '5',
            collaboratorName: 'Carlos Rodrigues',
            position: 'DevOps Engineer',
            status: 'Em andamento',
            finalScore: 4.1,
            selfEvalScore: 4.2,
            managerEvalScore: 4.0,
            postureScore: 4.0,
            summary: 'Forte conhecimento técnico com oportunidades de melhoria em documentação.'
        }
    ];

    const cargos = [...new Set(mockEvaluations.map(e => e.position))];
    const trilhas: string[] = [];

    const applyFilters = (evaluations: EvaluationData[]) => {
        return evaluations.filter(evaluation => {
            const matchesSearch = evaluation.collaboratorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 evaluation.position.toLowerCase().includes(searchTerm.toLowerCase());
            
            if (!matchesSearch) return false;
            
            // Aplicar filtros de status
            if (filters.pendentes && evaluation.status === 'Em andamento') return true;
            if (filters.finalizados && evaluation.status === 'Finalizado') return true;
            
            // Aplicar filtro de nota
            if (evaluation.finalScore < filters.notaRange[0] || evaluation.finalScore > filters.notaRange[1]) return false;
            
            // Aplicar filtros de cargo
            if (filters[evaluation.position] === false) return false;
            
            return true;
        });
    };

    const filteredEvaluations = applyFilters(mockEvaluations);

    // Aplicar ordenação
    if (filters.maiorParaMenor) {
        filteredEvaluations.sort((a, b) => b.finalScore - a.finalScore);
    } else if (filters.menorParaMaior) {
        filteredEvaluations.sort((a, b) => a.finalScore - b.finalScore);
    }

    const handleCardClick = (evaluationId: string) => {
        navigate(`/avaliacao/${evaluationId}`);
    };

    return (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <Searchbar
                        placeholder="Buscar por colaborador ou cargo..."
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                </div>
                <div className="lg:w-80">
                    <AdvancedFilter
                        cargos={cargos}
                        trilhas={trilhas}
                        onApply={setFilters}
                    />
                </div>
            </div>

            {/* Evaluation Cards */}
            <div className="grid grid-cols-1 gap-6">
                {filteredEvaluations.length === 0 ? (
                    <div className="text-center py-12">
                        <Typography variant="body" className="text-gray-500">
                            Nenhuma avaliação encontrada com os critérios selecionados.
                        </Typography>
                    </div>
                ) : (
                    filteredEvaluations.map((evaluation) => (
                        <EqualizacaoCard
                            key={evaluation.id}
                            collaboratorName={evaluation.collaboratorName}
                            position={evaluation.position}
                            status={evaluation.status}
                            finalScore={evaluation.finalScore}
                            selfEvalScore={evaluation.selfEvalScore}
                            managerEvalScore={evaluation.managerEvalScore}
                            postureScore={evaluation.postureScore}
                            summary={evaluation.summary}
                            onClick={() => handleCardClick(evaluation.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Equalizacao;
