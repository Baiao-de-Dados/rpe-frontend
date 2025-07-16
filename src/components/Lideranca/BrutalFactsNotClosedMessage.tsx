import { Lock } from 'lucide-react';

import type { Cycle } from '../../types/cycle';

import StatusMessageCard from '../common/StatusMessageCard';

interface BrutalFactsNotClosedMessageProps {
    cycle: Cycle;
}

export const BrutalFactsNotClosedMessage = ({ cycle }: BrutalFactsNotClosedMessageProps) => {
    return (
        <StatusMessageCard
            icon={<Lock className="w-8 h-8 text-primary-500" />}
            title="Equalização ainda não finalizada"
            message={
                <>
                    O processo de equalização do ciclo{' '}
                    <span className="text-primary-700 font-semibold">{cycle.name}</span>{' '}
                    ainda não foi finalizado.
                </>
            }
            status={
                <span className="leading-relaxed">
                    <span className="font-semibold">Status:</span> Equalização não finalizada.
                </span>
            }
            nextSteps={
                <span className="leading-relaxed text-primary">
                    <span className="font-semibold">Próximos passos:</span> Aguarde o término do período de equalizações.
                </span>
            }
        />
    );
};

