import { useState, useEffect } from 'react';
import Badge from './Badge';
import Typography from './Typography';
import CollaboratorCard from './CollaboratorCard';

import type { CollaboratorEvaluations } from '../../types/collaborator';

import { getEvaluationFields, getDisplayName, getDisplayPosition, getBadgeProps, formatEvaluationValue } from '../../utils/evaluationCardUtils';

export interface CollaboratorEvaluationCardProps {
    summary: CollaboratorEvaluations;
    onClick?: () => void;
    className?: string;
}

function CollaboratorEvaluationCard({ summary, onClick, className = '' }: CollaboratorEvaluationCardProps) {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const evaluationFields = getEvaluationFields(summary, isMobile);
    const displayName = getDisplayName(summary.collaborator.name, isMobile);
    const displayPosition = getDisplayPosition(summary.collaborator.position, isMobile);

    return (
        <div className={`flex ${isMobile ? 'flex-row items-center' : 'sm:flex-row items-center'} justify-between bg-white rounded-lg sm:rounded-2xl px-2 sm:px-6 py-2 sm:py-3 gap-2 sm:gap-4 border border-[#f0f0f0] min-h-0 h-auto ${className}`} onClick={onClick} style={{ minHeight: isMobile ? 48 : 56, maxHeight: isMobile ? 64 : undefined}}>
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <CollaboratorCard
                    collaborator={{
                        name: displayName,
                        position: displayPosition,
                    }}
                    variant="compact"
                />
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end w-full sm:max-w-[60%]">
                <Badge
                    label={summary.status === 'finalizado' ? 'Finalizado' : 'Pendente'}
                    variant={summary.status === 'finalizado' ? 'success' : 'warning'}
                    size="sm"
                    className="ml-1 sm:ml-2"
                />
                {evaluationFields.map((field, idx) => {
                    const { style, className } = getBadgeProps(field);
                    return (
                        <div key={field.label + idx} className="flex flex-col items-center min-w-[48px] sm:min-w-[80px]">
                            <Typography variant="caption" className="text-neutral-500 mb-1 text-xs font-normal hidden sm:block">
                                {field.label}
                            </Typography>
                            <div className={`rounded text-base font-semibold px-2 sm:px-4 py-1 min-w-[32px] sm:min-w-[36px] text-center ${className}`} style={{ minHeight: 28, ...style }}>
                                {formatEvaluationValue(field.value)}
                            </div>
                        </div>
                    );
                })}
                <div className="ml-2 sm:ml-4 text-gray-400 flex-shrink-0 flex items-center h-full">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default CollaboratorEvaluationCard;
