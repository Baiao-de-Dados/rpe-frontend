import { memo } from 'react';
import { motion } from 'framer-motion';

import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

interface AnimatedCardProps {
    children: React.ReactNode;
    index?: number;
    className?: string;
}

function AnimatedCard({ children, index = 0, className = '' }: AnimatedCardProps) {

    const { optimizedTransition, variants } = useOptimizedAnimation();

    return (
        <motion.div className={className} style={{ willChange: 'transform, opacity'}} variants={variants.animatedCard} initial="hidden" animate="visible" exit="exit" transition={{...optimizedTransition, delay: index * 0.08}} layout>
            {children}
        </motion.div>
    );
}

export default memo(AnimatedCard);
