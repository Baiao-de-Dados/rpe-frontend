import CollCycleCard from '../CollCycleCard';
import Typography from '../Typography';
import CardContainer from '../CardContainer';

interface Cycle {
    cycleName: string;
    status: 'Finalizado' | 'Em andamento' | 'Pendente' | string;
    score: number;
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
            <div className="space-y-6">
                {sortedCycles.map(cycle => (
                    <CollCycleCard
                        key={cycle.cycleName}
                        cycleName={cycle.cycleName}
                        status={
                            cycle.status as
                                | 'Finalizado'
                                | 'Em andamento'
                                | 'Pendente'
                        }
                        finalScore={cycle.score}
                        selfEvalScore={cycle.score}
                        executionScore={4.0}
                        postureScore={4.5}
                        summary={cycle.summary}
                        onClick={() => {
                            /* navigate to cycle details if needed */
                        }}
                    />
                ))}
            </div>
        </CardContainer>
    );
}
