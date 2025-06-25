import React from 'react';
import { Lock, Calendar, Clock } from 'lucide-react';
import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import type { Cycle } from '../../contexts/CycleContextDefinition';

interface CycleClosedMessageProps {
    cycle: Cycle;
}

const CycleClosedMessage: React.FC<CycleClosedMessageProps> = ({ cycle }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh] p-6">
            <CardContainer className="max-w-210 mx-auto text-center border-2 border-neutral-200">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <Lock className="w-8 h-8 text-primary-500" />
                    </div>
                </div>

                <Typography variant="h2" className="mb-4">
                    Ciclo de Avaliação Fechado
                </Typography>

                <Typography
                    variant="body"
                    color="muted"
                    className="mb-6 leading-relaxed"
                >
                    O ciclo de avaliação{' '}
                    <span className="text-primary-700 font-semibold">
                        {cycle.nome}
                    </span>{' '}
                    foi encerrado e não é mais possível enviar ou modificar
                    avaliações.
                </Typography>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center gap-2 p-2 bg-primary-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        <Typography variant="caption" color="muted">
                            Período: {formatDate(cycle.dataInicio)} -{' '}
                            {formatDate(cycle.dataFim)}
                        </Typography>
                    </div>
                    <div className="flex items-center justify-center gap-2 p-2 bg-primary-50 rounded-lg">
                        <Clock className="w-4 h-4 text-primary-400" />
                        <Typography variant="caption" color="muted">
                            Status: Encerrado
                        </Typography>
                    </div>
                </div>

                <CardContainer
                    className="bg-primary-100 border border-primary-200"
                    noPadding
                >
                    <div className="p-4">
                        <Typography variant="body" className="leading-relaxed">
                            <span className="font-semibold">
                                Próximos passos:
                            </span>{' '}
                            Aguarde a abertura do próximo ciclo de avaliação.
                            Você será notificado quando estiver disponível.
                        </Typography>
                    </div>
                </CardContainer>
            </CardContainer>
        </div>
    );
};

export default CycleClosedMessage;
