import type { FieldErrors } from 'react-hook-form';

export const getSectionValidationStatus = (errors: FieldErrors) => {
    const mentoringErrors = !!(
        errors.mentoringRating || errors.mentoringJustification
    );

    const selfAssessmentErrors = Object.keys(errors).some(
        key => key.endsWith('_rating') || key.endsWith('_justification'),
    );

    const evaluation360Errors = Object.keys(errors).some(
        key => key.includes('collaborator_') && key.includes('360'),
    );

    const referencesErrors = Object.keys(errors).some(
        key => key.includes('reference_') || key.includes('referencia_'),
    );

    return {
        mentoring: mentoringErrors,
        selfAssessment: selfAssessmentErrors,
        evaluation360: evaluation360Errors,
        references: referencesErrors,
    };
};
