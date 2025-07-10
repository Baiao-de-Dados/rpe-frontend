import { memo } from 'react';

import Typography from '../../common/Typography';
import ReferenceCard from '../AllEvaluation/Cards/ReferenceCard';

import type { ReferenceItem } from '../../../data/mockEvaluations';

interface ManagerReferencesReceivedSectionProps {
    referencesReceived: ReferenceItem[];
    cycleName: string;
}

export const ManagerReferencesReceivedSection = memo(({ 
    referencesReceived, 
    cycleName 
}: ManagerReferencesReceivedSectionProps) => {

    return (
        <section>
            <div className="mb-8">
                <Typography variant="h2" className="mb-2">
                    Referências Recebidas
                </Typography>
                <Typography variant="caption" color="muted">
                    Referências e comentários feitos por outros colaboradores sobre este profissional no ciclo {cycleName}
                </Typography>
            </div>

            <div className="space-y-6">
                {referencesReceived.length === 0 ? (
                    <div className="text-center py-12">
                        <Typography variant="body" color="muted">
                            Nenhuma referência encontrada para este colaborador neste ciclo.
                        </Typography>
                    </div>
                ) : (
                    referencesReceived.map((reference, index) => (
                        <ReferenceCard
                            key={index}
                            collaborator={{
                                id: `reference-${index}`,
                                nome: reference.collaratorName,
                                cargo: reference.collaboratorPosition,
                                image: undefined,
                                avatar: undefined
                            }}
                            justification={reference.justification}
                        />
                    ))
                )}
            </div>
        </section>
    );
});
