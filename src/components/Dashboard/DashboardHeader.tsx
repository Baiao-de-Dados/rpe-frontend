import Avatar from '../common/Avatar';
import PageHeader from '../common/PageHeader';

interface DashboardHeaderProps {
    userName?: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
    return (
        <PageHeader
            title={`Olá, ${userName || 'Usuário'}`}
            button={<Avatar name={userName || 'U'} />}
        />
    );
}
