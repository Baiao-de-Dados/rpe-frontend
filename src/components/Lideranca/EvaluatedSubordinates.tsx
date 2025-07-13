import React from 'react';
import { Users } from 'lucide-react';
import CardContainer from '../common/CardContainer';
import Typography from '../common/Typography';
import { CHART_COLORS } from '../../utils/colorUtils';

interface EvaluatedSubordinatesProps {
  total: number;
  description?: string;
}

const EvaluatedSubordinates: React.FC<EvaluatedSubordinatesProps> = ({ total, description }) => {
  const color = CHART_COLORS.GOOD;
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-6 mb-6">
      <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4 w-full min-h-[180px]">
        <div className="flex flex-col flex-1 min-w-0">
          <Typography variant="h2" className="text-lg font-bold mb-5 text-black">
            Liderados avaliados
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
                  Foram avaliados{' '}
                  <span className="font-bold" style={{ color }}>{total} colaboradores</span>{' '}
                  liderados por você
                </span>
              )}
            </Typography>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Users className="w-8 h-8 sm:w-10 sm:h-10" style={{ color }} />
          <div className="flex flex-col items-center">
            <span
              className="text-4xl sm:text-5xl font-bold"
              style={{ color }}
            >
              {total}
            </span>
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default EvaluatedSubordinates;
