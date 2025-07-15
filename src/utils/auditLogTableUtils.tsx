/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableRow, TableCell } from "@mui/material";
import { columnWidths, cellStyles } from "../components/AuditLogTable/auditLogTableStyles";
import { formatDateTime } from "./globalUtils";
import { renderDetails, renderIP } from "./auditLogUtils";

export function renderAuditLogRow(
    entry: AuditLogEntry,
    idx: number,
    handleOpenMetadata: (metadata: any) => void
): JSX.Element {
    return (
        <TableRow key={`${entry.id}-${idx}`} sx={{ background: idx % 2 === 0 ? 'white' : 'var(--color-neutral-100)' }}>
            <TableCell sx={{ ...cellStyles.body, width: columnWidths.date }}>{formatDateTime(entry.createdAt)}</TableCell>
            <TableCell sx={{ ...cellStyles.body, width: columnWidths.user }}>{entry.userId}</TableCell>
            <TableCell sx={{ ...cellStyles.action, width: columnWidths.action }}>{entry.action}</TableCell>
            <TableCell sx={{ ...cellStyles.body, width: columnWidths.details }}>{renderDetails(entry)}</TableCell>
            <TableCell sx={{ ...cellStyles.body, width: columnWidths.ip }}>{renderIP(entry)}</TableCell>
            <TableCell sx={{ ...cellStyles.body, width: 120 }}>
                <button className="bg-primary-100 text-primary-700 border-none rounded-md px-3 py-1 cursor-pointer font-medium text-sm transition-colors duration-200 hover:bg-primary-200"
                    onClick={() => handleOpenMetadata(entry.metadata)}
                >
                    Ver metadata
                </button>
            </TableCell>
        </TableRow>
    );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSX } from 'react';
import type { AuditLogEntry, AuditLogMetadata } from '../types/admin';


export type GroupByType = 'none' | 'user' | 'action' | 'ip' | 'user_action_ip';

function hasIp(metadata: AuditLogMetadata): metadata is { ip: string } {
    return typeof metadata === 'object' && metadata !== null && typeof (metadata as any).ip === 'string';
}

export function getGroupKey(entry: AuditLogEntry, groupBy: GroupByType) {
    const ip = entry.metadata && hasIp(entry.metadata) ? entry.metadata.ip : '-';
    switch (groupBy) {
        case 'user':
            return `${entry.userId}`;
        case 'action':
            return `${entry.action}`;
        case 'ip':
            return `${ip}`;
        case 'user_action_ip':
            return `${entry.userId}|${entry.action}|${ip}`;
        default:
            return '';
    }
}

export function renderGroupTitle(group: AuditLogEntry[], groupBy: GroupByType) {
    const ip = group[0].metadata && hasIp(group[0].metadata) ? group[0].metadata.ip : '-';
    switch (groupBy) {
        case 'user':
            return `Usuário: ${group[0].userId}`;
        case 'action':
            return `Ação: ${group[0].action}`;
        case 'ip':
            return `IP: ${ip}`;
        case 'user_action_ip':
            return `Usuário: ${group[0].userId} | Ação: ${group[0].action} | IP: ${ip}`;
        default:
            return '';
    }
}

export function getGroupedLogs(logs: AuditLogEntry[], groupBy: GroupByType, order: 'asc' | 'desc') {
    if (groupBy === 'none') return null;
    const groups: Record<string, AuditLogEntry[]> = {};
    logs.forEach((entry) => {
        const key = getGroupKey(entry, groupBy);
        if (!groups[key]) groups[key] = [];
        groups[key].push(entry);
    });

    Object.values(groups).forEach(group => {
        group.sort((a, b) => {
            const cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            return order === 'asc' ? cmp : -cmp;
        });
    });
    return groups;
}

export function getSortedLogs(logs: AuditLogEntry[], order: 'asc' | 'desc') {
    return [...logs].sort((a, b) => {
        const cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return order === 'asc' ? cmp : -cmp;
    });
}

export function filterByDateTime<T extends { createdAt: string }>(logs: T[], dateTime: string): T[] {
    if (!dateTime) return logs;

    return logs.filter(log => {
        const logDate = log.createdAt.slice(0, 16);
        return logDate === dateTime;
    });
}

export function filterByAction<T extends { action: string }>(logs: T[], actionFilter: string): T[] {
    if (!actionFilter) return logs;
    return logs.filter(log => log.action.toLowerCase().includes(actionFilter.toLowerCase()));
}

export function filterBySearch(logs: AuditLogEntry[], search: string): AuditLogEntry[] {
    if (!search.trim()) return logs;
    const lower = search.toLowerCase();
    return logs.filter(log =>
        Object.values(log).some(val => {
            if (typeof val === 'string') return val.toLowerCase().includes(lower);
            if (typeof val === 'number') return val.toString().includes(lower);
            if (typeof val === 'object' && val !== null) return JSON.stringify(val).toLowerCase().includes(lower);
            return false;
        })
    );
}

export const GROUP_OPTIONS = [
    { value: 'none', label: 'Nenhum' },
    { value: 'user', label: 'Usuário' },
    { value: 'action', label: 'Ação' },
    { value: 'ip', label: 'IP' },
    { value: 'user_action_ip', label: 'Usuário + Ação + IP' },
];

export const orderParse = (v: string | null) => (v === 'asc' || v === 'desc' ? v : 'desc');
export const orderStringify = (v: 'asc' | 'desc') => v;
export const groupByParse = (v: string | null): GroupByType => (
    ['none', 'user', 'action', 'ip', 'user_action_ip'].includes(v || '') ? (v as GroupByType) : 'none'
);
export const groupByStringify = (v: string) => v;

export function formatJsonStyled(obj: any, indent = 0): JSX.Element {
    const styles = {
        pink:   { color: '#ff79c6' },
        purple: { color: '#bd93f9' },
        cyan:   { color: '#8be9fd' },
        green:  { color: '#50fa7b' },
        orange: { color: '#ffb86c' },
        yellow: { color: '#f1fa8c' },
        white:  { color: '#f8f8f2' },
    };

    if (obj === null) {
        return <span style={styles.pink}>null</span>;
    }
    if (Array.isArray(obj)) {
        return (
        <>
            <span style={styles.purple}>[</span>
            {obj.map((item, idx) => (
            <div key={idx} style={{ paddingLeft: 20 * (indent + 1) }}>
                {formatJsonStyled(item, indent + 1)}
                {idx < obj.length - 1 && <span style={styles.purple}>,</span>}
            </div>
            ))}
            <span style={styles.purple}>]</span>
        </>
        );
    }
    if (typeof obj === 'object') {
        const entries = Object.entries(obj);
        return (
        <>
            <span style={styles.purple}>{'{'}</span>
            {entries.map(([key, value], idx) => (
            <div key={key} style={{ paddingLeft: 20 * (indent + 1) }}>
                <span style={styles.cyan}>"{key}"</span>
                <span style={styles.purple}>: </span>
                {formatJsonStyled(value, indent + 1)}
                {idx < entries.length - 1 && <span style={styles.purple}>,</span>}
            </div>
            ))}
            <span style={styles.purple}>{'}'}</span>
        </>
        );
    }
    if (typeof obj === 'string') {
        return <span style={styles.green}>"{obj}"</span>;
    }
    if (typeof obj === 'number') {
        return <span style={styles.orange}>{obj}</span>;
    }
    if (typeof obj === 'boolean') {
        return <span style={styles.yellow}>{obj ? 'true' : 'false'}</span>;
    }
    return <span style={styles.white}>{String(obj)}</span>;
}


