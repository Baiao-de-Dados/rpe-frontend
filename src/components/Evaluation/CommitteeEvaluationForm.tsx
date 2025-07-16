import { memo } from 'react';

import type { Collaborator } from '../../types/collaborator';
import type { CommitteeAiSummary } from '../../types/committee';

import CommitteeEvaluationHeader from './CommitteeEvaluationHeader';

import { useSectionNavigation } from '../../hooks/useSectionNavigation';

import { CommitteeSectionRenderer } from './SectionsCommittee/CommitteeSectionRenderer';
import { committeeEvaluationSections, type CommitteeSectionType } from './SectionsCommittee/CommitteeEvaluationSections';


interface CommitteeEvaluationFormProps {
    collaborator: Collaborator;
    cycleName: string;
    collaboratorSelfAssessment?: Array<{
        pilarId: number;
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>;
    evaluations360?: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        rating: number;
        improvements: string;
        strengths: string;
    }>;
    referencesReceived?: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        justification: string;
    }>;
    isSubmitting?: boolean;
    onSaveEqualization?: () => void;
    // Novos dados para equalização
    autoEvaluation?: {
        score: number;
        criteria: Array<{
            pilarId: number;
            criterionId: number;
            rating: number;
            justification: string;
        }>;
    } | null;
    managerEvaluation?: {
        score: number;
        criteria: Array<{
            pilarId: number;
            criterionId: number;
            rating: number;
            justification: string;
        }>;
    } | null;
    committeeEqualization?: {
        finalScore: number;
        comments: string;
        committee: {
            id: number;
            name: string;
            position: string;
        };
        lastUpdated: string;
        aiSummary?: {
            code: string;
            rating?: number;
            detailedAnalysis?: string;
            summary?: string;
            discrepancies?: string;
        };
    } | null;
    // ✅ NOVO: Prop para controlar estado de edição
    isReadOnly?: boolean;
    // ✅ NOVO: Props para geração de resumo da IA
    onGenerateAiSummary?: () => void;
    hasAiSummary?: boolean;
    // ✅ NOVO: Dados do resumo da IA
    aiSummary?: CommitteeAiSummary;
    // ✅ NOVO: Props para exportar relatório
    onExportReport?: () => void;
}

export const CommitteeEvaluationForm = memo(({
    collaborator,
    cycleName,
    collaboratorSelfAssessment,
    evaluations360,
    referencesReceived,
    onSaveEqualization,
    autoEvaluation,
    managerEvaluation,
    committeeEqualization,
    isReadOnly,
    onGenerateAiSummary,
    hasAiSummary,
    aiSummary,
    onExportReport
}: CommitteeEvaluationFormProps) => {
    const { activeSection, navigateToSection, sections } =
        useSectionNavigation<CommitteeSectionType>([...committeeEvaluationSections]);

    return (
        <>
            <CommitteeEvaluationHeader
                activeSection={activeSection}
                onSectionChange={navigateToSection}
                sections={sections}
                collaborator={collaborator}
                cycleName={cycleName}
            />
            <main className="p-8 pt-6">
                <CommitteeSectionRenderer 
                    activeSection={activeSection}
                    collaborator={collaborator}
                    collaboratorSelfAssessment={collaboratorSelfAssessment}
                    evaluations360={evaluations360}
                    referencesReceived={referencesReceived}
                    cycleName={cycleName}
                    autoEvaluation={autoEvaluation}
                    managerEvaluation={managerEvaluation}
                    committeeEqualization={committeeEqualization}
                    onSaveEqualization={onSaveEqualization}
                    isReadOnly={isReadOnly}
                    onGenerateAiSummary={onGenerateAiSummary}
                    hasAiSummary={hasAiSummary}
                    aiSummary={aiSummary}
                    onExportReport={onExportReport}
                />
            </main>
        </>
    );
});
