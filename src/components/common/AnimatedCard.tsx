import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
    animationPresets,
    useOptimizedAnimation,
} from '../../hooks/useOptimizedAnimation';

interface AnimatedCardProps {
    children: React.ReactNode;
    index?: number;
    className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
    children,
    index = 0,
    className = '',
}) => {
    const { optimizedTransition } = useOptimizedAnimation();

    return (
        <motion.div
            className={className}
            style={{
                // will-change otimiza o rendering
                willChange: 'transform, opacity',
            }}
            variants={animationPresets.card as Variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
                ...optimizedTransition,
                delay: index * 0.08, // Delay escalonado para efeito stagger
            }}
            layout
        >
            {children}
        </motion.div>
    );
};

export default React.memo(AnimatedCard);
