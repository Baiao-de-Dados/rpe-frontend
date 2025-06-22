import { memo } from 'react';
import Typography from '../Typography';
import NotificationBadge from '../NotificationBadge';
import { type SectionType } from '../../hooks/useSectionNavigation';
import EvaluationSubmitButton from './EvaluationSubmitButton';

interface EvaluationHeaderProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
    sections: SectionType[];
    incompleteSelfAssessmentCount?: number;
    incompleteMentoringCount?: number;
    incompleteEvaluation360Count?: number | null;
    incompleteReferencesCount?: number;
}

function EvaluationHeaderComponent({
    activeSection,
    onSectionChange,
    sections,
    incompleteSelfAssessmentCount = 0,
    incompleteMentoringCount = 0,
    incompleteEvaluation360Count = null,
    incompleteReferencesCount = 0,
}: EvaluationHeaderProps) {
    return (
        <header className="sticky top-0 z-50 pt-12 pb-0 bg-white flex flex-col justify-between shadow-sm">
            <div className="p-8 flex items-center justify-between">
                <Typography variant="h1" className="text-4xl font-bold">
                    Ciclo 2025.1
                </Typography>
                <div className="flex gap-4 items-center">
                    <EvaluationSubmitButton />
                </div>
            </div>
            <nav className="flex space-x-20 mt-2 border-t-3 pt-5 pl-14 bg border-gray-50">
                {sections.map(section => {
                    const isActive = section === activeSection;
                    return (
                        <div
                            key={section}
                            className="relative min-w-38 text-center"
                        >
                            <Typography
                                variant="body"
                                className={`cursor-pointer pb-4 pl-5 pr-5 transition-all duration-200 relative ${
                                    isActive
                                        ? 'text-primary-600 font-semibold border-b-2 border-primary-600'
                                        : 'text-gray-600 font-normal hover:text-primary-500'
                                }`}
                                onClick={() => onSectionChange(section)}
                            >
                                <span className="invisible font-semibold absolute inset-0">
                                    {section}
                                </span>
                                {section}
                            </Typography>
                            {section === 'Autoavaliação' && (
                                <NotificationBadge
                                    show={incompleteSelfAssessmentCount > 0}
                                    count={incompleteSelfAssessmentCount}
                                    position="top-right"
                                    variant="small"
                                />
                            )}
                            {section === 'Mentoring' && (
                                <NotificationBadge
                                    show={incompleteMentoringCount > 0}
                                    count={incompleteMentoringCount}
                                    position="top-right"
                                    variant="small"
                                />
                            )}
                            {section === 'Avaliação 360' && (
                                <NotificationBadge
                                    show={
                                        incompleteEvaluation360Count === null ||
                                        incompleteEvaluation360Count > 0
                                    }
                                    count={
                                        incompleteEvaluation360Count === null
                                            ? undefined
                                            : incompleteEvaluation360Count
                                    }
                                    position="top-right"
                                    variant="small"
                                />
                            )}
                            {section === 'Referências' && (
                                <NotificationBadge
                                    show={incompleteReferencesCount > 0}
                                    count={incompleteReferencesCount}
                                    position="top-right"
                                    variant="small"
                                />
                            )}
                        </div>
                    );
                })}
            </nav>
        </header>
    );
}

export const EvaluationHeader = memo(EvaluationHeaderComponent);
