import { CheckCircle, Calendar, Clock } from 'lucide-react';

import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';

import { formatDateTime } from '../../utils/globalUtils';
import type { CurrentCycle, EvaluationStatus } from '../../types/cycle';

interface EvaluationSubmittedMessageProps {
    cycle: CurrentCycle;
    evaluationStatus: EvaluationStatus;
}

const EvaluationSubmittedMessage = ({ cycle, evaluationStatus }: EvaluationSubmittedMessageProps) => {

    return (
        <div className="flex items-center justify-center min-h-[60vh] p-4 md:p-6">
            <CardContainer className="mt-20 sm:mt-0 max-w-210 mx-auto text-center border-2 border-neutral-200 w-full md:w-auto">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-check-color" />
                    </div>
                </div>

                <Typography variant="h2" className="mb-4">
                    Avaliação Enviada com Sucesso!
                </Typography>

                <Typography variant="body" color="muted" className="mb-6 leading-relaxed">
                    Sua avaliação para o ciclo{' '}
                    <span className="text-primary-700 font-semibold">
                        {cycle.name}
                    </span>{' '}
                    foi enviada e registrada com sucesso.
                </Typography>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center gap-2 p-2 bg-primary-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        <Typography variant="caption" color="muted">
                            Ciclo: {cycle.name}
                        </Typography>
                    </div>
                    {evaluationStatus.submittedAt && (
                        <div className="flex items-center justify-center gap-2 p-2 bg-primary-50 rounded-lg">
                            <Clock className="w-4 h-4 text-primary-400" />
                            <Typography variant="caption" color="muted">
                                Enviado em:{' '}
                                {formatDateTime(evaluationStatus.submittedAt)}
                            </Typography>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <CardContainer className="bg-primary-100 border border-check-color/20" noPadding>
                        <div className="p-4">
                            <Typography variant="body" className="leading-relaxed">
                                <span className="font-semibold">Status:</span>{' '}
                                Avaliação confirmada e salva no sistema.
                            </Typography>
                        </div>
                    </CardContainer>

                    <CardContainer className="bg-primary-50 border border-primary-200" noPadding>
                        <div className="p-4">
                            <Typography variant="body" color="primary" className="leading-relaxed">
                                <span className="font-semibold">
                                    Próximos passos:
                                </span>{' '}
                                Aguarde o feedback do seu mentor. Você receberá
                                uma notificação quando estiver disponível.
                            </Typography>
                        </div>
                    </CardContainer>
                </div>
            </CardContainer>
        </div>
    );
};

export default EvaluationSubmittedMessage;
