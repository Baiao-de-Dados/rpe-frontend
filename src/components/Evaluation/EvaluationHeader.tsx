import { memo, useState, useRef, useEffect } from 'react';
import Typography from '../Typography';
import NotificationBadge from '../NotificationBadge';
import { type SectionType } from '../../hooks/useSectionNavigation';
import EvaluationSubmitButton from './EvaluationSubmitButton';
import PageHeader from '../PageHeader';

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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Função para renderizar badges
    const renderBadge = (section: SectionType) => {
        if (section === 'Autoavaliação') {
            return (
                <NotificationBadge
                    show={incompleteSelfAssessmentCount > 0}
                    count={incompleteSelfAssessmentCount}
                    position="top-right"
                    variant="small"
                />
            );
        }
        if (section === 'Mentoring') {
            return (
                <NotificationBadge
                    show={incompleteMentoringCount > 0}
                    count={incompleteMentoringCount}
                    position="top-right"
                    variant="small"
                />
            );
        }
        if (section === 'Avaliação 360') {
            return (
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
            );
        }
        if (section === 'Referências') {
            return (
                <NotificationBadge
                    show={incompleteReferencesCount > 0}
                    count={incompleteReferencesCount}
                    position="top-right"
                    variant="small"
                />
            );
        }
        return null;
    };

    return (
        <PageHeader title="Ciclo 2025.1" button={<EvaluationSubmitButton />}>
            <nav className="hidden md:flex w-full mt-2 border-t-3 pt-5 bg border-gray-50 overflow-x-auto">
                <div className="flex w-full justify-start gap-x-4">
                    {sections.map(section => {
                        const isActive = section === activeSection;
                        return (
                            <div
                                key={section}
                                className="ml-14 min-w-[170px] flex flex-col justify-center items-center text-center relative"
                            >
                                <Typography
                                    variant="body"
                                    className={`cursor-pointer pb-4 px-4 transition-all duration-200 relative w-full truncate ${
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
                                            incompleteEvaluation360Count ===
                                                null ||
                                            incompleteEvaluation360Count > 0
                                        }
                                        count={
                                            incompleteEvaluation360Count ===
                                            null
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
                </div>
            </nav>
            <div className="md:hidden mt-2 pt-5 bg border-gray-50">
                <div className="relative w-full" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(v => !v)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                        type="button"
                    >
                        <span className="flex items-center justify-between w-full">
                            <span className="inline-block align-middle">
                                {activeSection}
                            </span>
                            <span className="flex items-center ml-auto relative -top-1 mr-2">
                                <span className="scale-100">
                                    {renderBadge(activeSection)}
                                </span>
                            </span>
                        </span>
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            {sections.map(section => {
                                const isActive = section === activeSection;
                                return (
                                    <button
                                        key={section}
                                        onClick={() => {
                                            onSectionChange(section);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm ${
                                            isActive
                                                ? 'bg-primary-50 text-primary-600 font-semibold border-l-4 border-primary-600'
                                                : 'text-gray-700'
                                        }`}
                                        type="button"
                                    >
                                        <span className="flex items-center justify-between w-full">
                                            <span className="inline-block align-middle">
                                                {section}
                                            </span>
                                            <span className="flex items-center ml-auto relative -top-1">
                                                <span className="scale-100">
                                                    {renderBadge(section)}
                                                </span>
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </PageHeader>
    );
}

export const EvaluationHeader = memo(EvaluationHeaderComponent);
