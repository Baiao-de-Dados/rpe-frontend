import { useEffect } from 'react';

interface SectionPreloaderProps<T extends string = string> {
    activeSection: T;
    sections: T[];
}

export function SectionPreloader<T extends string = string>({
    activeSection,
    sections,
}: SectionPreloaderProps<T>) {
    useEffect(() => {
        const currentIndex = sections.indexOf(activeSection);
        if (currentIndex >= 0 && currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            const preloadTimer = setTimeout(() => {
                console.log(`Preparando para carregar: ${nextSection}`);
            }, 1000);
            return () => clearTimeout(preloadTimer);
        }
    }, [activeSection, sections]);

    return null;
}
