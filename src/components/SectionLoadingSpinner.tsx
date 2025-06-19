import { motion } from 'framer-motion';

export function SectionLoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-12">
            <motion.div
                className="flex space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="w-3 h-3 bg-primary-500 rounded-full"
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="w-3 h-3 bg-primary-500 rounded-full"
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.2,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="w-3 h-3 bg-primary-500 rounded-full"
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.4,
                        ease: 'easeInOut',
                    }}
                />
            </motion.div>
        </div>
    );
}
