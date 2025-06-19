import Typography from './Typography';
import { LuNotebookPen } from 'react-icons/lu';
import { IoIosArrowForward } from 'react-icons/io';

interface CycleBannerProps {
    status: string; // Adicionada a propriedade 'status'
    initialStatus: string;
    cycleName: string;
    remainingDays?: number;
}

export function CycleBanner({
    status,
    cycleName,
    remainingDays,
}: CycleBannerProps) {
    const daysLeft = remainingDays ?? 0;

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

    const getBannerColor = () => {
        switch (status) {
            case 'open':
                return 'bg-[#105c64]';
            case 'closed':
                return 'bg-white';
            case 'upcoming':
                return 'bg-gray-100';
            default:
                return 'bg-gray-100';
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
                return 'text-gray-600';
        }
    };

    return (
        <div
            className={`${getBannerColor()} p-4 rounded-lg shadow-lg flex items-center justify-between`}
        >
            <div className="flex items-center space-x-4">
                <span className={`text-2xl ${getIconColor()}`}>
                    <LuNotebookPen />
                </span>
                <div>{getBannerContent()}</div>
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-[#105c64] rounded-full">
                <span className="text-white text-lg">
                    <IoIosArrowForward />
                </span>
            </div>
        </div>
    );
}
