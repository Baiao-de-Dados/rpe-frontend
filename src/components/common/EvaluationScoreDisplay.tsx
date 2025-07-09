import Typography from './Typography';
import { getScoreBgStyles } from '../../utils/colorUtils';

interface EvaluationScoreDisplayProps {
    score: number | null | undefined;
    label?: string;
    showLabel?: boolean;
    className?: string;
}

const EvaluationScoreDisplay = ({
    score,
    label = 'Nota',
    showLabel = true,
    className = ''
}: EvaluationScoreDisplayProps) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    
    const defaultStyle = {
        backgroundColor: '#f5f5f5',
        color: '#167174'
    };
    
    const badgeStyle = score !== null && score !== undefined ? getScoreBgStyles(score) : defaultStyle;
    
    const displayValue = score !== null && score !== undefined ? score.toFixed(1) : '-';

    return (
        <div className={`flex flex-col items-center min-w-[48px] sm:min-w-[80px] ${className}`}>
            {showLabel && !isMobile && (
                <Typography
                    variant="caption"
                    className="text-neutral-500 mb-1 text-xs font-normal"
                >
                    {label}
                </Typography>
            )}
            <div
                className="rounded text-base font-semibold px-2 sm:px-4 py-1 min-w-[32px] sm:min-w-[36px] text-center"
                style={{ minHeight: 28, ...badgeStyle }}
            >
                {displayValue}
            </div>
        </div>
    );
};

export default EvaluationScoreDisplay;
