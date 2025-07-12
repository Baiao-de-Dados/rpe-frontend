import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { CommitteeEvaluationForm } from '../../components/Evaluation/CommitteeEvaluationForm';
import { mockCollaborators } from '../../data/mockCollaborators';

export function CommitteeAvaliacao({ collaboratorId }: { collaboratorId: number }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Mock do colaborador selecionado
    const collaborator = mockCollaborators.find(c => c.id === collaboratorId) || {
        id: 0,
        nome: 'Colaborador não encontrado',
        cargo: '',
    };

    // Mock da autoavaliação do colaborador
    const mockSelfAssessment = [
        { pilarId: 1, criterionId: 1, rating: 4, justification: 'Autoavaliação do colaborador para critério 1.' },
        { pilarId: 1, criterionId: 2, rating: 3, justification: 'Autoavaliação do colaborador para critério 2.' },
    ];

    // Mock de avaliações 360
    const evaluations360 = [
        {
            collaratorName: 'João Silva',
            collaboratorPosition: 'Desenvolvedor Senior',
            rating: 4,
            improvements: 'Melhorar comunicação com outros times',
            strengths: 'Excelente conhecimento técnico'
        }
    ];

    // Mock de referências
    const referencesReceived = [
        {
            collaratorName: 'Maria Santos',
            collaboratorPosition: 'Tech Lead',
            justification: 'Colaborador dedicado e comprometido com resultados'
        }
    ];

    // Formulário para dados do comitê
    const methods = useForm({
        defaultValues: {
            committeeEqualization: {
                finalScore: 0,
                comments: '',
                adjustments: [],
            },
        }
    });

    const handleSaveEqualization = methods.handleSubmit(async (data) => {
        setIsSubmitting(true);
        try {
            console.log('Salvando equalização:', data.committeeEqualization);
            alert('Equalização salva com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar equalização:', error);
            alert('Erro ao salvar a equalização.');
        } finally {
            setIsSubmitting(false);
        }
    });

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen bg-[#FAFAFA]">
                <CommitteeEvaluationForm
                    collaborator={collaborator}
                    cycleName="2025.2"
                    collaboratorSelfAssessment={mockSelfAssessment}
                    evaluations360={evaluations360}
                    referencesReceived={referencesReceived}
                    isSubmitting={isSubmitting}
                    onSaveEqualization={handleSaveEqualization}
                />
            </div>
        </FormProvider>
    );
}
