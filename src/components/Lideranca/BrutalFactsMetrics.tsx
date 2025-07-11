import BrutalFactsRate from './BrutalFactsRate';
import SubordinatesPerformance from './SubordinatesPerformance';
import EvaluatedSubordinates from './EvaluatedSubordinates';

interface BrutalFactMetricsProps {
  score: number;
  cycleLabel: string;
  growth: number;
  growthCycleLabel: string;
  total: number;
  avaliadosDescription?: string;
  rateDescription?: string;
  performanceDescription?: string;
}

export default function BrutalFactMetrics({
  score,
  cycleLabel,
  growth,
  growthCycleLabel,
  total,
  avaliadosDescription,
  rateDescription,
  performanceDescription,
}: BrutalFactMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <BrutalFactsRate score={score} cycleLabel={cycleLabel} description={rateDescription} />
      <SubordinatesPerformance growth={growth} cycleLabel={growthCycleLabel} description={performanceDescription} />
      <EvaluatedSubordinates total={total} description={avaliadosDescription} />
    </div>
  );
}