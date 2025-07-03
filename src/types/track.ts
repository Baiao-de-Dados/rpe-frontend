export type SetTracksPayload = {
    trackId: number;
    pillars: {
        id: number;
        criteria: {
            id: number;
            weight: number;
        }[];
    }[];
}[];

export interface TrackCriterion {
    id: number;
    name: string;
    weight: number;
}

export interface TrackPillar {
    id: number;
    name: string;
    criteria: TrackCriterion[];
}

export interface Track {
    id: number;
    name: string;
    pillars?: TrackPillar[];
}

export type GetTracksCriteriaResponse = Track[];
