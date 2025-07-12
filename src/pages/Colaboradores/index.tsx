import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CollaboratorEvaluationCard, {
    type EvaluationField,
} from '../../components/common/CollaboratorEvaluationCard';
import PageHeader from '../../components/common/PageHeader';
import Searchbar from '../../components/common/Searchbar';
import { mockCollaborators } from '../../data/mockCollaborators';
import { useAuth } from '../../hooks/useAuth';
import { UserRoleEnum } from '../../types/auth';
import { Filter } from 'lucide-react';

type BadgeVariant = 'default' | 'success' | 'warning';

const mockEvaluations: Record<
    string,
    {
        autoavaliacao?: number;
        avaliacao360?: number;
        notaGestor?: number;
        notaFinal?: number;
        status: string;
        statusVariant: BadgeVariant;
    }
> = {
    'colab-001': {
        autoavaliacao: 4.3,
        avaliacao360: 4.1,
        notaGestor: 4.4,
        notaFinal: 4.3,
        status: 'Finalizado',
        statusVariant: 'success',
    },
    'colab-002': {
        autoavaliacao: 3.9,
        status: 'Pendente',
        statusVariant: 'warning',
    },
    'colab-003': {
        autoavaliacao: 4.5,
        avaliacao360: 4.3,
        notaGestor: 4.6,
        notaFinal: 4.5,
        status: 'Finalizado',
        statusVariant: 'success',
    },
    'colab-004': {
        autoavaliacao: 3.2,
        avaliacao360: 3.4,
        status: 'Pendente',
        statusVariant: 'warning',
    },
    'colab-005': {
        autoavaliacao: 4.0,
        avaliacao360: 4.0,
        notaGestor: 4.1,
        notaFinal: 4.0,
        status: 'Finalizado',
        statusVariant: 'success',
    },
};

export function Colaboradores() {
    const [search, setSearch] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const { hasRole } = useAuth();

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Filtrar colaboradores baseado no role
    const getFilteredCollaboratorsByRole = () => {
        // RH e COMMITTEE veem todos os colaboradores
        if (hasRole(UserRoleEnum.RH) || hasRole(UserRoleEnum.COMMITTEE) || hasRole(UserRoleEnum.ADMIN) || hasRole(UserRoleEnum.DEVELOPER)) {
            return mockCollaborators;
        }
        
        // MANAGER vê apenas colaboradores que ele gere (mock: todos por enquanto)
        if (hasRole(UserRoleEnum.MANAGER)) {
            return mockCollaborators; // TODO: Filtrar apenas colaboradores gerenciados
        }
        
        // LEADER vê apenas colaboradores que ele lidera (mock: todos por enquanto)
        if (hasRole(UserRoleEnum.LEADER)) {
            return mockCollaborators; // TODO: Filtrar apenas colaboradores liderados
        }
        
        // Default: nenhum colaborador
        return [];
    };

    const collaboratorsByRole = getFilteredCollaboratorsByRole();

    const filtered = search
        ? collaboratorsByRole.filter(
              c =>
                  c.nome.toLowerCase().includes(search.toLowerCase()) ||
                  c.cargo.toLowerCase().includes(search.toLowerCase()),
          )
        : collaboratorsByRole;

    // Definir rota de navegação - TODOS usam a mesma rota
    const getNavigationRoute = (collaboratorId: number) => {
        return `/colaboradores/${collaboratorId}/avaliacao`;
    };

    return (
        <>
            <PageHeader title="Colaboradores" />
            {/* Conteúdo principal */}
            <main className="p-8 pt-6">
                <div className="flex flex-row items-stretch gap-2 sm:gap-4 mb-4">
                    <div className="flex-1">
                        <Searchbar
                            value={search}
                            onChange={setSearch}
                            placeholder="Buscar por colaboradores"
                            className="w-full"
                        />
                    </div>
                    <button
                        className="bg-[#167174] cursor-pointer hover:bg-[#125c5e] transition-colors rounded-xl p-3 flex items-center justify-center w-[48px] min-w-[48px] max-w-[60px] sm:w-auto sm:min-w-0 sm:max-w-none"
                        aria-label="Filtrar"
                    >
                        <Filter className="text-white w-6 h-6" />
                    </button>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4">
                    {filtered.map(colab => {
                        const evalData = mockEvaluations[colab.id] || {};
                        let evaluationFields: EvaluationField[];
                        if (isMobile) {
                            evaluationFields = [
                                {
                                    label: 'Nota final',
                                    value: evalData.notaFinal,
                                    bold: true,
                                },
                            ];
                        } else {
                            evaluationFields = [
                                {
                                    label: 'Autoavaliação',
                                    value: evalData.autoavaliacao,
                                },
                                {
                                    label: 'Avaliação 360',
                                    value: evalData.avaliacao360,
                                },
                                {
                                    label: 'Nota manager',
                                    value: evalData.notaGestor,
                                },
                                {
                                    label: 'Nota final',
                                    value: evalData.notaFinal,
                                    bold: true,
                                },
                            ];
                        }
                        return (
                            <CollaboratorEvaluationCard
                                key={colab.id}
                                collaborator={{
                                    nome: colab.nome,
                                    cargo: colab.cargo,
                                    image: colab.image || colab.avatar,
                                    status: evalData.status || 'Pendente',
                                    statusVariant:
                                        evalData.statusVariant || 'default',
                                }}
                                evaluationFields={evaluationFields}
                                onClick={() => navigate(getNavigationRoute(colab.id))}
                                className="shadow-none border border-[#f0f0f0] px-2 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full cursor-pointer hover:shadow-md transition-shadow"
                            />
                        );
                    })}
                </div>
            </main>
        </>
    );
}

export { Colaboradores as default };
