import React from 'react';

interface CardContainerProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({
    children,
    className = '',
    noPadding = false,
}) => {
    const hasCustomBgClass = className.includes('bg-');

    return (
        <div
            className={`
                ${!hasCustomBgClass ? 'bg-white' : ''} rounded-2xl shadow-sm 
                ${noPadding ? '' : 'p-6'} 
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default CardContainer;
