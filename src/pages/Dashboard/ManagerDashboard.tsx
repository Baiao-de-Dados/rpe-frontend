// src/pages/Dashboard/ManagerDashboard.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCycle } from '../../hooks/useCycle';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import { CycleBanner } from '../../components/Dashboard/CycleBanner';
import { ManagerMetrics } from '../../components/Dashboard/ManagerMetrics';
import CollaboratorEvaluationCard, { type EvaluationField } from '../../components/common/CollaboratorEvaluationCard';

// Extensão local da interface para suportar styling customizado
interface ExtendedEvaluationField extends EvaluationField {
  customStyle?: 'manager-evaluated';
}
import Typography from '../../components/common/Typography';
import CardContainer from '../../components/common/CardContainer';
import Button from '../../components/common/Button';
import { mockManagerData, type ManagerData } from '../../data/mockManagerData';

export function ManagerDashboard() {
  const { user } = useAuth();
  const { currentCycle } = useCycle();
  const [isMobile, setIsMobile] = useState(false);
  const [managerData] = useState<ManagerData>(mockManagerData);

  // Determina o status do ciclo baseado no currentCycle real
  const cycleStatus = currentCycle?.isActive ? 'open' : 'closed';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Função para determinar o status do colaborador baseado na avaliação do gestor
  const getCollaboratorStatus = (collaborator: ManagerData['managedCollaborators'][0]) => {
    // Status baseado se o gestor já avaliou ou não
    const hasManagerEvaluation = collaborator.managerEvaluation !== undefined && collaborator.managerEvaluation !== null;
    
    if (hasManagerEvaluation) {
      return { status: 'Finalizado', variant: 'success' as const };
    } else {
      return { status: 'Pendente', variant: 'warning' as const };
    }
  };

  // Função para gerar os campos de avaliação com styling especial para nota do gestor
  const getEvaluationFields = (collaborator: ManagerData['managedCollaborators'][0], isMobile: boolean): ExtendedEvaluationField[] => {
    const hasManagerEvaluation = collaborator.managerEvaluation !== undefined && collaborator.managerEvaluation !== null;

    if (isMobile) {
      // No mobile, mostra apenas a nota do gestor ou status
      if (hasManagerEvaluation) {
        return [
          {
            label: 'Nota gestor',
            value: collaborator.managerEvaluation,
            bold: true,
            customStyle: 'manager-evaluated'
          },
        ];
      } else {
        return [
          {
            label: 'Nota gestor',
            value: collaborator.managerEvaluation,
            bold: true,
          },
        ];
      }
    } else {
      // No desktop, mostra: autoavaliação, nota líder, nota gestor
      const fields: ExtendedEvaluationField[] = [
        { 
          label: 'Autoavaliação', 
          value: collaborator.selfEvaluation 
        },
        { 
          label: 'Nota líder', 
          value: collaborator.leaderEvaluation 
        },
      ];

      // Adiciona nota do gestor com estilo especial se já avaliou
      if (hasManagerEvaluation) {
        fields.push({
          label: 'Nota gestor', 
          value: collaborator.managerEvaluation,
          customStyle: 'manager-evaluated'
        });
      } else {
        fields.push({
          label: 'Nota gestor', 
          value: collaborator.managerEvaluation
        });
      }

      return fields;
    }
  };

  return (
    <>
      <DashboardHeader userName={user?.name || 'Gestor'} />

      <main className="p-8 pt-6 space-y-6">
        {/* Banner do ciclo */}
        {currentCycle && (
          <CycleBanner
            cycleName={currentCycle.name}
            status={currentCycle.isActive ? 'open' : 'closed'}
            remainingDays={managerData.daysToDeadline}
            linkTo="/avaliacao"
          />
        )}

        {/* Métricas do gestor */}
        <div className="mb-6">
          <ManagerMetrics
            cycleStatus={cycleStatus}
            totalLeaders={managerData.totalLeaders}
            totalCollaborators={managerData.totalCollaborators}
            completionPercentage={managerData.completionPercentage}
            collaboratorsNotFinished={managerData.collaboratorsNotFinished}
            leadersCompleted={managerData.leadersCompleted}
            collaboratorsNotCompleted={managerData.collaboratorsNotCompleted}
            pendingReviews={managerData.pendingReviews}
          />
        </div>

        {/* Lista de colaboradores geridos */}
        <CardContainer className="w-full max-h-[36rem] flex flex-col min-h-0">
          {/* Cabeçalho da seção */}
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <Typography
              variant="h2"
              color="primary"
              className="font-bold text-lg sm:text-xl"
            >
              Meus colaboradores ({managerData.managedCollaborators.length})
            </Typography>
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                // TODO: Navegar para página completa de colaboradores
              }}
            >
              Ver todos
            </Button>
          </div>

          {/* Lista rolável de colaboradores */}
          <div className="flex-1 overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
            <div className="flex flex-col gap-3 sm:gap-4">
              {managerData.managedCollaborators.map(collaborator => {
                const { status, variant } = getCollaboratorStatus(collaborator);
                const evaluationFields = getEvaluationFields(collaborator, isMobile);

                return (
                  <CollaboratorEvaluationCard
                    key={collaborator.id}
                    collaborator={{
                      nome: collaborator.name,
                      cargo: collaborator.position,
                      image: collaborator.avatar,
                      status: status,
                      statusVariant: variant,
                    }}
                    evaluationFields={evaluationFields}
                    onClick={() => {
                      // TODO: Navegar para avaliação do colaborador
                      console.log('Abrir avaliação do colaborador:', collaborator.id);
                    }}
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
