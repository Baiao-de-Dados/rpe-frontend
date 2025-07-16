import Badge from './Badge';
import Typography from './Typography';
import SummaryBox from './SummaryBox';

import { getStatusVariant } from '../../utils/statusUtils';
import { getScoreBadgeClasses, getScoreLabel } from '../../utils/colorUtils';

interface CycleCardProps {
    score: number;
    status: 'Finalizado' | 'Em andamento' | 'Pendente' | 'Cancelado';
    cycleName: string;
    summary: string;
    onClick?: () => void;
}

export function CycleCard({ score, status, cycleName, summary, onClick }: CycleCardProps) {

    // Converte a pontuação para uma variante de cor compatível com Typography
    const getScoreColorVariant = () => {
        if (status === 'Em andamento') {
            return 'muted';
        }

        if (score >= 4.5) return 'success';
        if (score >= 3.5) return 'secondary'; // Para teal médio
        if (score >= 2.5) return 'warning';
        if (score >= 1.5) return 'warning';
        return 'error';
    };

    const getScoreDisplayLabel = () => {
        if (status === 'Em andamento') {
            return '';
        }
        return getScoreLabel(score);
    };

    const scoreValue = status === 'Em andamento' ? '-' : score;
    const scoreColor = getScoreColorVariant();
    const scoreLabel = getScoreDisplayLabel();

    const scoreBadgeClasses = status !== 'Em andamento' ? getScoreBadgeClasses(score) : '';

    return (
        <div className="p-4 bg-white rounded-lg border border-neutral-100 mb-4 cursor-pointer hover:shadow-sm transition-shadow" onClick={onClick}>
            <div className="flex flex-col sm:flex-row">
                <div className="flex justify-between items-center mb-3 sm:hidden">
                    <Typography variant="h3" color="primary" className="font-bold text-lg">
                        {cycleName}
                    </Typography>
                    <Badge 
                        label={status} 
                        variant={getStatusVariant(status)} 
                        size="sm"
                    />
                </div>

                <div className={`w-full sm:w-[80px] h-[80px] sm:h-[130px] border border-gray-100 flex flex-row sm:flex-col items-center justify-center mb-3 sm:mb-0 sm:mr-4 rounded-lg ${status !== 'Em andamento' ? scoreBadgeClasses : 'bg-neutral-50'}`}>
                    <div className="flex flex-col items-center">
                        <Typography variant="h2" color={scoreColor}>
                            {scoreValue}
                        </Typography>
                        {scoreLabel && (
                            <Typography variant="caption" color={scoreColor} className="mt-1 text-xs">
                                {scoreLabel}
                            </Typography>
                        )}
                    </div>
                </div>

                <div className="flex-1 hidden sm:block">
                    <div className="flex justify-between items-start mb-2">
                        <Typography variant="h3" color="primary" className="font-bold">
                            {cycleName}
                        </Typography>

                        <Badge 
                            label={status} 
                            variant={getStatusVariant(status)} 
                            size="md"
                        />
                    </div>
                    <SummaryBox summary={summary} className="w-full break-words whitespace-pre-line" />
                </div>

                <div className="sm:hidden">
                    <SummaryBox summary={summary} />
                </div>
            </div>
        </div>
    );
}
