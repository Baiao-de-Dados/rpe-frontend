/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState, useEffect, useRef } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Modal from "../common/Modal";

import { columnWidths, cellStyles } from './auditLogTableStyles';
import { renderGroupTitle, type GroupByType, formatJsonStyled, renderAuditLogRow } from "../../utils/auditLogTableUtils";
import type { AuditLogEntry } from "../../types/admin";

interface AuditLogTableProps {
    order: 'asc' | 'desc';
    groupBy: GroupByType;
    groupedLogs: Record<string, AuditLogEntry[]> | null;
    sortedLogs: AuditLogEntry[];
    handleSort: () => void;
    onLoadMore?: () => void;
    loadingMore?: boolean;
}

export default function AuditLogTable({
    order,
    groupBy,
    groupedLogs,
    sortedLogs,
    handleSort,
    onLoadMore,
    loadingMore
}: AuditLogTableProps) {

    const [openMetaModal, setOpenMetaModal] = useState(false);
    const [selectedMetadata, setSelectedMetadata] = useState<any | null>(null);
    const loadMoreRef = useRef<HTMLTableRowElement | null>(null);

    const handleOpenMetadata = (metadata: any) => {
        setSelectedMetadata(metadata);
        setOpenMetaModal(true);
    };
    const handleCloseMetadata = () => setOpenMetaModal(false);

    useEffect(() => {
        if (!openMetaModal) {
            const timeout = setTimeout(() => setSelectedMetadata(null), 200);
            return () => clearTimeout(timeout);
        }
    }, [openMetaModal]);

    const tableContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    if (!onLoadMore || loadingMore) return;

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                onLoadMore();
            }
        },
        {
            root: tableContainerRef.current,
            threshold: 0.1,
        }
    );

    const el = loadMoreRef.current;
    if (el) {
        observer.observe(el);
    }
    return () => {
        if (el) {
            observer.unobserve(el);
        }
    };
}, [onLoadMore, loadingMore]);


    const renderRow = (entry: AuditLogEntry, idx: number) => (
        renderAuditLogRow(entry, idx, handleOpenMetadata)
    );

    return (
        <>
            <TableContainer ref={tableContainerRef} component={Paper} elevation={0} sx={{ boxShadow: 'none', background: 'transparent', height: 520, overflowY: 'scroll', position: 'relative' }}>
                <Table size="small" stickyHeader>
                    <TableHead sx={{ zIndex: 99, position: 'sticky' }}>
                        <TableRow sx={{ background: 'var(--color-primary-500)' }}>
                            <TableCell sx={{ ...cellStyles.header, width: columnWidths.date, cursor: 'pointer' }} onClick={handleSort}>
                                Data/Hora {order === 'asc' ? '▲' : '▼'}
                            </TableCell>
                            <TableCell sx={{ ...cellStyles.header, width: columnWidths.user }}>Usuário (ID)</TableCell>
                            <TableCell sx={{ ...cellStyles.header, width: columnWidths.action }}>Ação</TableCell>
                            <TableCell sx={{ ...cellStyles.header, width: columnWidths.details }}>Detalhes</TableCell>
                            <TableCell sx={{ ...cellStyles.header, width: columnWidths.ip }}>IP</TableCell>
                            <TableCell sx={{ ...cellStyles.header, width: 120 }}>Metadata</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(groupBy === 'none' && sortedLogs.length === 0) || (groupBy !== 'none' && (!groupedLogs || Object.keys(groupedLogs).length === 0)) ? (
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
                                    {group.map(renderRow)}
                                </Fragment>
                            ))
                        ) : (
                            sortedLogs.map(renderRow)
                        )}
                        {onLoadMore && (
                            <TableRow ref={loadMoreRef}>
                                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 2, color: 'var(--color-neutral-600)' }}>
                                    {loadingMore ? 'Carregando mais logs...' : 'Rolando para carregar mais...'}
                                </TableCell>
                            </TableRow>
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
