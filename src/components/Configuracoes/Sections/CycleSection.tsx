import { useState } from 'react';
import { Clock, History } from 'lucide-react';

import CycleCard from '../Cards/CycleCard';

import { useCycle } from '../../../hooks/useCycle';

import AlertMessage from '../../common/AlertMessage';

import { parseCycleString } from '../../../utils/cycleUtils';

import StartCycleModal from '../Modals/StartCycleModal';
import CancelCycleModal from '../Modals/CancelCycleModal';
import ExtendCycleModal from '../Modals/ExtendCycleModal';

export function CycleSection() {

    const [startModalOpen, setStartModalOpen] = useState(false);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [extendModalOpen, setExtendModalOpen] = useState(false);

    const { currentCycle, allTracksSet, cycles, startCycle, extendCycle, cancelCycle } = useCycle();

    const cycleLabel = `Ciclo ${currentCycle.name}`;
    const { year, semester } = parseCycleString(cycleLabel);

    const handleStartCycle = async (endDate: string) => {
        startCycle({ endDate });
        setStartModalOpen(false);
    };

    const handleCancelCycle = async () => {
        if (currentCycle.id) {
            cancelCycle(currentCycle.id);
        }
        setCancelModalOpen(false);
    };

    const handleExtendCycle = async (newEndDate: string) => {
        if (currentCycle.id) {
            extendCycle(currentCycle.id, { endDate: newEndDate });
        }
        setExtendModalOpen(false);
    };

    const canStartCycle = !!currentCycle && !currentCycle.isActive && allTracksSet;

    return (
        <div className="flex flex-col gap-8 sm:gap-6 px-2 sm:px-0">
            {
                !allTracksSet && 
                <AlertMessage message="É necessário definir os critérios de todas as trilhas antes de iniciar o ciclo." type="alert" />
            }
            <section className="pb-8 sm:pb-6 border-b border-gray-300 mb-4 sm:mb-2">
                <span className="text-primary-700 font-semibold text-base sm:text-sm flex mb-6 sm:mb-4 items-center gap-2">
                    <Clock size={18} className="text-primary-700" />
                    Ciclo atual
                </span>
                <CycleCard 
                    label={cycleLabel} 
                    showButton={!!currentCycle && !currentCycle.isActive} 
                    canStart={canStartCycle} 
                    status={currentCycle.isActive ? 'aberto' : undefined} 
                    onStartClick={() => setStartModalOpen(true)} 
                    onCancelClick={() => setCancelModalOpen(true)} 
                    onExtendClick={() => setExtendModalOpen(true)}
                />
            </section>
            <section>
                <span className="text-primary-700 font-semibold text-base sm:text-sm flex mb-6 sm:mb-4 items-center gap-2">
                    <History size={18} className="text-primary-700" />
                    Ciclos anteriores
                </span>
                <div className="max-h-96 md:max-h-96 lg:max-h-96 xl:max-h-96 2xl:max-h-96 sm:max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {cycles
                        .filter(c => c.name !== currentCycle.name)
                        .map(cycle => (
                            <CycleCard 
                                key={cycle.name} 
                                label={`Ciclo ${cycle.name}`} 
                                status="finalizado" 
                                endDate={cycle.endDate}
                            />
                        ))}
                </div>
            </section>
            <StartCycleModal semester={semester} year={year}
                open={startModalOpen} 
                onClose={() => setStartModalOpen(false)} 
                onStart={handleStartCycle}  
            />
            <ExtendCycleModal year={year} semester={semester}
                open={extendModalOpen} 
                onClose={() => setExtendModalOpen(false)} 
                onConfirm={handleExtendCycle} 
                currentEndDate={currentCycle.endDate || ''}  
            />
            <CancelCycleModal cycleName={cycleLabel}
                open={cancelModalOpen} 
                onClose={() => setCancelModalOpen(false)} 
                onConfirm={handleCancelCycle}  
            />
        </div>
    );
}
