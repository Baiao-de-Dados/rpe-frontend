import { useState, useCallback, useMemo, useEffect } from 'react';
import { useQueryState } from 'nuqs';

export type SectionType =
    | 'Autoavaliação'
    | 'Avaliação 360'
    | 'Referências'
    | 'Mentoring';

export const useSectionNavigation = () => {
    const [sectionQuery, setSectionQuery] = useQueryState('section', {
        defaultValue: 'Autoavaliação',
        history: 'replace',
    });
    const [activeSection, setActiveSection] = useState<SectionType>(
        sectionQuery as SectionType,
    );

    useEffect(() => {
        if (sectionQuery && sectionQuery !== activeSection) {
            setActiveSection(sectionQuery as SectionType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionQuery]);

    const navigateToSection = useCallback(
        (section: SectionType) => {
            setActiveSection(section);
            setSectionQuery(section);
        },
        [setSectionQuery],
    );

    const sections: SectionType[] = useMemo(
        () => ['Autoavaliação', 'Avaliação 360', 'Mentoring', 'Referências'],
        [],
    );

    const getCurrentSectionIndex = useCallback(() => {
        return sections.indexOf(activeSection);
    }, [activeSection, sections]);

    const getNextSection = useCallback(() => {
        const currentIndex = getCurrentSectionIndex();
        return currentIndex < sections.length - 1
            ? sections[currentIndex + 1]
            : null;
    }, [getCurrentSectionIndex, sections]);

    const getPreviousSection = useCallback(() => {
        const currentIndex = getCurrentSectionIndex();
        return currentIndex > 0 ? sections[currentIndex - 1] : null;
    }, [getCurrentSectionIndex, sections]);

    const navigateNext = useCallback(() => {
        const next = getNextSection();
        if (next) navigateToSection(next);
    }, [getNextSection, navigateToSection]);

    const navigatePrevious = useCallback(() => {
        const previous = getPreviousSection();
        if (previous) navigateToSection(previous);
    }, [getPreviousSection, navigateToSection]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey) {
                switch (event.key) {
                    case 'ArrowLeft':
                        event.preventDefault();
                        navigatePrevious();
                        break;
                    case 'ArrowRight':
                        event.preventDefault();
                        navigateNext();
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigateNext, navigatePrevious]);

    return {
        activeSection,
        navigateToSection,
        sections,
    };
};
