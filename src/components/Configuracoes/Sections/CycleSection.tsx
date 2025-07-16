import { useState } from 'react';
import { Clock, History } from 'lucide-react';

import CycleCard from '../Cards/CycleCard';

import { useCycle } from '../../../hooks/useCycle';
import { useMemo } from 'react';

import AlertMessage from '../../common/AlertMessage';

import { parseCycleString, getCurrentCycleName, getCurrentCycleLocal, getAllCyclesWithCurrent } from '../../../utils/cycleUtils';
import { getBrazilDateString } from '../../../utils/globalUtils';

import StartCycleModal from '../Modals/StartCycleModal';
import CancelCycleModal from '../Modals/CancelCycleModal';
import ExtendCycleModal from '../Modals/ExtendCycleModal';

export function CycleSection() {

    const [startModalOpen, setStartModalOpen] = useState(false);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [extendModalOpen, setExtendModalOpen] = useState(false);

    const { currentCycle, allTracksSet, cycles, startCycle, extendCycle, cancelCycle } = useCycle();

    const currentCycleName = getCurrentCycleName();

    const localCurrentCycle = useMemo(
        () => getCurrentCycleLocal(currentCycle, currentCycleName),
        [currentCycle, currentCycleName]
    );
    const allCycles = useMemo(
        () => getAllCyclesWithCurrent(localCurrentCycle, cycles, currentCycleName),
        [localCurrentCycle, cycles, currentCycleName]
    );

    const cycleLabel = `Ciclo ${localCurrentCycle.name}`;
    const { year, semester } = parseCycleString(cycleLabel);

    const handleStartCycle = async (startDate: string, endDate: string) => {
        startCycle({ startDate, endDate });
        setStartModalOpen(false);
    };

    const handleCancelCycle = async () => {
        if (localCurrentCycle.id) {
            cancelCycle(localCurrentCycle.id);
        }
        setCancelModalOpen(false);
    };

    const handleExtendCycle = async (newEndDate: string) => {
        if (localCurrentCycle.id) {
            extendCycle(localCurrentCycle.id, { endDate: newEndDate });
        }
        setExtendModalOpen(false);
    };

    const canStartCycle = !!localCurrentCycle && !localCurrentCycle.isActive && allTracksSet;

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
                    showButton={!!localCurrentCycle && !localCurrentCycle.isActive} 
                    canStart={canStartCycle} 
                    cycle={localCurrentCycle}
                    status={localCurrentCycle.isActive ? 'aberto' : 'fechado'} 
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
                    {allCycles
                        .filter(c => c.name !== localCurrentCycle.name)
                        .map(cycle => (
                            <CycleCard 
                                key={cycle.name} 
                                label={`Ciclo ${cycle.name}`} 
                                status="fechado" 
                                cycle={cycle}
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
                currentEndDate={localCurrentCycle.endDate || ''}  
            />
            <CancelCycleModal cycleName={cycleLabel}
                open={cancelModalOpen} 
                safe={!!(!localCurrentCycle.done && localCurrentCycle.startDate && (new Date(localCurrentCycle.startDate) > new Date(getBrazilDateString())))}
                onClose={() => setCancelModalOpen(false)} 
                onConfirm={handleCancelCycle}  
            />
        </div>
    );
}
