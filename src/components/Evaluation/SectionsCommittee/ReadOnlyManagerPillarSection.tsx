import { memo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import Typography from '../../common/Typography';
import { ReadOnlyManagerAssessment } from './ReadOnlyManagerAssessment';

import type { Criterion } from '../../../data/mockEvaluationPIllars';

interface ReadOnlyManagerPillarSectionProps {
    pillarTitle: string;
    criteria: Criterion[];
    // Dados do colaborador (read-only)
    collaboratorData?: Array<{
        criterionId: string;
        rating?: number | null;
        justification?: string;
    }>;
    // Dados do gestor (read-only)
    managerData?: Array<{
        criterionId: string;
        rating?: number | null;
        justification?: string;
    }>;
}

export const ReadOnlyManagerPillarSection = memo(({ 
    pillarTitle, 
    criteria, 
    collaboratorData = [],
    managerData = []
}: ReadOnlyManagerPillarSectionProps) => {

    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header do Pilar */}
            <button
                onClick={toggleOpen}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                <Typography variant="h3" className="text-gray-900">
                    {pillarTitle}
                </Typography>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>

            {/* Conteúdo do Pilar */}
            {isOpen && (
                <div className="p-6 space-y-6">
                    {criteria.map((criterion) => {
                        // Buscar dados do colaborador para este critério
                        const collaboratorCriterion = collaboratorData.find(
                            data => data.criterionId === criterion.id
                        );
                        
                        // Buscar dados do gestor para este critério
                        const managerCriterion = managerData.find(
                            data => data.criterionId === criterion.id
                        );

                        return (
                            <ReadOnlyManagerAssessment
                                key={criterion.id}
                                criterion={criterion}
                                collaboratorData={collaboratorCriterion}
                                managerData={managerCriterion}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
});
