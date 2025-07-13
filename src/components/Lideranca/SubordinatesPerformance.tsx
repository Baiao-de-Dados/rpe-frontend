import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import CardContainer from '../common/CardContainer';
import Typography from '../common/Typography';
import { CHART_COLORS } from '../../utils/colorUtils';

interface SubordinatesPerformanceProps {
  growth: number;
  cycleLabel: string;
  description?: string;
}

const SubordinatesPerformance: React.FC<SubordinatesPerformanceProps> = ({ growth, cycleLabel, description }) => {
  const isPositive = growth > 0;
  const isNegative = growth < 0;
  const color = CHART_COLORS.EXCELLENT;

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-6 mb-6">
      <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4 w-full min-h-[180px]">
        <div className="flex flex-col flex-1 min-w-0">
          <Typography variant="h2" className="text-lg font-bold mb-5 text-black">
            Desempenho de liderados
          </Typography>
          <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: color }}>
            <Typography
              variant="caption"
              className="text-gray-500 max-w-[20rem] leading-5"
            >
              {description ? (
                <span>{description}</span>
              ) : (
                <span>
                  Crescimento de{' '}
                  <span className="font-bold" style={{ color }}>
                    {isPositive ? `+${growth}` : growth}
                  </span>{' '}
                  comparação ao ciclo {cycleLabel}
                </span>
              )}
            </Typography>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {isPositive && (
            <ArrowUp className="w-8 h-8 sm:w-10 sm:h-10" style={{ color }} strokeWidth={2.5} />
          )}
          {isNegative && (
            <ArrowDown className="w-8 h-8 sm:w-10 sm:h-10" style={{ color }} strokeWidth={2.5} />
          )}
          <div className="flex flex-col items-center">
            <span
              className="text-4xl sm:text-5xl font-bold"
              style={{ color }}
            >
              {isPositive ? `+${growth}` : growth}
            </span>
            <span
              className="font-bold text-sm sm:text-base"
              style={{ color }}
            >
            </span>
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default SubordinatesPerformance;
