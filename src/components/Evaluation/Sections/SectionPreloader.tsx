import { useEffect, lazy } from 'react';

// Pre-load dos componentes lazy para melhorar UX
const preloadSelfAssessment = () =>
    lazy(() =>
        import('./SelfAssessmentSection').then(module => ({
            default: module.SelfAssessmentSection,
        })),
    );
const preloadEvaluation360 = () =>
    lazy(() =>
        import('./Evaluation360Section').then(module => ({
            default: module.Evaluation360Section,
        })),
    );
const preloadMentoring = () =>
    lazy(() =>
        import('./MentoringSection').then(module => ({
            default: module.MentoringSection,
        })),
    );
const preloadReferences = () =>
    lazy(() =>
        import('./ReferencesSection').then(module => ({
            default: module.ReferencesSection,
        })),
    );

interface SectionPreloaderProps {
    activeSection: string;
}

export function SectionPreloader({ activeSection }: SectionPreloaderProps) {
    useEffect(() => {
        // Pre-carregar a próxima seção baseada na seção ativa
        const sectionOrder = [
            'Autoavaliação',
            'Avaliação 360',
            'Mentoring',
            'Referências',
        ];
        const currentIndex = sectionOrder.indexOf(activeSection);

        if (currentIndex >= 0 && currentIndex < sectionOrder.length - 1) {
            const nextSection = sectionOrder[currentIndex + 1];

            // Pre-carrega a próxima seção com um pequeno delay
            const preloadTimer = setTimeout(() => {
                switch (nextSection) {
                    case 'Autoavaliação':
                        preloadSelfAssessment();
                        break;
                    case 'Avaliação 360':
                        preloadEvaluation360();
                        break;
                    case 'Mentoring':
                        preloadMentoring();
                        break;
                    case 'Referências':
                        preloadReferences();
                        break;
                }
            }, 1000); // Delay de 1 segundo para não interferir com o carregamento da seção atual

            return () => clearTimeout(preloadTimer);
        }
    }, [activeSection]);

    return null; // Este componente não renderiza nada
}
