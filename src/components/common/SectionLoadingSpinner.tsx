import { motion } from 'framer-motion';

import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

export function SectionLoadingSpinner() {

    const { variants } = useOptimizedAnimation();

    return (
        <div className="flex items-center justify-center py-12">
            <motion.div className="flex space-x-2" variants={variants.sectionSpinnerContainer} initial="initial" animate="animate">
                <motion.div className="w-3 h-3 bg-primary-500 rounded-full" variants={variants.sectionSpinnerDot} animate="animate"/>
                <motion.div className="w-3 h-3 bg-primary-500 rounded-full" variants={variants.sectionSpinnerDotWithDelay(0.2)}animate="animate"/>
                <motion.div className="w-3 h-3 bg-primary-500 rounded-full" variants={variants.sectionSpinnerDotWithDelay(0.4)}animate="animate"/>
            </motion.div>
        </div>
    );

}
