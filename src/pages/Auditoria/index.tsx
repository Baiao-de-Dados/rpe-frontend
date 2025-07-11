import { useMemo } from "react";
import { Box } from "@mui/material";
import { useQueryState } from 'nuqs';

import { mockAuditLogs, type AuditLogAction } from "../../data/mockAdmin";

import AuditLogTable from '../../components/AuditLogTable';
import PageHeader from "../../components/common/PageHeader";
import Typography from "../../components/common/Typography";
import CardContainer from "../../components/common/CardContainer";
import AuditLogFilter from '../../components/AuditLogTable/AuditLogFilter';

import { type GroupByType, getGroupedLogs, getSortedLogs, filterByDateTime, filterByAction, orderParse, orderStringify, groupByParse, groupByStringify, filterBySearch } from '../../utils/auditLogTableUtils';

export function Auditoria() {

    const [dateTime, setDateTime] = useQueryState('dateTime', {
        defaultValue: '',
    });
    const [order, setOrder] = useQueryState<'asc' | 'desc'>('order', {
        defaultValue: 'desc',
        parse: orderParse,
        serialize: orderStringify,
    });
    const [groupBy, setGroupBy] = useQueryState<GroupByType>('groupBy', {
        defaultValue: 'none',
        parse: groupByParse,
        serialize: groupByStringify,
    });
    const [actionFilter, setActionFilter] = useQueryState('action', {
        defaultValue: '',
    });
    const [search, setSearch] = useQueryState('search', {
        defaultValue: '',
    });

    const actions = useMemo<AuditLogAction[]>(() => 
        Array.from(new Set(mockAuditLogs.map(log => log.action))),
    []);

    const filteredLogs = useMemo(() => {
        let logs = filterByDateTime(mockAuditLogs, dateTime);
        logs = filterByAction(logs, actionFilter);
        logs = filterBySearch(logs, search);
        return logs;
    }, [dateTime, actionFilter, search]);

    const sortedLogs = useMemo(() => 
        getSortedLogs(filteredLogs, order), [filteredLogs, order]);
    const groupedLogs = useMemo(() => 
        getGroupedLogs(filteredLogs, groupBy, order), [filteredLogs, order, groupBy]);

    const handleSort = () => setOrder(order === 'asc' ? 'desc' : 'asc');

    return (
        <>
            <PageHeader title="Auditoria" />
            <main className="p-8 pt-6">
                <CardContainer className="p-8 px-10">
                    <Typography className="mb-6" variant="h2">
                        Logs do Sistema
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2} mb={2} width="100%">
                        <AuditLogFilter
                            groupBy={groupBy}
                            setGroupBy={setGroupBy}
                            dateTime={dateTime}
                            setDateTime={setDateTime}
                            actionFilter={actionFilter}
                            setActionFilter={setActionFilter}
                            actions={actions}
                            search={search}
                            setSearch={setSearch}
                        />
                    </Box>
                    <AuditLogTable
                        order={order}
                        groupBy={groupBy}
                        groupedLogs={groupedLogs}
                        sortedLogs={sortedLogs}
                        handleSort={handleSort}
                    />
                </CardContainer>
            </main>
        </>
    );
}
