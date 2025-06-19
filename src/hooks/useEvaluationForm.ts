import { useState, useEffect } from 'react';

import { useNotifications } from './useNotifications';

import {
    mockEvaluationPillars,
    type Criterion,
} from '../data/mockEvaluationPIllars';
import {
    type Collaborator,
    type CollaboratorEvaluation,
} from '../data/mockCollaborators';

interface CriterionEvaluation {
    rating?: number;
    justification?: string;
}

export function useEvaluationForm() {
    const [activeSection, setActiveSection] = useState('Autoavaliação');
    const [evaluations, setEvaluations] = useState<
        Record<string, CriterionEvaluation>
    >({});

    const [searchQuery360, setSearchQuery360] = useState('');
    const [searchQueryReference, setSearchQueryReference] = useState('');

    const [selectedCollaborators360, setSelectedCollaborators360] = useState<
        Collaborator[]
    >([]);
    const [collaboratorEvaluations360, setCollaboratorEvaluations360] =
        useState<Record<string, CollaboratorEvaluation>>({});

    const [selectedCollaboratorsReference, setSelectedCollaboratorsReference] =
        useState<Collaborator[]>([]);
    const [
        collaboratorEvaluationsReference,
        setCollaboratorEvaluationsReference,
    ] = useState<Record<string, CollaboratorEvaluation>>({});

    const [mentoringRating, setMentoringRating] = useState<number | null>(null);
    const [mentoringJustification, setMentoringJustification] = useState('');

    const {
        updateNotificationCount,
        updateNotificationState,
        getNotification,
    } = useNotifications([
        { id: 'autoavaliacao', active: false },
        { id: 'avaliacao360', active: false },
        { id: 'mentoring', active: false },
        { id: 'referencias', active: false },
    ]);

    const handleNavClick = (section: string) => {
        setActiveSection(section);
    };

    const addCollaboratorTo360 = (collaborator: Collaborator) => {
        setSelectedCollaborators360(prev => [...prev, collaborator]);
        setCollaboratorEvaluations360(prev => ({
            ...prev,
            [collaborator.id]: {
                collaboratorId: collaborator.id,
                ratings: {},
                pontosFortes: '',
                pontosMelhoria: '',
                referencia: '',
            },
        }));
    };

    const removeCollaboratorFrom360 = (collaboratorId: string) => {
        setSelectedCollaborators360(prev =>
            prev.filter(c => c.id !== collaboratorId),
        );
        setCollaboratorEvaluations360(prev => {
            const newEvaluations = { ...prev };
            delete newEvaluations[collaboratorId];
            return newEvaluations;
        });
    };

    const updateCollaboratorRating360 = (
        collaboratorId: string,
        rating: number | null,
    ) => {
        setCollaboratorEvaluations360(prev => ({
            ...prev,
            [collaboratorId]: {
                ...prev[collaboratorId],
                ratings: {
                    ...prev[collaboratorId]?.ratings,
                    general: rating || 0,
                },
            },
        }));
    };

    const updateCollaboratorField360 = (
        collaboratorId: string,
        field: 'pontosFortes' | 'pontosMelhoria' | 'referencia',
        value: string,
    ) => {
        setCollaboratorEvaluations360(prev => ({
            ...prev,
            [collaboratorId]: {
                ...prev[collaboratorId],
                [field]: value,
            },
        }));
    };

    const addCollaboratorToReference = (collaborator: Collaborator) => {
        setSelectedCollaboratorsReference(prev => [...prev, collaborator]);
        setCollaboratorEvaluationsReference(prev => ({
            ...prev,
            [collaborator.id]: {
                collaboratorId: collaborator.id,
                ratings: {},
                pontosFortes: '',
                pontosMelhoria: '',
                referencia: '',
            },
        }));
    };

    const removeCollaboratorFromReference = (collaboratorId: string) => {
        setSelectedCollaboratorsReference(prev =>
            prev.filter(c => c.id !== collaboratorId),
        );
        setCollaboratorEvaluationsReference(prev => {
            const newEvaluations = { ...prev };
            delete newEvaluations[collaboratorId];
            return newEvaluations;
        });
    };

    const updateCollaboratorFieldReference = (
        collaboratorId: string,
        field: 'pontosFortes' | 'pontosMelhoria' | 'referencia',
        value: string,
    ) => {
        setCollaboratorEvaluationsReference(prev => ({
            ...prev,
            [collaboratorId]: {
                ...prev[collaboratorId],
                [field]: value,
            },
        }));
    };

    const updateEvaluation = (
        criterionId: string,
        evaluation: CriterionEvaluation,
    ) => {
        setEvaluations(prev => ({
            ...prev,
            [criterionId]: evaluation,
        }));
    };

    useEffect(() => {
        const incompleteCriteriaCount = Object.values(
            mockEvaluationPillars,
        ).reduce((total, pillar) => {
            const incompleteInPillar = pillar.criterios.filter(
                (criterion: Criterion) => {
                    const evaluation = evaluations[criterion.id];
                    return !(
                        evaluation?.rating &&
                        evaluation?.justification &&
                        evaluation.justification.trim() !== ''
                    );
                },
            ).length;
            return total + incompleteInPillar;
        }, 0);

        updateNotificationCount('autoavaliacao', incompleteCriteriaCount);

        if (selectedCollaborators360.length === 0) {
            updateNotificationState('avaliacao360', {
                active: true,
                count: undefined,
            });
        } else {
            const incompleteCollaborator360Evaluations =
                selectedCollaborators360.filter(collaborator => {
                    const evaluation =
                        collaboratorEvaluations360[collaborator.id];
                    return !(
                        evaluation?.ratings?.general &&
                        evaluation?.pontosFortes?.trim() &&
                        evaluation?.pontosMelhoria?.trim()
                    );
                }).length;

            if (incompleteCollaborator360Evaluations === 0) {
                updateNotificationCount('avaliacao360', 0);
            } else {
                updateNotificationCount(
                    'avaliacao360',
                    incompleteCollaborator360Evaluations,
                );
            }
        }

        const incompleteReferenceEvaluations =
            selectedCollaboratorsReference.filter(collaborator => {
                const evaluation =
                    collaboratorEvaluationsReference[collaborator.id];
                return !evaluation?.referencia?.trim();
            }).length;

        updateNotificationCount('referencias', incompleteReferenceEvaluations);

        const isMentoringIncomplete = !(
            mentoringRating && mentoringJustification.trim()
        );
        updateNotificationCount('mentoring', isMentoringIncomplete ? 1 : 0);
    }, [
        evaluations,
        selectedCollaborators360,
        collaboratorEvaluations360,
        selectedCollaboratorsReference,
        collaboratorEvaluationsReference,
        mentoringRating,
        mentoringJustification,
        updateNotificationCount,
        updateNotificationState,
    ]);

    const isFormComplete = false;

    return {
        activeSection,
        handleNavClick,
        getNotification,
        isFormComplete,
        formProps: {
            activeSection,
            evaluations,
            searchQuery360,
            setSearchQuery360,
            searchQueryReference,
            setSearchQueryReference,
            selectedCollaborators360,
            collaboratorEvaluations360,
            selectedCollaboratorsReference,
            collaboratorEvaluationsReference,
            mentoringRating,
            mentoringJustification,
            addCollaboratorTo360,
            removeCollaboratorFrom360,
            updateCollaboratorRating360,
            updateCollaboratorField360,
            addCollaboratorToReference,
            removeCollaboratorFromReference,
            updateCollaboratorFieldReference,
            setMentoringRating,
            setMentoringJustification,
            updateEvaluation,
        },
    };
}
