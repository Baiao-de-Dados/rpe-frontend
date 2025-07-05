import React from 'react';
import { 
    getScoreStyles,
    getScoreBgStyles,
    getScoreBadgeStyles 
} from '../../utils/colorUtils';

interface ScoreDisplayProps {
    score: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
    // Sempre usa estilos inline para garantir funcionamento em produção
    return (
        <div className="flex items-center gap-2">
            <span 
                className="text-lg font-bold"
                style={getScoreStyles(score)}
            >
                {score.toFixed(1)}
            </span>
            <span 
                className="px-2 py-1 text-sm font-medium rounded"
                style={getScoreBadgeStyles(score)}
            >
                Score
            </span>
            <span 
                className="px-3 py-1 text-sm font-bold rounded"
                style={getScoreBgStyles(score)}
            >
                {score.toFixed(1)}
            </span>
        </div>
    );
};

export default ScoreDisplay;
