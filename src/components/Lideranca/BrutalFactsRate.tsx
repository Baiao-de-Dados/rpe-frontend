import React from 'react';
import { Star } from 'lucide-react';
import CardContainer from '../common/CardContainer';
import Typography from '../common/Typography';
import { CHART_COLORS, getScoreLabel } from '../../utils/colorUtils';

interface BrutalFactsRateProps {
  score: number;
  cycleLabel: string;
  description?: string;
  cicle?: string;
}

const BrutalFactsRate: React.FC<BrutalFactsRateProps> = ({ score, cycleLabel, description }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-6 mb-6">
      <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4 w-full min-h-[180px]">
        <div className="flex flex-col flex-1 min-w-0">
          <Typography variant="h2" className="text-lg font-bold mb-5 text-black">
            Nota média geral
          </Typography>
          <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.EXCELLENT }}>
            <Typography
              variant="caption"
              className="text-gray-500 max-w-[20rem] leading-5"
            >
              {description ? (
                <span>{description}</span>
              ) : (
                <span>Em comparação ao ciclo {cycleLabel}.</span>
              )}
            </Typography>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Star className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.EXCELLENT }} fill={CHART_COLORS.EXCELLENT} />
          <div className="flex flex-col items-center">
            <span
              className="text-4xl sm:text-5xl font-bold"
              style={{ color: CHART_COLORS.EXCELLENT }}
            >
              {score.toFixed(2)}
            </span>
            <span
              className="font-bold text-sm sm:text-base"
              style={{ color: CHART_COLORS.EXCELLENT }}
            >
              {getScoreLabel(score)}
            </span>
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default BrutalFactsRate;
