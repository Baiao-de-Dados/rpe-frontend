import { AlertTriangle } from 'lucide-react';
import StatusMessageCard from '../common/StatusMessageCard';

interface CycleEndedForLeadersMessageProps {
    cycleName?: string;
    className?: string;
}

function CycleEndedForLeadersMessage({ cycleName, className }: CycleEndedForLeadersMessageProps) {
    return (
        <StatusMessageCard
            icon={<AlertTriangle className="w-8 h-8 text-yellow-500" />}
            title="Ciclo de Avaliação Encerrado"
            message={
                <>
                    O ciclo de avaliação{cycleName ? ` ${cycleName}` : ''} foi encerrado. As avaliações de líderes não estão mais disponíveis.
                </>
            }
            status={
                <span className="leading-relaxed">
                    <span className="font-semibold">Status:</span> Ciclo encerrado para avaliações de líderes.
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

export default CycleEndedForLeadersMessage; 