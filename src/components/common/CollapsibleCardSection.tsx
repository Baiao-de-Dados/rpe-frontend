import { useState, type ReactNode } from 'react';
import CardContainer from '../CardContainer';
import Typography from '../Typography';
import { ChevronDown } from 'lucide-react';

interface CollapsibleCardSectionProps {
    title: string;
    headerRight?: ReactNode;
    notificationBadge?: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
    onHeaderClick?: () => void;
    isOpen?: boolean; // Permite controle externo
    className?: string;
}

export default function CollapsibleCardSection({
    title,
    headerRight,
    notificationBadge,
    children,
    defaultOpen = true,
    onHeaderClick,
    isOpen: isOpenProp,
    className = '',
}: CollapsibleCardSectionProps) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = typeof isOpenProp === 'boolean';
    const isOpen = isControlled ? isOpenProp : internalOpen;

    const handleHeaderClick = () => {
        if (isControlled) {
            if (onHeaderClick) onHeaderClick();
        } else {
            setInternalOpen(prev => !prev);
            if (onHeaderClick) onHeaderClick();
        }
    };

    return (
        <CardContainer className={`pt-8 p-6 mb-5 relative ${className}`}>
            {/* MOBILE HEADER */}
            <div className="block md:hidden mb-4 cursor-pointer">
                <div
                    className="flex items-center gap-2 min-w-0"
                    onClick={handleHeaderClick}
                >
                    <Typography
                        variant="h4"
                        color="primary500"
                        className="text-lg font-bold"
                    >
                        {title}
                    </Typography>
                    {notificationBadge}
                    {/* Só mostra a seta se não houver headerRight (caso da TrackSection) */}
                    {!headerRight && (
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${
                                isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        >
                            <ChevronDown size={24} className="text-gray-600" />
                        </div>
                    )}
                </div>
                {/* Se houver headerRight, mostra abaixo (caso PillarSection) */}
                {headerRight && (
                    <div
                        className="flex items-center gap-2 mt-2"
                        onClick={handleHeaderClick}
                    >
                        {headerRight}
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${
                                isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        >
                            <ChevronDown size={24} className="text-gray-600" />
                        </div>
                    </div>
                )}
            </div>
            {/* DESKTOP HEADER */}
            <div
                className="hidden md:flex items-center justify-between mb-4 cursor-pointer"
                onClick={handleHeaderClick}
            >
                <div className="flex items-center gap-2 min-w-0">
                    <Typography
                        variant="h4"
                        color="primary500"
                        className="text-lg font-bold"
                    >
                        {title}
                    </Typography>
                    {notificationBadge}
                </div>
                <div className="flex items-center gap-2">
                    {headerRight}
                    <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${
                            isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                    >
                        <ChevronDown size={24} className="text-gray-600" />
                    </div>
                </div>
            </div>
            <div
                className={`transition-all duration-300 ease-out overflow-hidden ${
                    isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                {children}
            </div>
        </CardContainer>
    );
}
