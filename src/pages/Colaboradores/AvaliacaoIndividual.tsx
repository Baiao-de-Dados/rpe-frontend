import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRoleEnum } from '../../types/auth';
import { ManagerAvaliacao } from './ManagerAvaliacao';
import { LeaderAvaliacao } from './LeaderAvaliacao';
import { CommitteeAvaliacao } from './CommitteeAvaliacao';

export function AvaliacaoIndividual() {
    const { hasRole } = useAuth();
    const { collaboratorId } = useParams<{ collaboratorId: string }>();

    // Manager - Formulário de avaliação de gestor
    if (hasRole(UserRoleEnum.MANAGER)) {
        return <ManagerAvaliacao collaboratorId={Number(collaboratorId)} />;

    }

    // Leader - Formulário de avaliação de líder
    if (hasRole(UserRoleEnum.LEADER)) {
        return <LeaderAvaliacao collaboratorId={Number(collaboratorId)} />;

    }

    // Committee/RH - Visualização e equalização
    if (hasRole(UserRoleEnum.COMMITTEE) || hasRole(UserRoleEnum.RH)) {
        return <CommitteeAvaliacao collaboratorId={Number(collaboratorId)} />;
    }

    // Default - não deveria chegar aqui
    return (
        <div className="p-8">
            <h1>Acesso não autorizado</h1>
            <p>Você não tem permissão para acessar esta página.</p>
        </div>
    );
}
