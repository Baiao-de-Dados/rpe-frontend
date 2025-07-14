import { CheckCircle, Loader2, Calendar } from 'lucide-react';

import Button from '../../common/Button';
import Typography from '../../common/Typography';
import CardContainer from '../../common/CardContainer';

import type { CurrentCycle } from '../../../types/cycle';

import { formatDate } from '../../../utils/globalUtils';
import { getBrazilDateString } from '../../../utils/globalUtils';

interface CycleCardProps {
    label: string;
    status?: 'fechado' | 'aberto';
    cycle: CurrentCycle
    onStartClick?: () => void;
    showButton?: boolean;
    canStart?: boolean;
    onCancelClick?: () => void;
    onExtendClick?: () => void;
}

function CycleCard({ label, status, cycle, onStartClick, showButton, canStart, onCancelClick, onExtendClick }: CycleCardProps) {
    return (
        <CardContainer className="p-10 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <Typography variant="h1" color='primary500' className="font-bold text-center mb-4 md:mb-0 md:text-left">
                    {label}
                </Typography>
                {
                    showButton && !cycle.endDate ? (
                        <div className="h-16 flex items-center">
                            <Button onClick={onStartClick} disabled={!canStart}>
                                Iniciar ciclo
                            </Button>
                        </div>
                ) : status === 'fechado' && cycle.done ? (
                        <div className="h-16 flex flex-col items-center md:items-end justify-center mt-2 md:mt-0 text-gray-500">
                            <div className="flex items-center font-semibold mb-1">
                                <CheckCircle className="w-5 h-5 text-primary-400 mr-2" />
                                Finalizado
                            </div>
                            {cycle.updatedAt && (
                                <div className="flex items-center text-sm text-gray-400">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {formatDate(cycle.updatedAt)}
                                </div>
                            )}
                        </div>
                ) : status === 'fechado' && !cycle.done && (cycle.startDate && (new Date(cycle.startDate) <= new Date(getBrazilDateString())))  ? (
                        <div className="h-16 flex flex-col items-center md:items-end justify-center mt-2 md:mt-0 text-gray-500">
                            <div className="flex items-center font-semibold mb-1">
                                <Loader2 className="w-5 h-5 text-primary-400 mr-2 animate-spin" />
                                Aguardando equalização
                            </div>
                        </div>
                ) : status === 'fechado' && !cycle.done && (cycle.startDate && (new Date(cycle.startDate) > new Date(getBrazilDateString())))  ? (
                        <div className="h-16 flex flex-col items-center md:items-end justify-center mt-2 md:mt-0 text-gray-500">
                            {cycle.startDate && (
                                <div className="flex items-center font-semibold mb-1 text-sm text-gray-400">
                                    <Button variant="danger" size="sm" onClick={onCancelClick}>
                                        Cancelar
                                    </Button>
                                    <Calendar className="ml-5 w-4 h-4 mr-1" />
                                    Inicia em {formatDate(cycle.startDate)}
                                </div>
                            )}
                        </div>
                ) : status === 'aberto' ? (
                    <div className="h-16">
                        <div className="hidden md:flex items-center h-full text-gray-500 font-semibold w-full justify-between">
                            <div className="flex gap-2 mr-6">
                                <Button variant="danger" size="sm" onClick={onCancelClick}>
                                    Cancelar
                                </Button>
                                <Button variant="secondary" size="sm" onClick={onExtendClick}>
                                    Prorrogar
                                </Button>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center mb-1">
                                    <Loader2 className="w-5 h-5 text-primary-400 mr-2 animate-spin" />
                                    Em andamento
                                </div>
                                {cycle.endDate && (
                                    <div className="flex items-center text-sm text-gray-400">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Fecha em{' '}
                                        {formatDate(cycle.endDate)}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-center mt-4 text-gray-500 font-semibold md:hidden h-full justify-center">
                            <div className="flex items-center gap-2 -mt-4 mb-4">
                                <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                                Em andamento
                                {cycle.endDate && (
                                    <div className="flex items-center text-sm text-gray-400">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {formatDate(cycle.endDate)}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2 w-full mb-2">
                                <Button variant="danger" size="sm" onClick={onCancelClick} className="w-full">
                                    Cancelar
                                </Button>
                                <Button variant="secondary" size="sm" onClick={onExtendClick} className="w-full">
                                    Prorrogar
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </CardContainer>
    );

}

export default CycleCard;
