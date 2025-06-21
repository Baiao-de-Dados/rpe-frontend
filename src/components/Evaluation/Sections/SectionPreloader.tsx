import { useEffect } from 'react';
import { type SectionType } from '../../../hooks/useSectionNavigation';

interface SectionPreloaderProps {
    activeSection: SectionType;
}

export function SectionPreloader({ activeSection }: SectionPreloaderProps) {
    useEffect(() => {
        const sectionOrder: SectionType[] = [
            'Autoavaliação',
            'Avaliação 360',
            'Referências',
            'Mentoring',
        ];
        const currentIndex = sectionOrder.indexOf(activeSection);

        if (currentIndex >= 0 && currentIndex < sectionOrder.length - 1) {
            const nextSection = sectionOrder[currentIndex + 1];

            const preloadTimer = setTimeout(() => {
                console.log(`Preparando para carregar: ${nextSection}`);
            }, 1000);

            return () => clearTimeout(preloadTimer);
        }
    }, [activeSection]);

    return null;
}
