import api from '.';
import type { ERP, GetLogsResponse } from '../../types/admin';

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
    getERP: () =>
        api.get<ERP>('/erp/export'),
    synchronize: () =>
        api.post('/erp/synchronize'),
};