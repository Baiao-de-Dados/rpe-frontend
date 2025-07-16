import api from '.';
import type { GetRHCollaborators, GetRHDashboard, GetRHTracks } from '../../types/rh';

export const rhEndpoints = {
    getCycles: () => 
        api.get<GetRHCollaborators[]>('/collaborators'),
    getRHDashboard: () => 
        api.get<GetRHDashboard>('/rh/panel/dashboard-simple'),
    getRHTracks: () =>
        api.get<GetRHTracks>('/rh/panel/trackCompletionStats'),
};
