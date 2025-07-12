import { memo } from 'react';

import Typography from '../../common/Typography';
import StarRating from '../../common/StarRating';

import type { Criterion } from '../../../data/mockEvaluationPIllars';

interface ReadOnlyManagerAssessmentProps {
    criterion: Criterion;
    // Dados do colaborador (read-only)
    collaboratorData?: {
        criterionId: number;
        rating?: number | null;
        justification?: string;
    };
    // Dados do gestor (read-only)
    managerData?: {
        criterionId: number;
        rating?: number | null;
        justification?: string;
    };
}

export const ReadOnlyManagerAssessment = memo(({ 
    criterion,
    collaboratorData,
    managerData
}: ReadOnlyManagerAssessmentProps) => {

    return (
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="mb-4">
                <Typography variant="h4" className="text-gray-900 mb-2">
                    {criterion.nome}
                </Typography>
                <Typography variant="body" color="muted" className="text-sm">
                    {criterion.descricao}
                </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coluna 1: Autoavaliação do Colaborador */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Typography variant="h4" className="text-blue-600">
                            Autoavaliação
                        </Typography>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <Typography variant="caption" color="muted">
                            Colaborador
                        </Typography>
                    </div>

                    {/* Nota do Colaborador */}
                    <div>
                        <Typography variant="h4" className="mb-2">
                            Nota
                        </Typography>
                        <div className="flex items-center gap-2">
                            <StarRating 
                                value={collaboratorData?.rating || 0}
                                readOnly={true}
                            />
                            <span className="text-sm text-gray-600">
                                {collaboratorData?.rating || 'Não avaliado'}
                            </span>
                        </div>
                    </div>

                    {/* Justificativa do Colaborador */}
                    <div>
                        <Typography variant="h4" className="mb-2">
                            Justificativa
                        </Typography>
                        <div className="bg-white border border-gray-200 rounded-md p-3 min-h-[80px]">
                            <Typography variant="body" color="muted">
                                {collaboratorData?.justification || 'Nenhuma justificativa fornecida'}
                            </Typography>
                        </div>
                    </div>
                </div>

                {/* Coluna 2: Avaliação do Gestor (Read-only para o Comitê) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Typography variant="h4" className="text-emerald-600">
                            Avaliação do Gestor
                        </Typography>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <Typography variant="caption" color="muted">
                            Gestor
                        </Typography>
                    </div>

                    {/* Nota do Gestor */}
                    <div>
                        <Typography variant="h4" className="mb-2">
                            Nota
                        </Typography>
                        <div className="flex items-center gap-2">
                            <StarRating 
                                value={managerData?.rating || 0}
                                readOnly={true}
                            />
                            <span className="text-sm text-gray-600">
                                {managerData?.rating || 'Não avaliado'}
                            </span>
                        </div>
                    </div>

                    {/* Justificativa do Gestor */}
                    <div>
                        <Typography variant="h4" className="mb-2">
                            Justificativa
                        </Typography>
                        <div className="bg-white border border-gray-200 rounded-md p-3 min-h-[80px]">
                            <Typography variant="body" color="muted">
                                {managerData?.justification || 'Nenhuma justificativa fornecida'}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
