import type { TrackSectionFormType } from '../../../../schemas/trackSectionSchema';

import type { Pillar } from '../../../../types/pillar';
import type { Track, GetTracksCriteriaResponse, SetTracksPayload } from '../../../../types/track';

export const createTrackDefaultValues = (tracks: Track[], pillars: Pillar[], tracksCriteria?: GetTracksCriteriaResponse): TrackSectionFormType => {
    if (!pillars || pillars.length === 0 || !tracks || tracks.length === 0) {
        return { tracks: [] };
    }

    return {
        tracks: tracks.map(track => {
            const savedTrack = tracksCriteria?.find(t => t.id === track.id);

            return {
                id: track.id!,
                name: track.name,
                pillars: pillars.map(pillar => {
                    const savedPillar = savedTrack?.pillars?.find(p => p.id === pillar.id);

                    return {
                        id: pillar.id,
                        name: pillar.name,
                        criteria: pillar.criteria.map(criterion => {
                            const savedCriterion = savedPillar?.criteria.find(c => c.id === criterion.id);

                            return {
                                id: criterion.id,
                                name: criterion.name,
                                isActive: !!savedCriterion,
                                weight: savedCriterion ? savedCriterion.weight.toString() : '',
                            };
                        }),
                    };
                }),
            };
        }),
    };
};

export const processTracksForAPI = (data: TrackSectionFormType): SetTracksPayload => {
    return data.tracks
        .map(track => {
            const trackPillars = track.pillars
                .map(pillar => {
                    const activeCriteria = pillar.criteria.filter(c => c.isActive);
                    if (activeCriteria.length === 0) return null;
                    return {
                        id: pillar.id,
                        criteria: activeCriteria.map(c => ({
                            id: c.id,
                            weight: c.weight ? Number(c.weight) : 0,
                        })),
                    };
                })
                .filter((pillar): pillar is NonNullable<typeof pillar> => pillar !== null);

            if (trackPillars.length === 0) return null;

            return {
                trackId: track.id,
                pillars: trackPillars,
            };
        })
        .filter((track): track is NonNullable<typeof track> => track !== null);
};
