import CriteriosSubmitButton from '../../components/Criterios/CriteriosSubmitButton';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import PageHeader from '../../components/PageHeader';
import TrackSection from '../../components/Criterios/TrackSection';

import { useCycle } from '../../hooks/useCycle';
import { mockTracks } from '../../data/mockTracks';

export function Criterios() {
    const { currentCycle } = useCycle();

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    return (
        <>
            <PageHeader
                title="Critérios de Avaliação"
                button={<CriteriosSubmitButton />}
            />
            <main className="p-8 pt-6">
                {mockTracks.map(track => (
                    <TrackSection
                        key={track.id}
                        trackTitle={track.title}
                        sections={track.sections}
                    />
                ))}
            </main>
        </>
    );
}
