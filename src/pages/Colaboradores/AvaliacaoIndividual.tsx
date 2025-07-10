import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRoleEnum } from '../../types/auth';
import { ManagerAvaliacao } from './ManagerAvaliacao';
import { LeaderAvaliacao } from './LeaderAvaliacao';

// Componente para Committee/RH (view-only das avaliações)
export function CommitteeAvaliacao() {
    // TODO: Implementar visualização read-only para Committee/RH
    return (
        <div className="p-8">
            <h1>Visualização de Avaliações - Committee/RH</h1>
            <p>Em desenvolvimento: visualização read-only das avaliações</p>
        </div>
    );
}

export function AvaliacaoIndividual() {
    const { hasRole } = useAuth();
    const { collaboratorId } = useParams<{ collaboratorId: string }>();

    // Manager - Formulário de avaliação de gestor
    if (hasRole(UserRoleEnum.MANAGER)) {
        return <ManagerAvaliacao collaboratorId={collaboratorId || ''} />;
    }

    // Leader - Formulário de avaliação de líder
    if (hasRole(UserRoleEnum.LEADER)) {
        return <LeaderAvaliacao collaboratorId={collaboratorId || ''} />;
    }

    // Committee/RH - Visualização read-only
    if (hasRole(UserRoleEnum.COMMITTEE) || hasRole(UserRoleEnum.RH)) {
        return <CommitteeAvaliacao />;
    }

    // Default - não deveria chegar aqui
    return (
        <div className="p-8">
            <h1>Acesso não autorizado</h1>
            <p>Você não tem permissão para acessar esta página.</p>
        </div>
    );
}
