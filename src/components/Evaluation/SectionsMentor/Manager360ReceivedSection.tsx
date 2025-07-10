import { memo } from 'react';

import Typography from '../../common/Typography';
import Evaluation360Card from '../AllEvaluation/Cards/Evaluation360Card';

import type { Evaluation360Item } from '../../../data/mockEvaluations';

interface Manager360ReceivedSectionProps {
    evaluations360: Evaluation360Item[];
    cycleName: string;
}

export const Manager360ReceivedSection = memo(({ 
    evaluations360, 
    cycleName 
}: Manager360ReceivedSectionProps) => {

    return (
        <section>
            <div className="mb-8">
                <Typography variant="h2" className="mb-2">
                    Avaliações 360° Recebidas
                </Typography>
                <Typography variant="caption" color="muted">
                    Avaliações feitas por outros colaboradores sobre este profissional no ciclo {cycleName}
                </Typography>
            </div>

            <div className="space-y-6">
                {evaluations360.length === 0 ? (
                    <div className="text-center py-12">
                        <Typography variant="body" color="muted">
                            Nenhuma avaliação 360° encontrada para este colaborador neste ciclo.
                        </Typography>
                    </div>
                ) : (
                    evaluations360.map((evaluation, index) => (
                        <Evaluation360Card
                            key={index}
                            collaborator={{
                                id: `evaluator-${index}`,
                                nome: evaluation.collaratorName,
                                cargo: evaluation.collaboratorPosition
                            }}
                            rating={evaluation.rating}
                            strengths={evaluation.strengths}
                            improvements={evaluation.improvements}
                        />
                    ))
                )}
            </div>
        </section>
    );
});
