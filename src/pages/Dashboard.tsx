import { CycleBanner } from '../components/CycleBanner';
import { CycleCard } from '../components/CycleCard';
import { PerformanceChart } from '../components/PerformanceChart';
import Typography from '../components/Typography';
import Avatar from '../components/Avatar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockCycles } from '../data/mockCycles'; // Importa os ciclos mockados

export function Dashboard() {
    const { user } = useAuth(); // Obtém o usuário logado

    const calculateRemainingDays = (targetDate: string) => {
        const today = new Date();
        const target = new Date(targetDate);
        const diffTime = target.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0; // Retorna 0 se a data já passou
    };

    const remainingDays = calculateRemainingDays('2025-7-12');
    const bannerStatus = remainingDays > 0 ? 'open' : 'closed'; // Define o estado com base nos dias restantes

    const navigate = useNavigate();

    return (
        <>
            <header className="p-8 pt-12 pb-12 flex items-center justify-between">
                <Typography variant="h1" color="primary">
                    Olá, {user?.name || 'Colaborador'}
                </Typography>
                <Avatar name={user?.name || 'Colaborador'} />
            </header>
            <div className="p-8 bg-gray-100">
                <CycleBanner
                    status={bannerStatus}
                    initialStatus="open"
                    cycleName="Ciclo 2025.1"
                    remainingDays={remainingDays}
                />
            </div>
            <main className="p-8 pt-6 grid grid-cols-1 md:grid-cols-10 gap-6 mb-4">
                <section className="col-span-1 md:col-span-3 bg-white p-6 rounded-lg shadow-md mb-4 relative">
                    <div className="flex items-center justify-between mb-3">
                        <Typography variant="h2" color="primary">
                            Suas avaliações
                        </Typography>
                        <button
                            onClick={() => navigate('/evolucao')}
                            className="px-4 py-2 text-green-500 rounded-lg hover:text-green-600"
                        >
                            <Typography
                                variant="body"
                                color="primary"
                                className="font-bold cursor-pointer hover:text-green-600"
                            >
                                Ver mais
                            </Typography>
                        </button>
                    </div>
                    <div className="space-y-4 overflow-y-auto max-h-150">
                        {mockCycles
                            .slice()
                            .sort((a, b) =>
                                b.cycleName.localeCompare(a.cycleName),
                            ) // Ordena em ordem decrescente
                            .map(cycle => (
                                <CycleCard
                                    key={cycle.cycleName}
                                    score={cycle.score}
                                    status={
                                        cycle.status as
                                            | 'Finalizado'
                                            | 'Em andamento'
                                            | 'Pendente'
                                    }
                                    cycleName={cycle.cycleName}
                                    summary={
                                        cycle.status === 'Em andamento'
                                            ? 'Este ciclo está em andamento. Aguarde a finalização para ver sua nota.'
                                            : 'Resumo do desempenho neste ciclo.'
                                    }
                                />
                            ))}
                    </div>
                </section>

                <section className="col-span-1 md:col-span-7 bg-white p-6 rounded-lg shadow-md mb-4">
                    <Typography variant="h2" color="primary" className="mb-3">
                        Desempenho
                    </Typography>
                    <PerformanceChart cycles={mockCycles} />
                </section>
            </main>
        </>
    );
}
