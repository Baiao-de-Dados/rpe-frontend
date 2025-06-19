import { CycleBanner } from '../components/CycleBanner';
import { CycleCard } from '../components/CycleCard';
import { PerformanceChart } from '../components/PerformanceChart';
import Typography from '../components/Typography';
import Avatar from '../components/Avatar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importa o contexto de autenticação

export function Dashboard() {
    const { user } = useAuth(); // Obtém o usuário logado
    const cycles = [
        { cycleName: 'Ciclo 2025.1', score: 0 },
        { cycleName: 'Ciclo 2024.2', score: 4.5 },
        { cycleName: 'Ciclo 2024.1', score: 4.1 },
        { cycleName: 'Ciclo 2023.2', score: 3.3 },
        { cycleName: 'Ciclo 2023.1', score: 4.8 },
        { cycleName: 'Ciclo 2022.2', score: 3.9 },
        { cycleName: 'Ciclo 2022.1', score: 4.0 },
    ];

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
            <header className="p-8 pt-12 pb-12 bg-gray-100 flex items-center justify-between">
                <Typography variant="h1" color="primary">
                    Olá, {user?.name || 'Colaborador'}
                </Typography>{' '}
                {/* Exibe o nome do usuário logado */}
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
            <main className="p-8 pt-6 grid grid-cols-1 md:grid-cols-10 gap-6 bg-gray-100 mb-4">
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
                        {cycles.map(cycle => (
                            <CycleCard
                                key={cycle.cycleName}
                                score={cycle.score}
                                status={
                                    cycle.score === 0
                                        ? 'Em andamento'
                                        : 'Finalizado'
                                }
                                cycleName={cycle.cycleName}
                                summary={
                                    cycle.score === 0
                                        ? 'Este ciclo está em andamento. Aguarde a finalização para ver sua nota.'
                                        : 'Resumo do desempenho neste ciclo.'
                                }
                            />
                        ))}
                    </div>
                </section>

                {/* Gráfico de desempenho */}
                <section className="col-span-1 md:col-span-7 bg-white p-6 rounded-lg shadow-md mb-4">
                    <Typography variant="h2" color="primary" className="mb-3">
                        Desempenho
                    </Typography>
                    <PerformanceChart cycles={cycles} />
                </section>
            </main>
        </>
    );
}
