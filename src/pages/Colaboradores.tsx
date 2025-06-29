import React, { useState } from 'react';
import CollaboratorEvaluationCard, {
    type EvaluationField,
} from '../components/common/CollaboratorEvaluationCard';
import Typography from '../components/common/Typography';
import Searchbar from '../components/common/Searchbar';
import { mockCollaborators } from '../data/mockCollaborators';
import { Filter } from 'lucide-react';
import type { BadgeVariant } from '../components/common/Badge';

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
        autoavaliacao: 8.5,
        avaliacao360: 8.2,
        notaGestor: 8.8,
        notaFinal: 8.5,
        status: 'Finalizado',
        statusVariant: 'success',
    },
    'colab-002': {
        autoavaliacao: 7.9,
        avaliacao360: 7.5,
        notaGestor: 8.0,
        notaFinal: 7.8,
        status: 'Em andamento',
        statusVariant: 'warning',
    },
    'colab-003': {
        autoavaliacao: 9.0,
        avaliacao360: 8.7,
        notaGestor: 9.2,
        notaFinal: 9.0,
        status: 'Finalizado',
        statusVariant: 'success',
    },
    'colab-004': {
        autoavaliacao: 6.5,
        avaliacao360: 6.8,
        notaGestor: 7.0,
        notaFinal: 6.8,
        status: 'Pendente',
        statusVariant: 'default',
    },
    'colab-005': {
        autoavaliacao: 8.0,
        avaliacao360: 8.1,
        notaGestor: 8.3,
        notaFinal: 8.1,
        status: 'Finalizado',
        statusVariant: 'success',
    },
};

export function Colaboradores() {
    const [search, setSearch] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    // Detecta mobile via window.innerWidth
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const filtered = search
        ? mockCollaborators.filter(
              c =>
                  c.nome.toLowerCase().includes(search.toLowerCase()) ||
                  c.cargo.toLowerCase().includes(search.toLowerCase()),
          )
        : mockCollaborators;

    return (
        <div className="min-h-screen bg-[#f6f6f6]">
            {/* Header branco fixo */}
            <header className="bg-white border-b border-[#e5e5e5] px-2 sm:px-4 md:px-8 py-4 sm:py-6">
                <Typography
                    variant="h2"
                    className="text-lg sm:text-xl font-bold"
                >
                    Colaboradores
                </Typography>
            </header>
            {/* Conteúdo principal */}
            <main className="w-full max-w-[1600px] mx-auto px-2 sm:px-4 md:px-6 pt-4 sm:pt-6">
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
                        className="bg-[#167174] hover:bg-[#125c5e] transition-colors rounded-xl p-3 flex items-center justify-center w-[48px] min-w-[48px] max-w-[60px] sm:w-auto sm:min-w-0 sm:max-w-none"
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
                                    label: 'Nota gestor',
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
                                className="shadow-none border border-[#f0f0f0] px-2 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full"
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
