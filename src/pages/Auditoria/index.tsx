import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { Box } from "@mui/material";
import { useQueryState } from 'nuqs';
import { motion } from 'framer-motion';

import * as U from '../../utils/auditLogTableUtils';

import AuditLogTable from '../../components/AuditLogTable';
import PageHeader from "../../components/common/PageHeader";
import Typography from "../../components/common/Typography";
import { useInfiniteLogs } from "../../hooks/api/useAdminQuery";
import CardContainer from "../../components/common/CardContainer";
import AuditLogFilter from '../../components/AuditLogTable/AuditLogFilter';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

export function Auditoria() {

    const [dateTime, setDateTime] = useQueryState('dateTime', { defaultValue: '' });
    const [order, setOrder] = useQueryState<'asc' | 'desc'>('order', {
        defaultValue: 'desc',
        parse: U.orderParse,
        serialize: U.orderStringify,
    });
    const [groupBy, setGroupBy] = useQueryState<U.GroupByType>('groupBy', {
        defaultValue: 'none',
        parse: U.groupByParse,
        serialize: U.groupByStringify,
    });
    const [actionFilter, setActionFilter] = useQueryState('action', { defaultValue: '' });
    const [search, setSearch] = useQueryState('search', { defaultValue: '' });

    const handleSort = () => setOrder(order === 'asc' ? 'desc' : 'asc');

    const [start] = dateTime ? dateTime.split(',') : [];

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteLogs({
        action: actionFilter || undefined,
        search: search || undefined,
        dateFrom: start || undefined, 
        order,
    });

    console.log(start)

    const allLogs = useMemo(() => data?.pages.flatMap(page => page.logs) ?? [], [data]);

    const { variants } = useOptimizedAnimation();

    const allActions = useMemo(() => {
        if (!data) return [];
        return Array.from(new Set(data.pages.flatMap(page => page.logs.map(log => log.action))));
    }, [data]);

    // Agrupamento local
    const groupedLogs = useMemo(() =>
        groupBy === 'none' ? null : U.getGroupedLogs(allLogs, groupBy, order),
        [allLogs, groupBy, order]
    );

    return (
        <>
            <PageHeader title="Auditoria" />
            <main className="p-8 pt-6">
                <motion.div variants={variants.animatedCard} initial="hidden" animate="visible">
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
                                actions={allActions}
                                search={search}
                                setSearch={setSearch}
                            />
                        </Box>
                        {isLoading ? (
                            <div className="flex items-center justify-center my-6">
                                <Loader2 className="animate-spin" color="var(--color-primary-500)" size={40} />
                            </div>
                        ) : (
                            <AuditLogTable
                                order={order}
                                groupBy={groupBy}
                                groupedLogs={groupedLogs}
                                sortedLogs={groupBy === 'none' ? allLogs : []}
                                handleSort={handleSort}
                                onLoadMore={hasNextPage ? fetchNextPage : undefined}
                                loadingMore={isFetchingNextPage}
                            />
                        )}
                    </CardContainer>
                </motion.div>
            </main>
        </>
    );
}
