import { Clock } from 'lucide-react';
import StatusMessageCard from '../common/StatusMessageCard';

interface CycleInProgressMessageProps {
    cycleName?: string;
    className?: string;
}

function CycleInProgressMessage({ cycleName, className }: CycleInProgressMessageProps) {
    return (
        <StatusMessageCard
            icon={<Clock className="w-8 h-8 text-primary-500" />}
            title="Ciclo de Avaliação em Andamento"
            message={
                <>
                    O ciclo de avaliação{cycleName ? ` ${cycleName}` : ''} ainda está aberto para autoavaliações dos colaboradores.
                </>
            }
            status={
                <span className="leading-relaxed">
                    <span className="font-semibold">Status:</span> Ciclo ativo para autoavaliações.
                </span>
            }
            nextSteps={
                <span className="leading-relaxed text-primary">
                    <span className="font-semibold">Próximos passos:</span> Aguarde o encerramento do ciclo para realizar suas avaliações.
                </span>
            }
            className={className}
        />
    );
}

export default CycleInProgressMessage; 