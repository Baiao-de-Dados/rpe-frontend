export interface Criteria {
    id: number;
    pillarId: number;
    name: string;
    description?: string;
    createdAt: string;
    pillar?: {
        id: number;
        name: string;
        createdAt: string;
    };
}

export interface Pillar {
    id: number;
    name: string;
    createdAt: string;
    criteria: Criteria[];
}

export type CreatePillarPayload = {
    name: string;
};

export type CreateCriteriaPayload = {
    pillarId: number;
    name: string;
    description?: string;
};

export type UpdateCriteriaItem = {
    id: number;
    name: string;
    description?: string;
};

export type UpdateCriteriasPayload = {
    criteria: UpdateCriteriaItem[];
};
