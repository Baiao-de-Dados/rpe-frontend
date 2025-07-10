import React from 'react';
import { Star } from 'lucide-react';
import CardContainer from '../common/CardContainer';
import Typography from '../common/Typography';

interface BrutalFactsRateProps {
  score: number;
  cycleLabel: string;
  description?: string;
  cicle?: string;
}

const getScoreLabel = (score: number) => {
  if (score >= 4.5) return 'Great';
  if (score >= 3.5) return 'Good';
  if (score >= 2.5) return 'Regular';
  return 'Needs improvement';
};

const BrutalFactsRate: React.FC<BrutalFactsRateProps> = ({ score, cycleLabel, description }) => {
  return (
    <CardContainer className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 bg-neutral-50 px-4 sm:px-8 py-6 rounded-2xl shadow-none border border-neutral-200 min-h-[180px] w-full h-full">
      <div className="flex-1 min-w-0 w-full">
        <Typography variant="h2" className="text-black font-bold text-lg mb-2 sm:mb-3">Nota média geral</Typography>
        <div className="text-neutral-500 text-sm border-l-4 border-green-600 pl-4 leading-tight break-words h-auto min-h-[2.5rem] flex items-center">
          {description || <span>Em comparação ao ciclo {cycleLabel}.</span>}
        </div>
      </div>
      <div className="flex items-center min-w-[90px] gap-2 sm:gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-center">
        <div className="flex items-center justify-center">
          <Star className="w-10 h-10" fill="#16A34A" color="#16A34A" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-3xl sm:text-4xl font-bold text-green-600 leading-none">{score.toFixed(2)}</span>
          <span className="text-green-600 font-semibold text-base mt-1">{getScoreLabel(score)}</span>
        </div>
      </div>
    </CardContainer>
  );
};

export default BrutalFactsRate;
