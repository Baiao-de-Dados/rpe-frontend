import Typography from '../common/Typography';
import { LuNotebookPen } from 'react-icons/lu';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CardContainer from '../common/CardContainer';
import { useCycle } from '../../hooks/useCycle';
import { getRemainingDays } from '../../utils/globalUtils';

interface CycleBannerProps {
    linkTo?: string;
}

export function CycleBanner({ linkTo }: CycleBannerProps) {

    const navigate = useNavigate();

    const { status, currentCycle } = useCycle();

    const handleNavigate = () => {
        if (linkTo) {
            navigate('/avaliacao');
        }
    };

    const remainingDays =  getRemainingDays({ startDate: currentCycle.startDate, endDate: currentCycle.endDate })

    const getBannerContent = () => {
        switch (status) {
            case 'open':
                return (
                    <>
                        <Typography variant="h3" color="white" className="font-bold">
                            {currentCycle.name} de avaliação está aberto
                        </Typography>
                        <Typography variant="caption" color="white">
                            {remainingDays && remainingDays.daysToEnd > 0 ? (
                                <>
                                    <span className="font-bold">{remainingDays.daysToEnd} dias</span> restantes
                                </>
                            ) : 'Ciclo encerrado'}
                        </Typography>
                    </>
                );
            case 'closed':
                return (
                    <>
                        <Typography
                            variant="h3"
                            color="muted"
                            className="font-bold"
                        >
                            {currentCycle.name} de avaliação finalizado
                        </Typography>
                        <Typography variant="caption" color="muted">
                            <>
                                Resultados disponíveis{" "}
                                <span className="font-bold">em breve</span>
                            </>
                        </Typography>
                    </>
                );
            case 'upcoming':
                return (
                    <>
                        <Typography variant="h3" color="primary" className="font-bold">
                            {remainingDays && remainingDays.daysToStart > 0
                                ? `${currentCycle.name} de avaliação está prestes a começar`
                                : `${currentCycle.name} de avaliação já iniciou`}
                        </Typography>
                        <Typography variant="caption" color="primary">
                            {remainingDays && remainingDays.daysToStart > 0
                                ? `${remainingDays.daysToStart} dias para começar`
                                : 'Ciclo já iniciou'}
                        </Typography>
                    </>
                );
            case 'done':
                return (
                    <>
                        <Typography variant="h3" color="primary500" className="font-bold">
                            {currentCycle.name} de avaliação finalizado
                        </Typography>
                        <Typography variant="caption" color="primary500">
                            <>
                                Resultados{" "}
                                <span className="font-bold">disponíveis</span>
                            </>
                        </Typography>
                    </>
                );
            case 'undefined':
                return (
                    <>
                        <Typography variant="h3" color="muted" className="font-bold">
                            Nenhum ciclo de avaliação em andamento
                        </Typography>
                        <Typography variant="caption" color="muted">
                            <>
                                Aguarde o início de um novo processo, você será notificado{" "}
                                <span className="font-bold">em breve</span>
                            </>
                        </Typography>
                    </>
                );
            default:
                return null
        }
    };

    const getBannerClass = () => {
        switch (status) {
            case 'open':
                return 'bg-primary-500 hover:bg-primary-600';
            case 'closed':
                return 'bg-white hover:bg-gray-100';
            case 'upcoming':
                return 'bg-neutral-100 hover:bg-neutral-200';
            case 'done':
                return 'bg-white hover:bg-gray-100';
            default:
                return 'bg-neutral-100 hover:bg-neutral-200';
        }
    };

    const getIconColor = () => {
        switch (status) {
            case 'open':
                return 'text-white';
            case 'closed':
                return 'text-neutral-500';
            case 'upcoming':
                return 'text-primary-700';
            case 'done':
                return 'text-primary-500';
            default:
                return 'text-neutral-500';
        }
    };

    return (
        <CardContainer
            className={`${getBannerClass()} p-0 cursor-pointer transition-all hover:opacity-95 shadow`}
            noPadding
        >
            <div
                className="flex items-center justify-between p-10"
                onClick={handleNavigate}
                role="button"
                aria-label={`Ver detalhes do ${currentCycle.name}`}
            >
                <div className="flex items-center space-x-5">
                    <span className={`text-2xl ${getIconColor()}`}>
                        <LuNotebookPen />
                    </span>
                    <div>{getBannerContent()}</div>
                </div>
                <div className="flex items-center justify-center w-8 h-8  bg-opacity-20 rounded-full">
                    <span className="text-white text-lg">
                        <IoIosArrowForward />
                    </span>
                </div>
            </div>
        </CardContainer>
    );
}
