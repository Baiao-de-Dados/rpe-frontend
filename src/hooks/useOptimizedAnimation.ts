import { useReducedMotion } from 'framer-motion';

/**
 * Hook personalizado para otimização de animações
 * Respeita as preferências de acessibilidade do usuário
 */
export const useOptimizedAnimation = () => {
    const shouldReduceMotion = useReducedMotion();

    return {
        shouldReduceMotion,
        // Configurações otimizadas baseadas na preferência do usuário
        getAnimationConfig: (baseConfig: Record<string, unknown>) => {
            if (shouldReduceMotion) {
                return {
                    ...baseConfig,
                    transition: {
                        duration: 0.01, // Animação quase instantânea
                        delay: 0,
                    },
                };
            }
            return baseConfig;
        },
        // Transition otimizada para performance
        optimizedTransition: {
            duration: shouldReduceMotion ? 0.01 : 0.3,
            ease: 'easeOut' as const, // Usando string em vez de array
            delay: shouldReduceMotion ? 0 : undefined,
        },
    };
};

/**
 * Configurações de animação otimizadas para diferentes cenários
 */
export const animationPresets = {
    // Para cards que aparecem/desaparecem
    card: {
        hidden: {
            opacity: 0,
            transform: 'translateY(20px) scale(0.95)',
        },
        visible: {
            opacity: 1,
            transform: 'translateY(0px) scale(1)',
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            transform: 'translateX(-100px) scale(0.9)',
            transition: {
                duration: 0.3,
                ease: 'easeIn',
            },
        },
    },
    // Para elementos que fazem fade
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    },
    // Para listas com stagger
    stagger: {
        visible: {
            transition: {
                staggerChildren: 0.08, // Otimizado
                delayChildren: 0.1,
            },
        },
        exit: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    },
};
