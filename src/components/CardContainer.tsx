import React from 'react';

interface CardContainerProps {
    children: React.ReactNode;
    className?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
    children,
    className = '',
}) => {
    return (
        <div className={`bg-white rounded-2xl shadow-sm p-8 ${className}`}>
            {children}
        </div>
    );
};

export default CardContainer;
