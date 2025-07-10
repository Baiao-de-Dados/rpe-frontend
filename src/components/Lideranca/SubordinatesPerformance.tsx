import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import CardContainer from '../common/CardContainer';
import Typography from '../common/Typography';

interface SubordinatesPerformanceProps {
  growth: number;
  cycleLabel: string;
  description?: string;
}

const SubordinatesPerformance: React.FC<SubordinatesPerformanceProps> = ({ growth, cycleLabel, description }) => {
  return (
    <CardContainer className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 bg-neutral-50 px-4 sm:px-8 py-6 rounded-2xl shadow-none border border-neutral-200 min-h-[180px] w-full h-full">
      <div className="flex-1 min-w-0 w-full">
        <Typography variant="h2" className="text-black font-bold text-lg mb-2 sm:mb-3">Desempenho de liderados</Typography>
        <div className="text-neutral-500 text-sm border-l-4 border-yellow-500 pl-4 leading-tight break-words h-auto min-h-[2.5rem] flex items-center">
          {description || <span>Crescimento de <span className="font-bold text-yellow-600">{growth > 0 ? `+${growth}` : `${growth}`}</span><br/>comparação ao ciclo {cycleLabel}</span>}
        </div>
      </div>
      <div className="flex items-center min-w-[90px] gap-2 sm:gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-center">
        { growth > 0 ? 
        (<>
            <ArrowUp className="w-8 h-8 text-yellow-500" strokeWidth={2.5} />
            <span className="text-3xl sm:text-4xl font-bold text-yellow-600 leading-none">+{growth}</span>
        </>)
        : growth < 0 ?
        (<>
            <ArrowDown className="w-8 h-8 text-yellow-500" strokeWidth={2.5} />
            <span className="text-3xl sm:text-4xl font-bold text-yellow-600 leading-none">{growth}</span>
        </>)
        : 
        (<span className="text-3xl sm:text-4xl font-bold text-yellow-600 leading-none">{growth}</span>)
        }
      </div>
    </CardContainer>
  );
};

export default SubordinatesPerformance;
