import api from '.';
import type { GetLogsResponse } from '../../types/admin';

export const adminEndpoints = {
    getLogs: (params: { 
        page: number; 
        pageSize: number; 
        action?: string; 
        search?: string; 
        dateFrom?: string; 
        dateTo?: string; 
        order?: 'asc' | 'desc';
    }) => api.get<GetLogsResponse>('/logs', { params }),
};
