import Button from '../Button';
import Typography from '../Typography';
import NotificationBadge from '../NotificationBadge';

interface EvaluationHeaderProps {
    activeSection: string;
    isFormComplete: boolean;
    onNavClick: (section: string) => void;
    getNotification: (
        id: string,
    ) => { active: boolean; count?: number } | undefined;
}

const sections = ['Autoavaliação', 'Avaliação 360', 'Mentoring', 'Referências'];

const sectionNotificationMap: Record<string, string> = {
    Autoavaliação: 'autoavaliacao',
    'Avaliação 360': 'avaliacao360',
    Mentoring: 'mentoring',
    Referências: 'referencias',
};

export function EvaluationHeader({
    activeSection,
    isFormComplete,
    onNavClick,
    getNotification,
}: EvaluationHeaderProps) {
    return (
        <header className="sticky top-0 z-50 pt-12 pb-0 bg-white flex flex-col justify-between shadow-sm">
            <div className="p-8 flex items-center justify-between">
                <Typography variant="h1" className="text-4xl font-bold">
                    Ciclo 2025.1
                </Typography>
                <div className="flex gap-4 items-center">
                    <Button
                        variant="primary"
                        size="md"
                        disabled={!isFormComplete}
                        className={`transition-all duration-200 ${
                            !isFormComplete
                                ? 'bg-primary-200 text-primary-400 cursor-not-allowed hover:bg-primary-200'
                                : 'bg-primary-500 text-white hover:bg-primary-600'
                        }`}
                    >
                        Concluir e enviar
                    </Button>
                </div>
            </div>
            <nav className="flex space-x-20 mt-2 border-t-3 pt-5 pl-14 bg border-gray-50">
                {sections.map(section => {
                    const notificationId = sectionNotificationMap[section];
                    const notification = getNotification(notificationId);

                    return (
                        <div
                            key={section}
                            className="relative min-w-38 text-center"
                        >
                            <Typography
                                variant="body"
                                className={`cursor-pointer pb-4 pl-5 pr-5 text-primary-600 font-normal relative ${
                                    activeSection === section
                                        ? 'border-b-4 border-primary-500 font-semibold text-primary-500'
                                        : ''
                                }`}
                                onClick={() => onNavClick(section)}
                            >
                                <span className="invisible font-semibold absolute inset-0">
                                    {section}
                                </span>
                                {section}
                            </Typography>
                            <NotificationBadge
                                show={notification?.active || false}
                                count={notification?.count}
                                variant="medium"
                                position="top-right"
                            />
                        </div>
                    );
                })}
            </nav>
        </header>
    );
}
