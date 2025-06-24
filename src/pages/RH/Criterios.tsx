import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import PageHeader from '../../components/PageHeader';

import { useCycle } from '../../hooks/useCycle';

export function Criterios() {
    const { currentCycle } = useCycle();

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    return (
        <>
            <PageHeader title="Critérios de Avaliação" />
        </>
    );
}
