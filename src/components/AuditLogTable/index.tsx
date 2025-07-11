/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState, useEffect } from "react";

import type { AuditLogEntry } from '../../data/mockAdmin';

import { columnWidths, cellStyles } from './auditLogTableStyles';

import { formatDateTime } from "../../utils/globalUtils";
import { renderDetails, renderIP } from "../../utils/auditLogUtils";
import { renderGroupTitle, type GroupByType, formatJsonStyled } from "../../utils/auditLogTableUtils";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Modal from "../common/Modal";

interface AuditLogTableProps {
    order: 'asc' | 'desc';
    groupBy: GroupByType;
    groupedLogs: Record<string, AuditLogEntry[]> | null;
    sortedLogs: AuditLogEntry[];
    handleSort: () => void;
}

export default function AuditLogTable({ order, groupBy, groupedLogs, sortedLogs, handleSort }: AuditLogTableProps) {

    const [openMetaModal, setOpenMetaModal] = useState(false);
    const [selectedMetadata, setSelectedMetadata] = useState<any | null>(null);

    const handleOpenMetadata = (metadata: any) => {
        setSelectedMetadata(metadata);
        setOpenMetaModal(true);
    };
    const handleCloseMetadata = () => {
        setOpenMetaModal(false);
    };

    useEffect(() => {
        if (!openMetaModal) {
            const timeout = setTimeout(() => setSelectedMetadata(null), 200); 
            return () => clearTimeout(timeout);
        }
    }, [openMetaModal]);

    return (
        <>
        <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none', background: 'transparent', height: 520, overflowY: 'scroll' }}>
            <Table size="small" stickyHeader>
                <TableHead sx={{zIndex: 99, position: 'sticky'}}>
                    <TableRow sx={{ background: 'var(--color-primary-500)' }}>
                        <TableCell
                            sx={{ ...cellStyles.header, width: columnWidths.date, minWidth: columnWidths.date, maxWidth: columnWidths.date, cursor: 'pointer' }}
                            onClick={handleSort}
                        >
                            Data/Hora {order === 'asc' ? '▲' : '▼'}
                        </TableCell>
                        <TableCell sx={{ ...cellStyles.header, width: columnWidths.user, minWidth: columnWidths.user, maxWidth: columnWidths.user }}>
                            Usuário (ID)
                        </TableCell>
                        <TableCell sx={{ ...cellStyles.header, width: columnWidths.action, minWidth: columnWidths.action, maxWidth: columnWidths.action }}>
                            Ação
                        </TableCell>
                        <TableCell sx={{ ...cellStyles.header, width: columnWidths.details, minWidth: columnWidths.details, maxWidth: columnWidths.details }}>
                            Detalhes
                        </TableCell>
                        <TableCell sx={{ ...cellStyles.header, width: columnWidths.ip, minWidth: columnWidths.ip, maxWidth: columnWidths.ip }}>
                            IP
                        </TableCell>
                        <TableCell sx={{ ...cellStyles.header, width: 120, minWidth: 120, maxWidth: 120 }}>
                            Metadata
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedLogs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} sx={{ textAlign: 'center', color: 'var(--color-neutral-600)', fontWeight: 500, py: 6 }}>
                                Nenhum registro encontrado
                            </TableCell>
                        </TableRow>
                    ) : groupBy !== 'none' && groupedLogs ? (
                        Object.entries(groupedLogs).map(([groupKey, group]) => (
                            <Fragment key={groupKey}>
                                <TableRow sx={{ background: 'var(--color-neutral-200)' }}>
                                    <TableCell colSpan={6} sx={{ fontWeight: 700, color: 'var(--color-primary-700)' }}>
                                        {renderGroupTitle(group, groupBy)}
                                    </TableCell>
                                </TableRow>
                                {group.map((entry, idx) => (
                                    <TableRow key={entry.id} sx={{ background: idx % 2 === 0 ? 'white' : 'var(--color-neutral-100)' }}>
                                        <TableCell sx={{ ...cellStyles.body, width: columnWidths.date, minWidth: columnWidths.date, maxWidth: columnWidths.date }}>
                                            {formatDateTime(entry.createdAt)}
                                        </TableCell>
                                        <TableCell sx={{ ...cellStyles.body, width: columnWidths.user, minWidth: columnWidths.user, maxWidth: columnWidths.user }}>
                                            {entry.userId}
                                        </TableCell>
                                        <TableCell sx={{ ...cellStyles.action, width: columnWidths.action, minWidth: columnWidths.action, maxWidth: columnWidths.action }}>
                                            {entry.action}
                                        </TableCell>
                                        <TableCell sx={{ ...cellStyles.body, width: columnWidths.details, minWidth: columnWidths.details, maxWidth: columnWidths.details }}>
                                            {renderDetails(entry)}
                                        </TableCell>
                                        <TableCell sx={{ ...cellStyles.body, width: columnWidths.ip, minWidth: columnWidths.ip, maxWidth: columnWidths.ip }}>
                                            {renderIP(entry)}
                                        </TableCell>
                                        <TableCell sx={{ ...cellStyles.body, width: 120, minWidth: 120, maxWidth: 120 }}>
                                            <button className="bg-primary-100 text-primary-700 border-none rounded-md px-3 py-1 cursor-pointer font-medium text-sm transition-colors duration-200 hover:bg-primary-20" onClick={() => handleOpenMetadata(entry.metadata)}>
                                                Ver metadata
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </Fragment>
                        ))
                    ) : (
                        sortedLogs.map((entry, idx) => (
                            <TableRow key={entry.id} sx={{ background: idx % 2 === 0 ? 'white' : 'var(--color-neutral-100)' }}>
                                <TableCell sx={{ ...cellStyles.body, width: columnWidths.date, minWidth: columnWidths.date, maxWidth: columnWidths.date }}>
                                    {formatDateTime(entry.createdAt)}
                                </TableCell>
                                <TableCell sx={{ ...cellStyles.body, width: columnWidths.user, minWidth: columnWidths.user, maxWidth: columnWidths.user }}>
                                    {entry.userId}
                                </TableCell>
                                <TableCell sx={{ ...cellStyles.action, width: columnWidths.action, minWidth: columnWidths.action, maxWidth: columnWidths.action }}>
                                    {entry.action}
                                </TableCell>
                                <TableCell sx={{ ...cellStyles.body, width: columnWidths.details, minWidth: columnWidths.details, maxWidth: columnWidths.details }}>
                                    {renderDetails(entry)}
                                </TableCell>
                                <TableCell sx={{ ...cellStyles.body, width: columnWidths.ip, minWidth: columnWidths.ip, maxWidth: columnWidths.ip }}>
                                    {renderIP(entry)}
                                </TableCell>
                                <TableCell sx={{ ...cellStyles.body, width: 120, minWidth: 120, maxWidth: 120 }}>
                                    <button className="bg-primary-100 text-primary-700 border-none rounded-md px-3 py-1 cursor-pointer font-medium text-sm transition-colors duration-200 hover:bg-primary-200" onClick={() => handleOpenMetadata(entry.metadata)}>
                                        Ver metadata
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        <Modal open={openMetaModal} onClose={handleCloseMetadata} className="max-w-lg w-full">
            <h2 className="font-bold text-[20px] mb-4 text-primary-700">Metadata</h2>
            <pre className="bg-primary-900 rounded-lg p-4 text-[14px] max-h-[350px] overflow-auto break-all">
                {selectedMetadata ? formatJsonStyled(selectedMetadata) : ''}
            </pre>
        </Modal>
        </>
    );
}
