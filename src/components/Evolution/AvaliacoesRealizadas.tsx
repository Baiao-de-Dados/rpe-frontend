import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import { LuNotebookPen } from 'react-icons/lu';

interface AvaliacoesRealizadasProps {
    finalizedCyclesCount: number;
}

export function AvaliacoesRealizadas({
    finalizedCyclesCount,
}: AvaliacoesRealizadasProps) {
    return (
        <CardContainer className="flex items-center justify-between">
            <div className="flex flex-col border-l-4 border-teal-600 pl-4">
                <Typography variant="h2" className="text-lg font-bold">
                    Avaliações realizadas
                </Typography>
                <Typography variant="caption" className="text-gray-500 mt-2">
                    Total de avaliações
                </Typography>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-teal-600 text-3xl">
                    <LuNotebookPen />
                </span>
                <Typography
                    variant="h1"
                    className="text-4xl font-bold text-teal-600"
                >
                    {finalizedCyclesCount}
                </Typography>
            </div>
        </CardContainer>
    );
}
