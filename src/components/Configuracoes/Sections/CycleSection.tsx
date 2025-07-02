import { useState } from 'react';
import CycleCard from '../Cards/CycleCard';
import { useCycle } from '../../../hooks/useCycle';
import { getCycleLabel, parseCycleString } from './utils';
import { mockCycles } from '../../../data/mockCycles';
import { Clock, History } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import { formatDate } from '../../../utils/globalUtils';
import AlertMessage from '../../common/AlertMessage';
import CancelCycleModal from '../Modals/CancelCycleModal';
import ExtendCycleModal from '../Modals/ExtendCycleModal';
import StartCycleModal from '../Modals/StartCycleModal';

export function CycleSection() {
    const { currentCycle, checkCycleStatus } = useCycle();
    const [startModalOpen, setStartModalOpen] = useState(false);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [extendModalOpen, setExtendModalOpen] = useState(false);
    const { showToast } = useToast();

    const cycleLabel = getCycleLabel();
    const { year, semester } = parseCycleString(cycleLabel);

    const handleStartCycle = async (endDate: string) => {
        console.log({ cycle: cycleLabel, endDate });
        showToast(`O ciclo foi iniciado com sucesso! Data de término: ${formatDate(endDate)}`, 'success', { title: 'Ciclo iniciado', duration: 10000 });
        setStartModalOpen(false);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await checkCycleStatus();
    };

    const handleCancelCycle = async () => {
        console.log({ cycle: cycleLabel });
        showToast('Ciclo cancelado com sucesso! As avaliações foram apagadas.', 'success', { title: 'Ciclo cancelado', duration: 10000 });
        setCancelModalOpen(false);
        await checkCycleStatus();
    };

    const handleExtendCycle = async (newDate: string) => {
        console.log({ cycle: cycleLabel, newDate });
        showToast(`Ciclo prorrogado para ${formatDate(newDate)}`, 'success', {
            title: 'Ciclo prorrogado',
            duration: 10000,
        });
        setExtendModalOpen(false);
        await checkCycleStatus();
    };

    const canStartCycle = !!currentCycle && !currentCycle.isOpen && currentCycle.allTracksSet;

    return (
        <div className="flex flex-col gap-8 sm:gap-6 px-2 sm:px-0">
            {!currentCycle?.allTracksSet && <AlertMessage message="É necessário definir os critérios de todas as trilhas antes de iniciar o ciclo." type="alert" />}
            <section className="pb-8 sm:pb-6 border-b border-gray-300 mb-4 sm:mb-2">
                <span className="text-primary-700 font-semibold text-base sm:text-sm flex mb-6 sm:mb-4 items-center gap-2">
                    <Clock size={18} className="text-primary-700" />
                    Ciclo atual
                </span>
                <CycleCard label={cycleLabel} showButton={!!currentCycle && !currentCycle.isOpen} canStart={canStartCycle} status={currentCycle?.isOpen ? 'aberto' : undefined} onStartClick={() => setStartModalOpen(true)} onCancelClick={() => setCancelModalOpen(true)} onExtendClick={() => setExtendModalOpen(true)} />
            </section>
            <section>
                <span className="text-primary-700 font-semibold text-base sm:text-sm flex mb-6 sm:mb-4 items-center gap-2">
                    <History size={18} className="text-primary-700" />
                    Ciclos anteriores
                </span>
                <div className="max-h-96 md:max-h-96 lg:max-h-96 xl:max-h-96 2xl:max-h-96 sm:max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {mockCycles
                        .filter(c => c.cycleName !== cycleLabel.replace('Ciclo ', ''))
                        .map(cycle => (
                            <CycleCard key={cycle.cycleName} label={`Ciclo ${cycle.cycleName}`} status="finalizado" />
                        ))}
                </div>
            </section>
            <StartCycleModal open={startModalOpen} onClose={() => setStartModalOpen(false)} onStart={handleStartCycle} semester={semester} year={year} />
            <CancelCycleModal open={cancelModalOpen} onClose={() => setCancelModalOpen(false)} onConfirm={handleCancelCycle} cycleName={cycleLabel} />
            <ExtendCycleModal open={extendModalOpen} onClose={() => setExtendModalOpen(false)} onConfirm={handleExtendCycle} currentEndDate={currentCycle?.dataFim || ''} year={year} semester={semester} />
        </div>
    );
}
