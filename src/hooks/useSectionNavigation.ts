import { useQueryState } from 'nuqs';
import { useState, useCallback, useMemo, useEffect } from 'react';

export function useSectionNavigation<T extends string = string>(sectionsInput: T[], defaultSection?: T) {

    const [sectionQuery, setSectionQuery] = useQueryState('section', {
        defaultValue: defaultSection || sectionsInput[0],
        history: 'replace',
    });

    const [activeSection, setActiveSection] = useState<T>(
        (sectionQuery as T) || defaultSection || sectionsInput[0],
    );

    useEffect(() => {
        if (sectionQuery && sectionQuery !== activeSection) {
            setActiveSection(sectionQuery as T);
        }
    }, [sectionQuery, activeSection]);

    const navigateToSection = useCallback(
        (section: T) => {
            setActiveSection(section);
            setSectionQuery(section);
        },
        [setSectionQuery],
    );

    const sections: T[] = useMemo(() => sectionsInput, [sectionsInput]);

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
}
