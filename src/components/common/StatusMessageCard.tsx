import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';

interface StatusMessageCardProps {
    icon: React.ReactNode;
    title: string;
    message: React.ReactNode;
    details?: React.ReactNode;
    status?: React.ReactNode;
    nextSteps?: React.ReactNode;
    className?: string;
}

function StatusMessageCard({
    icon,
    title,
    message,
    details,
    status,
    nextSteps,
    className = '',
}: StatusMessageCardProps) {
    return (
        <div className={`flex items-center justify-center min-h-[60vh] p-4 md:p-6 ${className}`}>
            <CardContainer className="mt-20 sm:mt-0 max-w-210 mx-auto text-center border-2 border-neutral-200 w-full md:w-auto">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        {icon}
                    </div>
                </div>
                <Typography variant="h2" className="mb-4">
                    {title}
                </Typography>
                <Typography variant="body" color="muted" className="mb-6 leading-relaxed">
                    {message}
                </Typography>
                {details && <div className="space-y-3 mb-6">{details}</div>}
                <div className="space-y-4">
                    {status && (
                        <CardContainer className="bg-primary-100 border border-check-color/20" noPadding>
                            <div className="p-4">{status}</div>
                        </CardContainer>
                    )}
                    {nextSteps && (
                        <CardContainer className="bg-primary-50 border border-primary-200" noPadding>
                            <div className="p-4">{nextSteps}</div>
                        </CardContainer>
                    )}
                </div>
            </CardContainer>
        </div>
    );
}

export default StatusMessageCard;
