import type { EvaluationFormData } from '../../../schemas/evaluation';

import type { CollaboratorEvaluatePayload } from '../../../types/evaluations';

export const transformFormData = (data: EvaluationFormData, ciclo: string, colaboradorId: number = 1): CollaboratorEvaluatePayload => {
    const pilaresMap = new Map<number, { criterioId: number; nota: number; justificativa: string }[]>();
    data.selfAssessment?.forEach(assessment => {
        const criterio = {
            criterioId: assessment.criterionId,
            nota: assessment.rating || 0,
            justificativa: assessment.justification,
        };
        const pilarId = assessment.pilarId;
        if (!pilaresMap.has(pilarId)) {
            pilaresMap.set(pilarId, []);
        }
        pilaresMap.get(pilarId)!.push(criterio);
    });
    const pilaresData = Array.from(pilaresMap.entries()).map(([pilarId, criterios]) => ({
        pilarId,
        criterios,
    }));

    const avaliacao360 = data.evaluation360?.map(evaluation => ({
        avaliadoId: evaluation.collaboratorId,
        pontosFortes: evaluation.strengths,
        pontosMelhoria: evaluation.improvements,
        score: evaluation.rating ?? 0,
    })) || [];

    const mentoring = {
        mentorId: data.mentorId ?? 0,
        justificativa: data.mentoringJustification ?? '',
        score: data.mentoringRating ?? 0,
    };

    const referencias = data.references?.map(reference => ({
        colaboradorId: reference.collaboratorId,
        justificativa: reference.justification,
    })) || [];

    return {
        cycleConfigId: Number(ciclo),
        colaboradorId,
        autoavaliacao: {
            pilares: pilaresData,
        },
        avaliacao360,
        mentoring,
        referencias,
    };
};

export const validateTransformedData = (data: CollaboratorEvaluatePayload): true | string => {

    if (!data.cycleConfigId) return "Campo 'cycleConfigId' é obrigatório";
    if (!data.colaboradorId) return "Campo 'colaboradorId' é obrigatório";
    if (!data.autoavaliacao?.pilares || data.autoavaliacao.pilares.length === 0) {
        return 'Autoavaliação deve conter pelo menos um pilar';
    }

    for (const pilar of data.autoavaliacao.pilares) {
        if (!pilar.pilarId) return 'Cada pilar deve ter um ID';
        if (!pilar.criterios || pilar.criterios.length === 0) {
            return `Pilar ${pilar.pilarId} deve conter pelo menos um critério`;
        }

        for (const criterio of pilar.criterios) {
            if (!criterio.criterioId) return 'Cada critério deve ter um ID';
            if (typeof criterio.nota !== 'number' || criterio.nota < 1 || criterio.nota > 5) {
                return `Critério ${criterio.criterioId} deve ter uma nota entre 1 e 5`;
            }
            if (!criterio.justificativa) return `Critério ${criterio.criterioId} deve ter uma justificativa`;
        }
    }

    return true;

};
