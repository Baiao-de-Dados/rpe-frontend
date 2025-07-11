import { Lock } from 'lucide-react';
import StatusMessageCard from '../common/StatusMessageCard';

interface CycleClosedEvaluationMessageProps {
    cycleName?: string;
    className?: string;
}

function CycleClosedEvaluationMessage({ cycleName, className }: CycleClosedEvaluationMessageProps) {
    return (
        <StatusMessageCard
            icon={<Lock className="w-8 h-8 text-primary-500" />}
            title="Ciclo fechado"
            message={
                <>
                    O ciclo de avaliação{cycleName ? ` ${cycleName}` : ''} está fechado. Não é possível realizar avaliações.
                </>
            }
            status={
                <span className="leading-relaxed">
                    <span className="font-semibold">Status:</span> Ciclo encerrado para avaliações.
                </span>
            }
            nextSteps={
                <span className="leading-relaxed text-primary">
                    <span className="font-semibold">Próximos passos:</span> Aguarde a abertura de um novo ciclo para realizar avaliações.
                </span>
            }
            className={className}
        />
    );
}

export default CycleClosedEvaluationMessage;
