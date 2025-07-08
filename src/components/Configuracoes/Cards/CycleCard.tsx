import { CheckCircle, Loader2, Calendar } from 'lucide-react';

import Button from '../../common/Button';
import Typography from '../../common/Typography';
import CardContainer from '../../common/CardContainer';

import { formatDate } from '../../../utils/globalUtils';

interface CycleCardProps {
    label: string;
    status?: 'finalizado' | 'aberto';
    endDate?: string;
    onStartClick?: () => void;
    showButton?: boolean;
    canStart?: boolean;
    onCancelClick?: () => void;
    onExtendClick?: () => void;
}

function CycleCard({ label, status, endDate, onStartClick, showButton, canStart, onCancelClick, onExtendClick }: CycleCardProps) {

    return (
        <CardContainer className="p-10 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <Typography variant="h1" color='primary500' className="font-bold text-center mb-4 md:mb-0 md:text-left">
                    {label}
                </Typography>
                {
                    showButton ? (
                        <div className="h-16 flex items-center">
                            <Button onClick={onStartClick} disabled={!canStart}>
                                Iniciar ciclo
                            </Button>
                        </div>
                ) : status === 'finalizado' ? (
                        <div className="h-16 flex flex-col items-center md:items-end justify-center mt-2 md:mt-0 text-gray-500">
                            <div className="flex items-center font-semibold mb-1">
                                <CheckCircle className="w-5 h-5 text-primary-400 mr-2" />
                                Finalizado
                            </div>
                            {endDate && (
                                <div className="flex items-center text-sm text-gray-400">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {formatDate(endDate)}
                                </div>
                            )}
                        </div>
                ) : status === 'aberto' ? (
                    <div className="h-16">
                        <div className="hidden md:flex items-center h-full text-gray-500 font-semibold">
                            <div className="flex gap-2 mr-4">
                                <Button variant="danger" size="sm" onClick={onCancelClick}>
                                    Cancelar
                                </Button>
                                <Button variant="secondary" size="sm" onClick={onExtendClick}>
                                    Prorrogar
                                </Button>
                            </div>
                            <Loader2 className="w-5 h-5 text-primary-400 mr-2 animate-spin" />
                            Pendente
                        </div>

                        <div className="flex flex-col items-center mt-4 text-gray-500 font-semibold md:hidden h-full justify-center">
                            <div className="flex items-center gap-2 mb-6 -mt-4">
                                <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                                Pendente
                            </div>
                            <Button variant="danger" size="sm" onClick={onCancelClick} className="w-full mb-2">
                                Cancelar
                            </Button>
                            <Button variant="secondary" size="sm" onClick={onExtendClick} className="w-full">
                                Prorrogar
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>
        </CardContainer>
    );

}

export default CycleCard;
