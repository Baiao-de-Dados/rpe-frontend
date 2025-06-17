interface CycleBannerProps {
    status: 'open' | 'closed' | 'upcoming';
    cycleName: string;
    remainingDays?: number;
}

export function CycleBanner({
    status,
    cycleName,
    remainingDays,
}: CycleBannerProps) {
    const getBannerContent = () => {
        switch (status) {
            case 'open':
                return (
                    <>
                        <p className="text-white font-bold">
                            {cycleName} de avaliação está aberto
                        </p>
                        <p className="text-white text-sm">
                            {remainingDays} dias restantes
                        </p>
                    </>
                );
            case 'closed':
                return (
                    <>
                        <p className="text-white font-bold">
                            {cycleName} de avaliação foi finalizado
                        </p>
                        <p className="text-white text-sm">
                            Aguarde o próximo ciclo
                        </p>
                    </>
                );
            case 'upcoming':
                return (
                    <>
                        <p className="text-white font-bold">
                            {cycleName} de avaliação está finalizando
                        </p>
                        <p className="text-white text-sm">
                            {remainingDays} dias para começar
                        </p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-teal-600 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <span className="text-white text-2xl">📄</span>
                <div>{getBannerContent()}</div>
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-teal-800 rounded-full">
                <span className="text-white text-lg"></span>
            </div>
        </div>
    );
}
