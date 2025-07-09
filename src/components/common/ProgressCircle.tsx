import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { CHART_COLORS } from '../../utils/colorUtils';

import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

interface ProgressCircleProps { 
    percentage: number; 
}

const ProgressCircle = ({ percentage }: ProgressCircleProps) => {

    const { optimizedTransition } = useOptimizedAnimation();

    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedPercentage(percentage);
        }, 100);

        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    stroke={CHART_COLORS.GOOD} 
                    strokeWidth="10" 
                    fill="none" 
                    strokeDasharray={strokeDasharray} 
                    strokeDashoffset={strokeDashoffset} 
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ 
                        ...optimizedTransition,
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span 
                    className="text-2xl sm:text-3xl font-bold" 
                    style={{ color: CHART_COLORS.GOOD }}
                >
                    {percentage}%
                </span>
            </div>
        </div>
    );
};

export default ProgressCircle;
