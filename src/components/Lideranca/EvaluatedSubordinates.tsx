import React from 'react';
import { Users } from 'lucide-react';
import CardContainer from '../common/CardContainer';
import Typography from '../common/Typography';

interface EvaluatedSubordinatesProps {
  total: number;
  description?: string;
}

const EvaluatedSubordinates: React.FC<EvaluatedSubordinatesProps> = ({ total, description }) => {
  return (
    <CardContainer className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 bg-neutral-50 px-4 sm:px-8 py-6 rounded-2xl shadow-none border border-neutral-200 min-h-[180px] w-full h-full">
      <div className="flex-1 min-w-0 w-full">
        <Typography variant="h2" className="text-black font-bold text-lg mb-2 sm:mb-3">Liderados avaliados</Typography>
        <div className="text-neutral-500 text-sm border-l-4 border-primary-700 pl-4 leading-tight break-words h-auto min-h-[2.5rem] flex items-center">
          {description || <span>Foram avaliados<br/><span className="font-bold text-primary-700">{total} colaboradores</span><br/>liderados por você</span>}
        </div>
      </div>
      <div className="flex items-center min-w-[90px] gap-2 sm:gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-center">
        <Users className="w-10 h-10 text-primary-700" />
        <span className="text-3xl sm:text-4xl font-bold text-primary-700 leading-none">{total}</span>
      </div>
    </CardContainer>
  );
};

export default EvaluatedSubordinates;
