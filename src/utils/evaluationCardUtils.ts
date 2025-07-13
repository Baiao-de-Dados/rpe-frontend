import type { CSSProperties } from 'react';
import { getScoreBgStyles } from './colorUtils';
import type { CollaboratorEvaluations } from '../types/collaborator';

export interface EvaluationField {
    label: string;
    value?: number | null;
    bold?: boolean;
    customStyle?: 'manager-evaluated'; 
}

export function getDisplayName(collaboratorName: string, isMobile: boolean): string {
    if (!isMobile) return collaboratorName;
    const parts = collaboratorName.trim().split(' ');
    if (parts.length > 1) {
        return `${parts[0]} ${parts[1][0].toUpperCase()}.`;
    }
    return parts[0];
}

export function getDisplayPosition(position: string, isMobile: boolean): string {
    if (!isMobile) return position;
    const displayPosition = position
        .replace(/Desenvolvedor|Desenvolvedora/gi, 'Dev')
        .replace(/Analista/gi, 'Ana')
        .replace(/Coordenador|Coordenadora/gi, 'Coord')
        .replace(/Gerente/gi, 'Ger')
        .replace(/Especialista/gi, 'Esp');

    if (displayPosition.length > 10) {
        const words = displayPosition.split(' ');
        if (words.length > 1) {
            return words[0] + ' ' + words[1][0].toUpperCase() + '.';
        } else {
            return displayPosition.substring(0, 8) + '...';
        }
    }
    return displayPosition;
}

export function getBadgeProps(field: { label: string; value?: number | null; customStyle?: string }): { style: CSSProperties; className: string } {
    if (field.customStyle === 'manager-evaluated' && typeof field.value === 'number') {
        return { style: { backgroundColor: '#167174', color: 'white' }, className: '' };
    }
    if (field.label === 'Nota final' && typeof field.value === 'number') {
        return { style: getScoreBgStyles(field.value), className: '' };
    }
    return { style: {}, className: 'bg-neutral-100 text-[#167174]' };
}

export function getEvaluationFields(evaluation: CollaboratorEvaluations, isMobile: boolean): EvaluationField[] {
    if (isMobile) {
        return [
            {
                label: 'Nota final',
                value: evaluation.finalEvaluationScore,
                bold: true,
            },
        ];
    }
    return [
        {
            label: 'Autoavaliação',
            value: evaluation.autoEvaluationScore,
        },
        {
            label: 'Avaliação 360',
            value: evaluation.evaluation360Score,
        },
        {
            label: 'Nota Gestor',
            value: evaluation.managerEvaluationScore,
        },
        {
            label: 'Nota final',
            value: evaluation.finalEvaluationScore,
            bold: true,
        },
    ];
}

export function formatEvaluationValue(value: number | string | null | undefined): string {
    if (value === undefined || value === null || value === '') return '-';
    if (typeof value === 'number') return value.toFixed(1);
    return String(value);
}
