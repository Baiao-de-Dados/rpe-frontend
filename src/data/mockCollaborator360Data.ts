import mockEvaluations from './mockEvaluations';

export function getCollaborator360Evaluations(collaboratorId: string) {
    // Simular busca de avaliações 360° recebidas pelo colaborador
    // Na realidade, isso viria de uma API
    
    // Para o mock, vamos usar o primeiro ciclo como exemplo
    // TODO: Usar collaboratorId para filtrar avaliações específicas do colaborador
    void collaboratorId
    const firstCycle = mockEvaluations.cycles[0];
    
    return {
        cycleData: firstCycle,
        evaluations360: firstCycle.evaluation360.evaluation,
        referencesReceived: firstCycle.reference,
    };
}