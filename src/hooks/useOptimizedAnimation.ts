import { useReducedMotion, easeIn, easeOut, easeInOut } from 'framer-motion';

export const useOptimizedAnimation = () => {
    const shouldReduceMotion = useReducedMotion();

    return {
        shouldReduceMotion,
        getAnimationConfig: (baseConfig: Record<string, unknown>) => {
            if (shouldReduceMotion) {
                return {
                    ...baseConfig,
                    transition: {
                        duration: 0.01, 
                        delay: 0,
                    },
                };
            }
            return baseConfig;
        },
        optimizedTransition: {
            duration: shouldReduceMotion ? 0.01 : 0.3,
            ease: 'easeOut' as const,
            delay: shouldReduceMotion ? 0 : undefined,
        },
        variants: {
            animatedCard: {
                hidden: {
                    opacity: 0,
                    transform: 'translateY(20px) scale(0.95)',
                },
                visible: {
                    opacity: 1,
                    transform: 'translateY(0px) scale(1)',
                    transition: {
                        duration: 0.3,
                        ease: easeOut,
                    },
                },
                exit: {
                    opacity: 0,
                    transform: 'translateX(-100px) scale(0.9)',
                    transition: {
                        duration: 0.3,
                        ease: easeIn,
                    },
                },
            },
            sectionSpinnerContainer: {
                initial: { opacity: 0 },
                animate: {
                    opacity: 1,
                    transition: { duration: 0.3 },
                },
            },
            sectionSpinnerDot: {
                animate: {
                    y: [0, -10, 0],
                    transition: {
                        duration: 0.6,
                        repeat: Infinity,
                        ease: easeInOut,
                    },
                },
            },
            sectionSpinnerDotWithDelay: (delay: number) => ({
                animate: {
                    y: [0, -10, 0],
                    transition: {
                        duration: 0.6,
                        repeat: Infinity,
                        delay,
                        ease: easeInOut,
                    },
                },
            }),
            trackMotion: {
                initial: { opacity: 0, y: 20, scale: 0.95 },
                animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.3, ease: easeInOut },
                },
                exit: {
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                    transition: { duration: 0.3, ease: easeInOut },
                },
            },
            pillarMotion: {
                initial: { opacity: 0, y: 24 },
                animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.28, ease: easeOut },
                },
                exit: {
                    opacity: 0,
                    y: -24,
                    transition: { duration: 0.18, ease: easeIn },
                },
            },
            configSectionRenderer: {
                initial: { opacity: 0, y: 20 },
                animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: easeInOut },
                },
                exit: {
                    opacity: 0,
                    y: -20,
                    transition: { duration: 0.3, ease: easeInOut },
                },
            },
            evaluationSectionRenderer: {
                initial: { opacity: 0, y: 20 },
                animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: easeInOut },
                },
                exit: {
                    opacity: 0,
                    y: -20,
                    transition: { duration: 0.3, ease: easeInOut },
                },
            },
            modalBackdrop: {
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { duration: 0.2 } },
                exit: { opacity: 0, transition: { duration: 0.2 } },
            },
            modalContainer: {
                initial: { scale: 0.96, opacity: 0 },
                animate: {
                    scale: 1,
                    opacity: 1,
                    transition: { duration: 0.28, ease: easeOut },
                },
                exit: {
                    scale: 0.96,
                    opacity: 0,
                    transition: { duration: 0.18, ease: easeIn },
                },
            },
            emptyMessage: {
                initial: { opacity: 0, y: 12 },
                animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.28, ease: easeOut },
                },
                exit: {
                    opacity: 0,
                    y: 12,
                    transition: { duration: 0.18, ease: easeIn },
                },
            },
            projectManagerCollapse: {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: 'auto', transition: { duration: shouldReduceMotion ? 0.01 : 0.18, ease: easeOut } },
                exit: { opacity: 0, height: 0, transition: { duration: shouldReduceMotion ? 0.01 : 0.18, ease: easeIn } },
            },
            avaliacaoSectionTitle: {
                initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 0 },
                animate: { opacity: 1, x: 0 },
                exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 0 },
                transition: {
                    duration: shouldReduceMotion ? 0.01 : 0.5,
                    delay: shouldReduceMotion ? 0 : 0,
                },
            },
            avaliacaoSectionItem: (idx: number) => ({
                initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 16 },
                animate: { opacity: 1, x: 0 },
                exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 16 },
                transition: {
                    duration: shouldReduceMotion ? 0.01 : 0.5,
                    delay: shouldReduceMotion ? 0 : idx * 0.12,
                },
            }),
        },
    };
};
