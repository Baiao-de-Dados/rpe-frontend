import { CheckCircle, Loader2 } from 'lucide-react';

import Button from '../../common/Button';
import Typography from '../../common/Typography';
import CardContainer from '../../common/CardContainer';

interface CycleCardProps {
    label: string;
    status?: 'finalizado' | 'aberto';
    onStartClick?: () => void;
    showButton?: boolean;
    canStart?: boolean;
    onCancelClick?: () => void;
    onExtendClick?: () => void;
}

function CycleCard({ label, status, onStartClick, showButton, canStart, onCancelClick, onExtendClick }: CycleCardProps) {

    return (
        <CardContainer className="p-10 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <Typography variant="h1" color='primary500' className="font-bold text-center mb-4 md:mb-0 md:text-left">
                    {label}
                </Typography>
                {showButton ? (
                    <Button onClick={onStartClick} disabled={!canStart}>
                        Iniciar ciclo
                    </Button>
                ) : status === 'finalizado' ? (
                    <div className="flex items-center justify-center md:justify-start mt-2 md:mt-0 text-gray-500 font-semibold">
                        <CheckCircle className="w-5 h-5 text-primary-400 mr-2" />
                        Finalizado
                    </div>
                ) : status === 'aberto' ? (
                    <>
                        <div className="hidden md:flex items-center text-gray-500 font-semibold">
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

                        <div className="flex flex-col items-center mt-4 text-gray-500 font-semibold md:hidden">
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
                    </>
                ) : null}
            </div>
        </CardContainer>
    );

}

export default CycleCard;
