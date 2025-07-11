import { CheckCircle, Calendar, Clock } from 'lucide-react';

import StatusMessageCard from '../common/StatusMessageCard';

import { formatDateTime } from '../../utils/globalUtils';
import type { CurrentCycle, EvaluationStatus } from '../../types/cycle';

interface EvaluationSubmittedMessageProps {
    cycle: CurrentCycle;
    evaluationStatus: EvaluationStatus;
}

const EvaluationSubmittedMessage = ({ cycle, evaluationStatus }: EvaluationSubmittedMessageProps) => {
    return (
        <StatusMessageCard
            icon={<CheckCircle className="w-8 h-8 text-check-color" />}
            title="Avaliação Enviada com Sucesso!"
            message={
                <>
                    Sua avaliação para o ciclo{' '}
                    <span className="text-primary-700 font-semibold">{cycle.name}</span>{' '}
                    foi enviada e registrada com sucesso.
                </>
            }
            details={
                <>
                    <div className="flex items-center justify-center gap-2 p-2 bg-primary-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        <span className="text-muted-foreground text-xs">Ciclo: {cycle.name}</span>
                    </div>
                    {evaluationStatus.submittedAt && (
                        <div className="flex items-center justify-center gap-2 p-2 bg-primary-50 rounded-lg">
                            <Clock className="w-4 h-4 text-primary-400" />
                            <span className="text-muted-foreground text-xs">
                                Enviado em: {formatDateTime(evaluationStatus.submittedAt)}
                            </span>
                        </div>
                    )}
                </>
            }
            status={
                <span className="leading-relaxed">
                    <span className="font-semibold">Status:</span> Avaliação confirmada e salva no sistema.
                </span>
            }
            nextSteps={
                <span className="leading-relaxed text-primary">
                    <span className="font-semibold">Próximos passos:</span> Aguarde o feedback do seu mentor. Você receberá uma notificação quando estiver disponível.
                </span>
            }
        />
    );
};

export default EvaluationSubmittedMessage;
