import Typography from '../common/Typography';
import Avatar from '../common/Avatar';

interface DashboardHeaderProps {
    userName?: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-50 bg-white flex flex-col justify-start shadow-sm">
            <div className="px-4 lg:px-14 pt-8 pb-6 flex items-center justify-between max-lg:pt-20 max-lg:pb-4 ">
                <div className="flex items-center">
                    <Typography
                        variant="h1"
                        color="primary500"
                        className="font-bold mr-2 text-2xl md:text-4xl"
                    >
                        Olá,
                    </Typography>
                    <Typography
                        variant="h1"
                        color="secondary"
                        className="font-normal text-2xl md:text-4xl"
                    >
                        {userName || 'Usuário'}
                    </Typography>
                </div>
                <Avatar name={userName || 'U'} />
            </div>
        </header>
    );
}
