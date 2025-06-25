import Typography from '../common/Typography';
import { LuNotebookPen } from 'react-icons/lu';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CardContainer from '../common/CardContainer';

interface CycleBannerProps {
    status: string;
    cycleName: string;
    remainingDays?: number;
    linkTo?: string;
}

export function CycleBanner({
    status,
    cycleName,
    remainingDays,
    linkTo = '/avaliacao',
}: CycleBannerProps) {
    const navigate = useNavigate();
    const daysLeft = remainingDays ?? 0;

    const handleNavigate = () => {
        if (linkTo) {
            navigate(linkTo);
        }
    };

    const getBannerContent = () => {
        switch (status) {
            case 'open':
                return (
                    <>
                        <Typography
                            variant="h3"
                            color="white"
                            className="font-bold"
                        >
                            {cycleName} de avaliação está aberto
                        </Typography>
                        <Typography variant="caption" color="white">
                            {daysLeft > 0
                                ? `${daysLeft} dias restantes`
                                : 'Ciclo encerrado'}
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
                            {cycleName} de avaliação foi finalizado
                        </Typography>
                        <Typography variant="caption" color="muted">
                            Aguarde o próximo ciclo
                        </Typography>
                    </>
                );
            case 'upcoming':
                return (
                    <>
                        <Typography
                            variant="h3"
                            color="primary"
                            className="font-bold"
                        >
                            {cycleName} de avaliação está finalizando
                        </Typography>
                        <Typography variant="caption" color="primary">
                            {daysLeft > 0
                                ? `${daysLeft} dias para começar`
                                : 'Ciclo iniciado'}
                        </Typography>
                    </>
                );
            default:
                return null;
        }
    };

    // Determinando classes específicas baseadas no status
    const getBannerClass = () => {
        switch (status) {
            case 'open':
                return 'bg-primary-500 hover:bg-primary-600';
            case 'closed':
                return 'bg-white hover:bg-gray-100';
            case 'upcoming':
                return 'bg-neutral-100 hover:bg-neutral-200';
            default:
                return 'bg-neutral-100 hover:bg-neutral-200';
        }
    };

    const getIconColor = () => {
        switch (status) {
            case 'open':
                return 'text-white';
            case 'closed':
                return 'text-primary-400';
            case 'upcoming':
                return 'text-primary-700';
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
                aria-label={`Ver detalhes do ${cycleName}`}
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
