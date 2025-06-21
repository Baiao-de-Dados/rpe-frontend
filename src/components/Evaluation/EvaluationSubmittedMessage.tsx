import React from 'react';
import { CheckCircle, Calendar, Clock } from 'lucide-react';
import Typography from '../Typography';
import CardContainer from '../CardContainer';
import type {
    Cycle,
    EvaluationStatus,
} from '../../contexts/CycleContextDefinition';

interface EvaluationSubmittedMessageProps {
    cycle: Cycle;
    evaluationStatus: EvaluationStatus;
}

const EvaluationSubmittedMessage: React.FC<EvaluationSubmittedMessageProps> = ({
    cycle,
    evaluationStatus,
}) => {
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh] p-6">
            <CardContainer className="max-w-180 mx-auto text-center border-2 border-neutral-200">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-check-color" />
                    </div>
                </div>

                <Typography variant="h2" className="mb-4">
                    Avaliação Enviada com Sucesso!
                </Typography>

                <Typography
                    variant="body"
                    color="muted"
                    className="mb-6 leading-relaxed"
                >
                    Sua avaliação para o ciclo{' '}
                    <span className="text-primary-700 font-semibold">
                        {cycle.nome}
                    </span>{' '}
                    foi enviada e registrada com sucesso.
                </Typography>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center gap-2 p-2 bg-primary-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        <Typography variant="caption" color="muted">
                            Ciclo: {cycle.nome}
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
                    <CardContainer
                        className="bg-primary-100 border border-check-color/20"
                        noPadding
                    >
                        <div className="p-4">
                            <Typography
                                variant="body"
                                className="leading-relaxed"
                            >
                                <span className="font-semibold">Status:</span>{' '}
                                Avaliação confirmada e salva no sistema.
                            </Typography>
                        </div>
                    </CardContainer>

                    <CardContainer
                        className="bg-primary-50 border border-primary-200"
                        noPadding
                    >
                        <div className="p-4">
                            <Typography
                                variant="body"
                                color="primary"
                                className="leading-relaxed"
                            >
                                <span className="font-semibold">
                                    Próximos passos:
                                </span>{' '}
                                Aguarde o feedback do seu gestor. Você receberá
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
