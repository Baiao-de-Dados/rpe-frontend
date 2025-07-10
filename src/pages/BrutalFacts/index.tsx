import BrutalFactsMetrics from '../../components/Lideranca/BrutalFactsMetrics';
import CardContainer from '../../components/common/CardContainer';
import SummaryBox from '../../components/common/SummaryBox';
import Typography from '../../components/common/Typography';
import CollaboratorEvaluationCard from '../../components/common/CollaboratorEvaluationCard';
import PageHeader from '../../components/common/PageHeader';
import { PerformanceChart } from '../../components/Charts/PerformanceChart';
import { mockCycles } from '../../data/mockCycles';
import { mockCommitteeData } from '../../data/mockCommitteeData';
import SearchBar from '../../components/common/Searchbar';
import { useState } from 'react';

const chartData: { cycleName: string; score: number }[] = mockCycles.map(cycle => ({
    cycleName: cycle.cycleName,
    score: cycle.score
}));

export default function BrutalFactsPage() {
    const [search, setSearch] = useState('');

    const searchFunction = (query: string) => {
        if (!query.trim()) return mockCommitteeData.collaborators;
        return mockCommitteeData.collaborators.filter(collab =>
            collab.name.toLowerCase().includes(query.toLowerCase()) ||
            collab.department.toLowerCase().includes(query.toLowerCase())
        );
    };

    const filteredCollaborators = searchFunction(search);

    return (
        <div>
            <PageHeader
                title='Brutal Facts'
            />

            <div className='flex flex-col gap-6 p-6'>
                <BrutalFactsMetrics
                    score={4.5}
                    cycleLabel="2024.2"
                    growth={+0.3}
                    growthCycleLabel="2024.1"
                    total={150}
                />
                <CardContainer className='flex flex-col gap-6'>
                    <Typography variant='h2' className='text-black font-bold text-2xl'>Resumo</Typography>
                    <SummaryBox summary={mockCycles[0].summary} title='Insights'  />
                </CardContainer>
                <CardContainer className='flex flex-col gap-6 p-6'>
                    <Typography variant='h2' className='text-black font-bold text-2xl'>Desempenho</Typography>
                    <PerformanceChart cycles={chartData} />
                    <SummaryBox summary={mockCycles[0].summary} title='Insights' />
                </CardContainer>
                <CardContainer className="flex flex-col gap-6">
                    <div className='flex flex-row justify-between items-center'>
                        <Typography variant='h2' className='text-black font-bold text-2xl'>Resumo de equalizações</Typography>
                        <div className='flex flex-col items-center justify-center p-0.5 bg-gray-200 rounded-xl'>
                            <SearchBar
                                placeholder='Buscar colaboradores...'
                                className=''
                                value={search}
                                onChange={setSearch}
                                searchFunction={searchFunction}
                                getItemKey={item => String(item.id)}
                                renderItem={item =>
                                    item && (
                                        <div>
                                            <span className="font-semibold">{item.name}</span>{" "}
                                            <span className="text-xs text-gray-500">{item.department}</span>
                                        </div>
                                    )
                                    }
                                onItemSelect={item => setSearch(item.name)}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        {filteredCollaborators.map((collab) => {
                            const evalData = {
                                autoavaliacao: 4.0,
                                avaliacao360: 4.0,
                                notaGestor: 4.0,
                                notaFinal: collab.status === 'Finalizado' ? 4.5 : undefined,
                                status: collab.status,
                                statusVariant: collab.status === 'Finalizado' ? 'success' as const : 'warning' as const,
                            };
                            const evaluationFields = [
                                { label: 'Autoavaliação', value: evalData.autoavaliacao },
                                { label: 'Avaliação 360', value: evalData.avaliacao360 },
                                { label: 'Nota gestor', value: evalData.notaGestor },
                                { label: 'Nota final', value: evalData.notaFinal, bold: true },
                            ];
                            return (
                                <CollaboratorEvaluationCard
                                    key={collab.id}
                                    collaborator={{
                                        nome: collab.name,
                                        cargo: collab.department,
                                        image: undefined,
                                        status: evalData.status,
                                        statusVariant: evalData.statusVariant,
                                    }}
                                    evaluationFields={evaluationFields}
                                />
                            );
                        })}
                    </div>
                </CardContainer>
            </div>
        </div>
    );
}