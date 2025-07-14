import api from '.';

import type { Cycles, StartCyclePayload, ExtendCyclePayload } from '../../types/cycle';

export const cycleEndpoints = {
    getCycles: () => 
        api.get<Cycles>('/cycle-config/'),
    startCycle: (payload: StartCyclePayload) => 
        api.post('/cycle-config/', payload),
    extendCycle: (id: number, payload: ExtendCyclePayload) => 
        api.post(`/cycle-config/${id}/extend`, payload),
    cancelCycle: (id: number) => 
        api.delete(`/cycle-config/${id}/cancel`),
};
