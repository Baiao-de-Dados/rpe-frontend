import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import { CommitteeMetrics } from '../../components/Dashboard/CommitteeMetrics';
import CollaboratorEvaluationCard, { type EvaluationField } from '../../components/common/CollaboratorEvaluationCard';
import Typography from '../../components/common/Typography';
import CardContainer from '../../components/common/CardContainer';
import Button from '../../components/common/Button';
import { mockCommitteeData } from '../../data/mockCommitteeData';

export function CommitteeDashboard() {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <DashboardHeader userName={user?.name || 'Comitê'} />

      <main className="p-8 pt-6">
        <div className="mb-6">
          <CommitteeMetrics
            daysToDeadline={mockCommitteeData.daysToDeadline}
            deadlineDate={mockCommitteeData.deadlineDate}
            completionPercentage={mockCommitteeData.completionPercentage}
            pendingEqualizations={mockCommitteeData.pendingEqualizations}
          />
        </div>

        <CardContainer className="w-full max-h-[36rem] flex flex-col min-h-0">
          {/* Cabeçalho da seção */}
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <Typography
              variant="h2"
              color="primary"
              className="font-bold text-lg sm:text-xl"
            >
              Resumo de equalizações
            </Typography>
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                // TODO: Navegar para página completa
              }}
            >
              Ver mais
            </Button>
          </div>

          {/* Lista rolável de equalizações */}
          <div className="flex-1 overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
            <div className="flex flex-col gap-3 sm:gap-4">
              {mockCommitteeData.collaborators.map(collab => {
                const evalData = {
                  autoavaliacao: 4.0,
                  avaliacao360: 4.0,
                  notaGestor: 4.0,
                  notaFinal: collab.status === 'Finalizado' ? 4.5 : undefined,
                  status: collab.status,
                  statusVariant: collab.status === 'Finalizado' ? 'success' as const : 'warning' as const,
                };

                let evaluationFields: EvaluationField[];
                if (isMobile) {
                  evaluationFields = [
                    {
                      label: 'Nota final',
                      value: evalData.notaFinal,
                      bold: true,
                    },
                  ];
                } else {
                  evaluationFields = [
                    { label: 'Autoavaliação', value: evalData.autoavaliacao },
                    { label: 'Avaliação 360', value: evalData.avaliacao360 },
                    { label: 'Nota mentor', value: evalData.notaGestor },
                    { label: 'Nota final', value: evalData.notaFinal, bold: true },
                  ];
                }

                return (
                  <CollaboratorEvaluationCard
                    key={collab.id}
                    collaborator={{
                      nome: collab.name,
                      cargo: collab.department,
                      image: undefined,
                      status: evalData.status,
                      statusVariant: evalData.statusVariant,
                    }}
                    evaluationFields={evaluationFields}
                    onClick={() => console.log('Abrir equalização:', collab.id)}
                    className="shadow-none border border-[#f0f0f0] px-2 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full cursor-pointer hover:shadow-md transition-shadow"
                  />
                );
              })}
            </div>
          </div>
        </CardContainer>
      </main>
    </>
  );
}
