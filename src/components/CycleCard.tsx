import Typography from './Typography';
import Badge from './Badge';
import { getStatusVariant } from '../utils/statusUtils';
import SummaryBox from './SummaryBox';

interface CycleCardProps {
    score: number;
    status: 'Finalizado' | 'Em andamento' | 'Pendente' | 'Cancelado';
    cycleName: string;
    summary: string;
    onClick?: () => void;
}

export function CycleCard({
    score,
    status,
    cycleName,
    summary,
    onClick,
}: CycleCardProps) {
    const getScoreColorVariant = () => {
        if (status === 'Em andamento') {
            return 'muted';
        }

        if (score >= 4.5) return 'success';
        if (score >= 4.0) return 'secondary';
        if (score >= 3.0) return 'warning';
        return 'error';
    };

    const getScoreLabel = () => {
        if (status === 'Em andamento') {
            return '';
        }

        if (score >= 4.5) return 'Great';
        if (score >= 4.0) return 'Good';
        if (score >= 3.0) return 'Average';
        return 'Poor';
    };

    const scoreValue = status === 'Em andamento' ? '-' : score;
    const scoreColor = getScoreColorVariant();
    const scoreLabel = getScoreLabel();

    return (
        <div
            className="p-4 bg-white rounded-lg border border-neutral-100 mb-4 cursor-pointer hover:shadow-sm transition-shadow"
            onClick={onClick}
        >
            <div className="flex">
                {/* Bloco da nota à esquerda */}
                <div className="w-[120px] h-[120px] bg-neutral-50 flex flex-col items-center justify-center mr-4">
                    <Typography
                        variant="h1"
                        color={scoreColor}
                        className="text-4xl font-bold leading-none"
                    >
                        {scoreValue}
                    </Typography>

                    {scoreLabel && (
                        <Typography
                            variant="caption"
                            color={scoreColor}
                            className="mt-1"
                        >
                            {scoreLabel}
                        </Typography>
                    )}
                </div>
                {/* Conteúdo à direita */}
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <Typography
                            variant="h3"
                            color="primary"
                            className="font-bold"
                        >
                            {cycleName}
                        </Typography>

                        <Badge
                            label={status}
                            variant={getStatusVariant(status)}
                            size="sm"
                        />
                    </div>
                    <SummaryBox summary={summary} />
                </div>
            </div>
        </div>
    );
}
