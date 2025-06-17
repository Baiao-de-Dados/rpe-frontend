import { CycleBanner } from '../components/CycleBanner';

export function Dashboard() {
    return (
        <>
            <header className="p-8 pt-12 pb-12 bg-gray-100">
                <h1 className="text-4xl font-bold">Olá, Colaborador!</h1>
            </header>
            <div className="p-8">
                <CycleBanner
                    status="open"
                    cycleName="Ciclo 2025.1"
                    remainingDays={15}
                />
            </div>
            <main className="p-8 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Seção de avaliações */}
                <section className="col-span-1 md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Suas avaliações
                    </h2>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-lg font-bold">
                                    Ciclo 2025.1
                                </p>
                                <p className="text-sm text-gray-500">
                                    Em andamento
                                </p>
                            </div>
                            <span className="text-green-500 font-semibold">
                                -
                            </span>
                        </li>
                        <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-lg font-bold">
                                    Ciclo 2024.2
                                </p>
                                <p className="text-sm text-gray-500">
                                    Finalizado
                                </p>
                            </div>
                            <span className="text-green-500 font-semibold">
                                4.5 Great
                            </span>
                        </li>
                        <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-lg font-bold">
                                    Ciclo 2024.1
                                </p>
                                <p className="text-sm text-gray-500">
                                    Finalizado
                                </p>
                            </div>
                            <span className="text-green-500 font-semibold">
                                4.1 Good
                            </span>
                        </li>
                        <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-lg font-bold">
                                    Ciclo 2023.2
                                </p>
                                <p className="text-sm text-gray-500">
                                    Finalizado
                                </p>
                            </div>
                            <span className="text-yellow-500 font-semibold">
                                3.2
                            </span>
                        </li>
                    </ul>
                </section>

                {/* Gráfico de desempenho */}
                <section className="col-span-1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Desempenho</h2>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                            Filtrar por
                        </span>
                        <select className="border rounded px-2 py-1 text-sm">
                            <option value="ano">Ano</option>
                            <option value="ciclo">Ciclo</option>
                        </select>
                    </div>
                    <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                        {/* Placeholder para gráfico */}
                        <p className="text-gray-500">[Gráfico de desempenho]</p>
                    </div>
                </section>
            </main>
        </>
    );
}
