import CollCycleCard from '../common/CollCycleCard';
import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';

interface Cycle {
    cycleName: string;
    status: 'Finalizado' | 'Em andamento' | string;
    selfEvalScore: number;
    managerScore: number;
    finalScore: number;
    summary: string;
}

interface EvolucaoCiclosProps {
    sortedCycles: Cycle[];
}

export function CyclesEvolution({ sortedCycles }: EvolucaoCiclosProps) {
    return (
        <CardContainer>
            <Typography variant="h2" className="text-lg font-bold mb-4 ">
                Ciclos de Avaliação
            </Typography>
            {sortedCycles.length === 0 ? (
                <Typography variant="body" className="text-gray-500 text-center py-8">
                    Nenhum ciclo disponível
                </Typography>
            ) : (
                <div className="space-y-6">
                    {sortedCycles.map(cycle => (
                        <CollCycleCard
                            key={cycle.cycleName}
                            cycleName={cycle.cycleName}
                            status={
                                cycle.status as
                                    | 'Finalizado'
                                    | 'Em andamento'
                            }
                            finalScore={cycle.finalScore}
                            selfEvalScore={cycle.selfEvalScore}
                            managerScore={cycle.managerScore}
                            summary={cycle.summary}
                        />
                    ))}
                </div>
            )}
        </CardContainer>
    );
}
