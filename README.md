# RPE Frontend

Sistema de avaliação de performance da Rocket Corp.

## Integrações de API Implementadas

### Manager API

#### Endpoints Implementados:

- `GET /manager/leaders-and-collaborators` - Lista líderes e colaboradores
- `POST /manager/assign-leader-evaluation` - Atribui líder para avaliar colaborador
- `GET /manager/dashboard/total-leaders` - Total de líderes
- `GET /manager/dashboard/evaluation-percentage` - Percentual de avaliações
- `GET /manager/dashboard/missing-evaluations` - Avaliações faltantes
- `GET /manager/dashboard/leaders/evaluation-percentage` - Percentual de avaliações de líderes
- `GET /manager/dashboard/collaborators/without-leader` - Colaboradores sem líder
- `GET /manager/collaborators/evaluations-summary` - Resumo de avaliações dos colaboradores
- `GET /manager/collaborators-evaluations-details` - Detalhes das avaliações
- `GET /manager/auto-evaluation/:userId` - Autoavaliação do usuário
- `POST /manager/evaluate` - Avaliação do manager (formato corrigido)

#### Endpoints de Avaliações dos Colaboradores (rotas existentes do employer):

- `GET /employer/evaluation-result` - Avaliação completa do colaborador (autoavaliação, 360°, mentoring, referências)
- `GET /employer/all-evaluations` - Histórico de todas as avaliações do colaborador

#### Hooks Implementados:

- `useLeadersAndCollaborators()` - Busca líderes e colaboradores
- `useAssignLeaderEvaluation()` - Atribui líder para avaliação
- `useTotalLeaders()` - Total de líderes
- `useEvaluationPercentage()` - Percentual de avaliações
- `useMissingEvaluations()` - Avaliações faltantes
- `useLeaderEvaluationPercentage()` - Percentual de avaliações de líderes
- `useCollaboratorsWithoutLeader()` - Colaboradores sem líder
- `useCollaboratorsEvaluationsSummary()` - Resumo de avaliações
- `useCollaboratorsEvaluationsDetails()` - Detalhes das avaliações
- `useUserAutoEvaluation(userId)` - Autoavaliação do usuário
- `useManagerEvaluation()` - Mutation para avaliação do manager
- `useTrackCriteria()` - Critérios da trilha
- `useCollaboratorEvaluationResult(cycleId, collaboratorId)` - Avaliação completa do colaborador
- `useCollaboratorAllEvaluations(collaboratorId)` - Histórico de avaliações do colaborador

#### Componentes Atualizados:

- `ManagerDashboard` - Usa dados reais da API e permite navegação para avaliação
- `ManagerAvaliacao` - Integração completa com API de avaliação do colaborador
- `ManagerEvaluationForm` - Usa critérios reais da trilha
- `ManagerSelfAssessmentSection` - Usa critérios dinâmicos
- `CollaboratorHistorySection` - Exibe histórico real de avaliações

## Funcionalidades Implementadas

### ✅ **Dashboard do Manager**

- Métricas reais de líderes, colaboradores e avaliações
- Navegação direta para avaliação do colaborador
- Cards clicáveis com dados reais da API

### ✅ **Avaliação de Colaboradores**

- Formulário completo com critérios da trilha do colaborador
- Visualização das autoavaliações do colaborador (read-only)
- Visualização das avaliações 360° recebidas
- Visualização das referências recebidas
- Visualização do mentoring
- Histórico completo de avaliações do colaborador

### ✅ **Integração com Rotas Existentes**

- Usa as rotas `/employer/evaluation-result` e `/employer/all-evaluations`
- Converte dados da API para o formato esperado pelo frontend
- Mantém compatibilidade com a estrutura existente

### ✅ **Formato Correto do Payload**

- Corrigido para usar o formato real do backend
- Inclui `trackId` obrigatório
- Remove `justification` do payload (mantida apenas para UX)
- Usa `criteria` em vez de `criterias`

## Próximos Passos

### Backend (NestJS)

1. **Verificar compatibilidade dos DTOs**:

    - `ManagerEvaluationDto` deve corresponder ao schema do frontend
    - Adicionar campos para track/criteria se necessário

2. **Novos endpoints necessários**:

    ```typescript
    GET /manager/collaborator/:id          // Dados completos do colaborador
    GET /manager/collaborator/:id/track    // Trilha do colaborador
    GET /manager/collaborator/:id/360      // Avaliações 360°
    GET /manager/collaborator/:id/references // Referências
    ```

3. **Melhorias no Service**:
    - Implementar busca de dados do colaborador (nome, email, posição)
    - Adicionar validações de permissão
    - Implementar cache para otimização

### Frontend

1. **Melhorias na integração**:

    - Implementar busca de dados completos do colaborador
    - Adicionar loading states adequados
    - Implementar error handling robusto

2. **Novos componentes**:

    - `CollaboratorDetailsCard` - Exibir dados completos
    - `TrackCriteriaSelector` - Seleção de critérios
    - `EvaluationProgressTracker` - Acompanhar progresso

3. **Otimizações**:
    - Implementar cache local para dados estáticos
    - Adicionar paginação para listas grandes
    - Implementar busca e filtros avançados

## Como Testar

1. **Backend**:

    ```bash
    # Verificar se os endpoints estão funcionando
    curl -H "Authorization: Bearer <token>" http://localhost:3002/manager/leaders-and-collaborators
    curl -H "Authorization: Bearer <token>" http://localhost:3002/employer/evaluation-result?cycleConfigId=1&userId=3
    ```

2. **Frontend**:

    ```bash
    # Iniciar em modo desenvolvimento
    npm run dev
    ```

3. **Testes de Integração**:
    - Login como manager
    - Acessar dashboard do manager
    - Clicar em um colaborador para ver sua avaliação
    - Verificar se os dados são carregados da API
    - Testar avaliação de colaborador

## Estrutura de Dados

### Manager Evaluation Payload (Formato Correto)

```typescript
{
    managerId: number;
    collaboratorId: number;
    cycleId: number;
    trackId: number;
    criteria: Array<{
        criterionId: number;
        score: number;
    }>;
}
```

### Collaborator Evaluation Result

```typescript
{
    id: number;
    cycleConfigId: number;
    userId: number;
    user: {
        id: number;
        name: string;
        track: string;
    }
    autoEvaluation: {
        pilares: Array<{
            pilarId: number;
            criterios: Array<{
                criterioId: number;
                nota: number;
                justificativa: string;
            }>;
        }>;
    }
    evaluation360: Array<{
        avaliadoId: number;
        pontosFortes: string;
        pontosMelhoria: string;
        score: number;
    }>;
    mentoring: {
        mentorId: number;
        justificativa: string;
        score: number;
    }
    reference: Array<{
        colaboradorId: number;
        justificativa: string;
    }>;
}
```

### Collaborator All Evaluations

```typescript
Array<{
    cycle: {
        id: number;
        name: string;
        startDate: string;
        endDate: string;
    };
    autoEvaluation: number;
    evaluation360: number;
    manager: number | null;
    committee: number | null;
}>;
```
