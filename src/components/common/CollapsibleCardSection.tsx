import { useState, type ReactNode } from 'react';
import CardContainer from './CardContainer';
import Typography from './Typography';
import { ChevronDown } from 'lucide-react';
import { ErrorMessage } from './ErrorMessage';
import type { TrackSectionFormType } from '../../schemas/trackSectionSchema';
import RatingDisplay from './RatingDisplay';

interface CollapsibleCardSectionProps {
    title: React.ReactNode;
    headerRight?: ReactNode;
    notificationBadge?: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
    onHeaderClick?: () => void;
    isOpen?: boolean;
    className?: string;
    headerErrorMessage?: string;
    track?: TrackSectionFormType['tracks'][number];
}

export default function CollapsibleCardSection({ title, headerRight, notificationBadge, children, defaultOpen = true, onHeaderClick, isOpen: isOpenProp, className = '', headerErrorMessage, track }: CollapsibleCardSectionProps) {
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
        <>
            <CardContainer className={`pt-8 p-6 mb-5 relative ${className}`}>
                <div className="block md:hidden mb-4 cursor-pointer">
                    <div className="flex flex-col min-w-0" onClick={handleHeaderClick}>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <Typography variant="h4" color="primary500" className="text-lg font-bold">
                                    {title}
                                </Typography>
                                {track &&
                                    (() => {
                                        const activeCount = track.pillars.reduce((acc, pillar) => acc + pillar.criteria.filter(c => c.isActive).length, 0);
                                        return <RatingDisplay rating={activeCount} min={12} max={17} />;
                                    })()}
                                {notificationBadge}
                                {headerErrorMessage && <ErrorMessage error={headerErrorMessage} />}
                            </div>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                <ChevronDown size={24} className="text-gray-600" />
                            </div>
                        </div>
                        {track && <span className="text-gray-500 text-xs mt-1 block">A trilha deve ter de 12 a 17 critérios</span>}
                    </div>
                    {headerRight && (
                        <div className="flex items-center gap-2 mt-2" onClick={handleHeaderClick}>
                            {headerRight}
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                <ChevronDown size={24} className="text-gray-600" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="hidden md:flex items-center justify-between mb-4 cursor-pointer" onClick={handleHeaderClick}>
                    <div className="flex flex-col min-w-0 w-full">
                        <div className="flex items-center justify-between gap-2 w-full">
                            <div className="flex items-center gap-2">
                                <Typography variant="h4" color="primary500" className="text-lg font-bold">
                                    {title}
                                </Typography>
                                {track &&
                                    (() => {
                                        const activeCount = track.pillars.reduce((acc, pillar) => acc + pillar.criteria.filter(c => c.isActive).length, 0);
                                        return <RatingDisplay rating={activeCount} min={12} max={17} />;
                                    })()}
                                {notificationBadge}
                                {headerErrorMessage && <ErrorMessage error={headerErrorMessage} />}
                            </div>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                <ChevronDown size={24} className="text-gray-600" />
                            </div>
                        </div>
                        {track && <span className="text-gray-500 text-xs mt-1 block">A trilha deve ter de 12 a 17 critérios</span>}
                    </div>
                    <div className="flex items-center gap-2">{headerRight}</div>
                </div>
                <div className={`transition-all duration-300 ease-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>{children}</div>
            </CardContainer>
        </>
    );
}
