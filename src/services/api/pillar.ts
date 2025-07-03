import api from '.';
import type {
    CreatePillarPayload,
    CreateCriteriaPayload,
    UpdateCriteriasPayload,
} from '../../types/pillar';

export const pillarEndpoints = {
    getPillars: () => api.get('/pillars'),
    createPillar: (payload: CreatePillarPayload) =>
        api.post('/pillars', payload),
    getCriteriasByPillar: (pillarId: number) =>
        api.get(`/criteria/pillar/${pillarId}`),
    createCriteria: (payload: CreateCriteriaPayload) =>
        api.post(`/criteria`, payload),
    updateCriterias: (payload: UpdateCriteriasPayload) =>
        api.patch(`/criteria`, payload),
};
