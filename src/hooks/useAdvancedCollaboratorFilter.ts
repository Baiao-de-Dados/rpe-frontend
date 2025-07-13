import { useState, useMemo } from 'react';

import type { Filters } from '../components/common/AdvancedFilter';
import type { CollaboratorsEvaluationsSummary } from '../types/collaborator';

interface UseAdvancedCollaboratorFilterProps {
    collaboratorsSummary: CollaboratorsEvaluationsSummary;
    positions: string[];
    tracks: string[];
}

export function useAdvancedCollaboratorFilter({ collaboratorsSummary, positions, tracks }: UseAdvancedCollaboratorFilterProps) {
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<Filters | null>(null);

    const filteredCollaborators = useMemo(() => {
        let filtered: CollaboratorsEvaluationsSummary = collaboratorsSummary;

        if (search.trim()) {
            const lowerQuery = search.toLowerCase();
            filtered = filtered.filter((item: typeof collaboratorsSummary[number]) =>
                item.collaborator.name.toLowerCase().includes(lowerQuery) ||
                item.collaborator.position.toLowerCase().includes(lowerQuery)
            );
        }

        if (filters) {
            const {
                pending,
                completed,
                orderDesc,
                scoreRange,
                ...restFilters
            } = filters;

            const selectedPositions = positions.filter(pos => restFilters[pos]);
            const selectedTracks = tracks.filter(track => restFilters[track]);

            filtered = filtered.filter((item: typeof collaboratorsSummary[number]) => {
                const matchesStatus =
                    (pending && item.status === 'pendente') ||
                    (completed && item.status === 'finalizado') ||
                    (!pending && !completed);

                const matchesPosition =
                    selectedPositions.length === 0 || selectedPositions.includes(item.collaborator.position);

                const matchesTrack =
                    selectedTracks.length === 0 || selectedTracks.includes(item.collaborator.track?.name ?? '');

                const score = item.finalEvaluationScore ?? 0;
                const matchesScore = Array.isArray(scoreRange) && score >= scoreRange[0] && score <= scoreRange[1];

                return matchesStatus && matchesPosition && matchesTrack && matchesScore;
            });

            filtered = filtered.sort((a: typeof collaboratorsSummary[number], b: typeof collaboratorsSummary[number]) =>
                orderDesc
                    ? (b.finalEvaluationScore ?? 0) - (a.finalEvaluationScore ?? 0)
                    : (a.finalEvaluationScore ?? 0) - (b.finalEvaluationScore ?? 0)
            );
        }

        return filtered;
    }, [collaboratorsSummary, search, filters, positions, tracks]);

    return {
        search,
        setSearch,
        filters,
        setFilters,
        filteredCollaborators,
    };
}
