import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import { LuNotebookPen } from 'react-icons/lu';
import { CHART_COLORS } from '../../utils/colorUtils';

interface AvaliacoesRealizadasProps {
    finalizedCyclesCount: number;
}

export function AvaliacoesRealizadas({
    finalizedCyclesCount,
}: AvaliacoesRealizadasProps) {
    return (
        <CardContainer className="flex items-center justify-between">
            <div className="flex flex-col border-l-4 pl-4" style={{ borderLeftColor: CHART_COLORS.GOOD }}>
                <Typography variant="h2" className="text-lg font-bold">
                    Avaliações realizadas
                </Typography>
                <Typography variant="caption" className="text-gray-500 mt-2">
                    Total de avaliações
                </Typography>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-3xl" style={{ color: CHART_COLORS.GOOD }}>
                    <LuNotebookPen />
                </span>
                <span
                    className="text-4xl font-bold"
                    style={{ color: CHART_COLORS.GOOD }}
                >
                    {finalizedCyclesCount}
                </span>
            </div>
        </CardContainer>
    );
}
