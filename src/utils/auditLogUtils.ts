import type { AuditLogEntry, AuditLogMetadata } from "../types/admin";

export function isLoginMeta(meta: AuditLogMetadata): meta is { ip: string; userAgent: string; details: string } {
    return 'details' in meta && 'userAgent' in meta;
}
export function isExportMeta(meta: AuditLogMetadata): meta is { exportedBy: string; exportType: string } {
    return 'exportedBy' in meta && 'exportType' in meta;
}
export function isUnauthorizedMeta(meta: AuditLogMetadata): meta is { ip: string; attemptedUrl: string; reason: string } {
    return 'attemptedUrl' in meta && 'reason' in meta;
}

export function renderDetails(entry: AuditLogEntry) {
    if (isLoginMeta(entry.metadata)) {
        return entry.metadata.details;
    }
    if (isExportMeta(entry.metadata)) {
        return `Exportado por ${entry.metadata.exportedBy} (${entry.metadata.exportType})`;
    }
    if (isUnauthorizedMeta(entry.metadata)) {
        return `Tentativa em ${entry.metadata.attemptedUrl}: ${entry.metadata.reason}`;
    }
    return '-';
}

export function renderIP(entry: AuditLogEntry) {
    if ('ip' in entry.metadata) {
        return entry.metadata.ip;
    }
    return '-';
}
