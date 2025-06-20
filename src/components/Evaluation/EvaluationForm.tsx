import { Suspense, lazy } from 'react';
import { SectionLoadingSpinner } from '../SectionLoadingSpinner';
import {
    type Collaborator,
    type CollaboratorEvaluation,
} from '../../data/mockCollaborators';

const MentoringSection = lazy(() =>
    import('./Sections/MentoringSection').then(module => ({
        default: module.MentoringSection,
    })),
);
const ReferencesSection = lazy(() =>
    import('./Sections/ReferencesSection').then(module => ({
        default: module.ReferencesSection,
    })),
);

interface CriterionEvaluation {
    rating?: number;
    justification?: string;
}

interface EvaluationFormProps {
    activeSection: string;
    evaluations: Record<string, CriterionEvaluation>;
    searchQuery360: string;
    setSearchQuery360: (query: string) => void;
    searchQueryReference: string;
    setSearchQueryReference: (query: string) => void;
    selectedCollaborators360: Collaborator[];
    collaboratorEvaluations360: Record<string, CollaboratorEvaluation>;
    selectedCollaboratorsReference: Collaborator[];
    collaboratorEvaluationsReference: Record<string, CollaboratorEvaluation>;
    mentoringRating: number | null;
    mentoringJustification: string;
    addCollaboratorTo360: (collaborator: Collaborator) => void;
    removeCollaboratorFrom360: (collaboratorId: string) => void;
    updateCollaboratorRating360: (
        collaboratorId: string,
        rating: number | null,
    ) => void;
    updateCollaboratorField360: (
        collaboratorId: string,
        field: 'pontosFortes' | 'pontosMelhoria' | 'referencia',
        value: string,
    ) => void;
    addCollaboratorToReference: (collaborator: Collaborator) => void;
    removeCollaboratorFromReference: (collaboratorId: string) => void;
    updateCollaboratorFieldReference: (
        collaboratorId: string,
        field: 'pontosFortes' | 'pontosMelhoria' | 'referencia',
        value: string,
    ) => void;
    setMentoringRating: (rating: number | null) => void;
    setMentoringJustification: (justification: string) => void;
    updateEvaluation: (
        criterionId: string,
        evaluation: CriterionEvaluation,
    ) => void;
}

export function EvaluationForm({
    activeSection,
    searchQueryReference,
    setSearchQueryReference,
    selectedCollaboratorsReference,
    collaboratorEvaluationsReference,
    mentoringRating,
    mentoringJustification,
    addCollaboratorToReference,
    removeCollaboratorFromReference,
    updateCollaboratorFieldReference,
    setMentoringRating,
    setMentoringJustification,
}: EvaluationFormProps) {
    return (
        <>
            {/* <SectionPreloader activeSection={activeSection} />
            {activeSection === 'Autoavaliação' && (
                <Suspense fallback={<SectionLoadingSpinner />}>
                    <SelfAssessmentSection
                        evaluations={evaluations}
                        updateEvaluation={updateEvaluation}
                    />
                </Suspense>
            )}
            {activeSection === 'Avaliação 360' && (
                <Suspense fallback={<SectionLoadingSpinner />}>
                    <Evaluation360Section
                        searchQuery360={searchQuery360}
                        setSearchQuery360={setSearchQuery360}
                        selectedCollaborators360={selectedCollaborators360}
                        collaboratorEvaluations360={collaboratorEvaluations360}
                        addCollaboratorTo360={addCollaboratorTo360}
                        removeCollaboratorFrom360={removeCollaboratorFrom360}
                        updateCollaboratorRating360={
                            updateCollaboratorRating360
                        }
                        updateCollaboratorField360={updateCollaboratorField360}
                    />
                </Suspense>
            )} */}
            {activeSection === 'Mentoring' && (
                <Suspense fallback={<SectionLoadingSpinner />}>
                    <MentoringSection
                        mentoringRating={mentoringRating}
                        mentoringJustification={mentoringJustification}
                        setMentoringRating={setMentoringRating}
                        setMentoringJustification={setMentoringJustification}
                    />
                </Suspense>
            )}
            {activeSection === 'Referências' && (
                <Suspense fallback={<SectionLoadingSpinner />}>
                    <ReferencesSection
                        searchQueryReference={searchQueryReference}
                        setSearchQueryReference={setSearchQueryReference}
                        selectedCollaboratorsReference={
                            selectedCollaboratorsReference
                        }
                        collaboratorEvaluationsReference={
                            collaboratorEvaluationsReference
                        }
                        addCollaboratorToReference={addCollaboratorToReference}
                        removeCollaboratorFromReference={
                            removeCollaboratorFromReference
                        }
                        updateCollaboratorFieldReference={
                            updateCollaboratorFieldReference
                        }
                    />
                </Suspense>
            )}
        </>
    );
}
