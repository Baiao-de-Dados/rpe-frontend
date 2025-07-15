export type AuditLogAction = 'LOGIN' | 'EXPORT_EVALUATIONS' | 'UNAUTHORIZED_ACCESS';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AuditLogMetadata = Record<string, any>;

export interface AuditLogEntry {
    id: number;
    userId: number;
    action: AuditLogAction;
    metadata: AuditLogMetadata;
    createdAt: string;
}
export interface GetLogsResponse {
    logs: AuditLogEntry[];
    hasNext: boolean;
    currentPage: number;
}

export type LogsFilters = {
    action?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    order?: 'asc' | 'desc';
};
