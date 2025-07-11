import { useState, useMemo } from 'react';
import BrutalFactsMetrics from '../../components/Lideranca/BrutalFactsMetrics';
import CardContainer from '../../components/common/CardContainer';
import SummaryBox from '../../components/common/SummaryBox';
import Typography from '../../components/common/Typography';
import CollaboratorEvaluationCard from '../../components/common/CollaboratorEvaluationCard';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/Searchbar';
import AdvancedFilter from '../../components/common/AdvancedFilter';
import type { Filters } from '../../components/common/AdvancedFilter';
import { PerformanceChart } from '../../components/Charts/PerformanceChart';
import { mockCycles } from '../../data/mockCycles';
import { mockCommitteeData } from '../../data/mockCommitteeData';

type CollaboratorWithNotas = typeof mockCommitteeData.collaborators[number] & {
  autoavaliacao: number;
  avaliacao360: number;
  notaGestor: number;
  notaFinal?: number;
  trilha?: string;
};

const chartData: { cycleName: string; score: number }[] = mockCycles.map(cycle => ({
  cycleName: cycle.cycleName,
  score: cycle.score
}));

const uniqueDepartments = Array.from(
  new Set(mockCommitteeData.collaborators.map(c => c.department))
);

const uniqueTracks = Array.from(
  new Set(mockCommitteeData.collaborators.map(c => c.track))
);

const cargos = uniqueDepartments;
const trilhas = uniqueTracks;   

export default function BrutalFactsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters | null>(null);

  const collaboratorsWithNotaFinal: CollaboratorWithNotas[] = useMemo(() => {
    return mockCommitteeData.collaborators.map(collab => {
      const autoavaliacao = Math.floor(Math.random() * 5) + 1;
      const avaliacao360 = Math.floor(Math.random() * 5) + 1;
      const notaGestor = Math.floor(Math.random() * 5) + 1;

      const notaFinal =
        collab.status === 'Finalizado'
          ? parseFloat(((autoavaliacao + avaliacao360 + notaGestor) / 3).toFixed(1))
          : undefined;

      return {
        ...collab,
        autoavaliacao,
        avaliacao360,
        notaGestor,
        notaFinal,
      };
    }).sort((a, b) => (b.notaFinal ?? 0) - (a.notaFinal ?? 0));
  }, []);

  const searchAndFilterFunction = (
    query: string,
    activeFilters: Filters | null
  ): CollaboratorWithNotas[] => {
    let results = collaboratorsWithNotaFinal;

    if (query.trim()) {
      results = results.filter(collab =>
        collab.name.toLowerCase().includes(query.toLowerCase()) ||
        collab.department.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (activeFilters) {
      const {
        pendentes,
        finalizados,
        notaRange,
        maiorParaMenor,
        ...restFilters
      } = activeFilters;

      const selectedDepartments = cargos.filter(cargo => restFilters[cargo]);
      const selectedTrilhas = trilhas.filter(trilha => restFilters[trilha]);

      results = results.filter(collab => {
        const matchesStatus =
          (pendentes && collab.status === 'Pendente') ||
          (finalizados && collab.status === 'Finalizado') ||
          (!pendentes && !finalizados);

        const matchesDepartment =
          selectedDepartments.length === 0 || selectedDepartments.includes(collab.department);

        const matchesTrilha =
          selectedTrilhas.length === 0 || selectedTrilhas.includes(collab.track ?? '');

        const nota = collab.notaFinal ?? 0;
        const matchesNota = nota >= notaRange[0] && nota <= notaRange[1];

        return matchesStatus && matchesDepartment && matchesTrilha && matchesNota;
      });

      results = results.sort((a, b) =>
        maiorParaMenor
          ? (b.notaFinal ?? 0) - (a.notaFinal ?? 0)
          : (a.notaFinal ?? 0) - (b.notaFinal ?? 0)
      );
    }

    return results;
  };

  const filteredCollaborators = searchAndFilterFunction(search, filters);

  return (
    <div>
      <PageHeader title="Brutal Facts" />

      <div className="flex flex-col gap-6 p-6">
        <BrutalFactsMetrics
          score={4.5}
          cycleLabel="2024.2"
          growth={+0.3}
          growthCycleLabel="2024.1"
          total={150}
        />

        <CardContainer className="flex flex-col gap-6">
          <Typography variant="h2" className="text-black font-bold text-2xl">Resumo</Typography>
          <SummaryBox summary={mockCycles[0].summary} title="Insights" />
        </CardContainer>

        <CardContainer className="flex flex-col gap-6 p-6">
          <Typography variant="h2" className="text-black font-bold text-2xl">Desempenho</Typography>
          <PerformanceChart cycles={chartData} />
          <SummaryBox summary={mockCycles[0].summary} title="Insights" />
        </CardContainer>

        <CardContainer className="flex flex-col gap-6">
          <div className="flex flex-row justify-between items-center">
            <Typography variant="h2" className="text-black font-bold text-2xl">Resumo de equalizações</Typography>
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="flex flex-col items-center justify-center border-2 border-gray-200 rounded-xl">
                <SearchBar
                  placeholder="Buscar colaboradores..."
                  className="flex flex-row justify-center items-center bg-gray-200 rounded-xl"
                  value={search}
                  onChange={setSearch}
                  searchFunction={(q) => searchAndFilterFunction(q, filters)}
                  getItemKey={item => String(item.id)}
                  onItemSelect={item => setSearch(item.name)}
                  showResults={filteredCollaborators.length === 0}
                />
              </div>
              <AdvancedFilter cargos={cargos} trilhas={trilhas} onApply={setFilters} />
            </div>
          </div>

          <div className="flex flex-col gap-4 -z-1">
            {filteredCollaborators.map((collab) => {
              const evaluationFields = [
                { label: 'Autoavaliação', value: collab.autoavaliacao },
                { label: 'Avaliação 360', value: collab.avaliacao360 },
                { label: 'Nota gestor', value: collab.notaGestor },
                { label: 'Nota final', value: collab.notaFinal, bold: true },
              ];

              return (
                <CollaboratorEvaluationCard
                  key={collab.id}
                  collaborator={{
                    nome: collab.name,
                    cargo: collab.department,
                    image: undefined,
                    status: collab.status,
                    statusVariant: collab.status === 'Finalizado' ? 'success' : 'warning',
                  }}
                  evaluationFields={evaluationFields}
                />
              );
            })}
          </div>
        </CardContainer>
      </div>
    </div>
  );
}
