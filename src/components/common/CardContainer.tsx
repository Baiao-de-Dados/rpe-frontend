import React from 'react';

interface CardContainerProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
    shadow?: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({
    children,
    className = '',
    noPadding = false,
    shadow = true,
}) => {
    const hasCustomBgClass = className.includes('bg-');

    return (
        <div
            className={`
                ${!hasCustomBgClass ? 'bg-white' : ''} rounded-2xl 
                ${shadow ? 'shadow-sm' : ''} 
                ${noPadding ? '' : 'p-6'} 
                ${className}
                h-full
            `}
        >
            {children}
        </div>
    );
};

export default CardContainer;
