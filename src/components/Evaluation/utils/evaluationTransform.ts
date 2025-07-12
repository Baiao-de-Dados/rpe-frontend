import type { EvaluationFormData } from '../../../schemas/evaluation';

export interface CriterioOutput {
    criterioId: number;
    nota: number;
    justificativa: string;
}

export interface PilarOutput {
    pilarId: number;
    criterios: CriterioOutput[];
}

export interface TransformedEvaluationData {
    ciclo: string;
    colaboradorId: number;
    autoavaliacao: {
        pilares: PilarOutput[];
    };
    avaliacao360: Array<{
        avaliadoId: number;
        pontosFortes: string;
        pontosMelhoria: string;
    }>;
    mentoring: Array<{
        mentorId: number;
        justificativa: string;
    }>;
    referencias: Array<{
        colaboradorId: number;
        justificativa: string;
    }>;
}

export const transformFormData = (data: EvaluationFormData, ciclo: string, colaboradorId: number = 1): TransformedEvaluationData => {
    const pilaresMap = new Map<number, CriterioOutput[]>();
    data.selfAssessment?.forEach(assessment => {
        const criterio: CriterioOutput = {
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
    const pilaresData: PilarOutput[] = Array.from(pilaresMap.entries()).map(([pilarId, criterios]) => ({
        pilarId,
        criterios,
    }));
    const avaliacao360 = data.evaluation360?.map(evaluation => ({
        avaliadoId: evaluation.collaboratorId,
        pontosFortes: evaluation.strengths,
        pontosMelhoria: evaluation.improvements,
    })) || [];
    const mentoring = data.mentoringRating && data.mentoringJustification && data.mentorId ? [{
        mentorId: data.mentorId,
        justificativa: data.mentoringJustification,
    }] : [];
    const referencias = data.references?.map(reference => ({
        colaboradorId: reference.collaboratorId,
        justificativa: reference.justification,
    })) || [];
    return {
        ciclo,
        colaboradorId,
        autoavaliacao: {
            pilares: pilaresData,
        },
        avaliacao360,
        mentoring,
        referencias,
    };
};

export const validateTransformedData = (data: TransformedEvaluationData): true | string => {

    if (!data.ciclo) return "Campo 'ciclo' é obrigatório";
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
