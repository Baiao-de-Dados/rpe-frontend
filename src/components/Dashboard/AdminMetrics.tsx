import { LuCalendarCheck2, LuUsers, LuFolder } from 'react-icons/lu';

import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';

import { CHART_COLORS } from '../../utils/colorUtils';
import { formatDateTime } from '../../utils/globalUtils';

interface AdminMetricsProps {
    importedUsers: number;
    importedProjects: number;
    lastSyncDate: string; 
}

export function AdminMetrics({ importedProjects, importedUsers, lastSyncDate }: AdminMetricsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">

            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-lg font-bold mb-5">
                        Usuários importados
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.EXCELLENT }}>
                        <Typography variant="caption" className="text-gray-500 max-w-[20rem] leading-5">
                            <span className="font-semibold" style={{ color: CHART_COLORS.EXCELLENT }}>
                                {importedUsers}
                            </span>{' '}
                            usuários foram importados do ERP
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <LuUsers className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.EXCELLENT }} />
                    <span className="text-4xl sm:text-5xl font-bold" style={{ color: CHART_COLORS.EXCELLENT }}>
                        {importedUsers}
                    </span>
                </div>
            </CardContainer>

            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-lg font-bold mb-5">
                        Projetos importados
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.GOOD }}>
                        <Typography variant="caption" className="text-gray-500 max-w-[20rem] leading-5">
                            <span className="font-semibold" style={{ color: CHART_COLORS.GOOD }}>
                                {importedProjects}
                            </span>{' '}
                            projetos foram importados do ERP
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <LuFolder className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.GOOD }} />
                    <span className="text-4xl sm:text-5xl font-bold" style={{ color: CHART_COLORS.GOOD }}>
                        {importedProjects}
                    </span>
                </div>
            </CardContainer>

            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-lg font-bold mb-5">
                        Última sincronização
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.BELOW }}>
                        <Typography variant="caption" className="text-gray-500 max-w-[20rem] leading-5">
                            Sincronizado em{' '}
                            <span className="font-semibold" style={{ color: CHART_COLORS.BELOW }}>
                                {formatDateTime(lastSyncDate)}
                            </span>
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <LuCalendarCheck2 className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.BELOW }} />
                </div>
            </CardContainer>
        </div>
    );
}
