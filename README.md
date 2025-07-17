# 🚀 RPE Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material-UI" />
</p>

Interface web moderna do **Sistema de Avaliação de Performance** (RPE) da RocketCorp. Uma aplicação React robusta e responsiva que oferece uma experiência completa para gestão de ciclos de avaliação, feedback 360° e relatórios de performance.

## 📋 Índice

- [🎯 Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Instalação e Configuração](#-instalação-e-configuração)
- [⚙️ Configuração](#️-configuração)
- [🔐 Autenticação](#-autenticação)
- [📱 Responsividade](#-responsividade)
- [🎨 Design System](#-design-system)
- [📋 Scripts Disponíveis](#-scripts-disponíveis)
- [🧪 Qualidade de Código](#-qualidade-de-código)

## 🎯 Funcionalidades

### 👨‍💼 Dashboard Gerencial

- **Métricas em tempo real** de avaliações e colaboradores
- **Visão consolidada** de progresso por equipe
- **Navegação intuitiva** para avaliações pendentes
- **Gráficos interativos** com Chart.js

### 📊 Sistema de Avaliações

- **Autoavaliação**: Interface para colaboradores avaliarem performance própria
- **Avaliação 360°**: Coleta de feedback multidirecional
- **Avaliação Gerencial**: Ferramentas para gestores avaliarem colaboradores
- **Histórico completo**: Visualização de avaliações anteriores

### 🔄 Gestão de Ciclos

- **Configuração flexível** de períodos de avaliação
- **Controle de prazos** com notificações visuais
- **Status tracking** em tempo real
- **Extensão de ciclos** com justificativas

### 👥 Gestão de Colaboradores

- **Filtros avançados** para busca de colaboradores
- **Atribuição dinâmica** de líderes para avaliação
- **Visualização de trilhas** de desenvolvimento
- **Importação em massa** de dados

### 📈 Analytics e Relatórios

- **Gráficos de performance** interativos
- **Comparação entre ciclos** históricos
- **Exportação de dados** para análise
- **Métricas de engajamento** da equipe

### 🔍 Auditoria

- **Log detalhado** de todas as ações
- **Rastreamento de mudanças** em avaliações
- **Histórico de acessos** e modificações

## 🛠️ Tecnologias

### Core Framework

- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Vite](https://vitejs.dev/)** - Build tool e dev server moderno

### Estilização & UI

- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Material-UI](https://mui.com/)** - Componentes React prontos
- **[Framer Motion](https://www.framer.com/motion/)** - Biblioteca de animações
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

### Gerenciamento de Estado

- **[React Query](https://tanstack.com/query)** - State management para server state
- **[React Context](https://react.dev/reference/react/useContext)** - Estado global da aplicação

### Formulários & Validação

- **[React Hook Form](https://react-hook-form.com/)** - Formulários performáticos
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integração RHF + Zod

### Roteamento & Navegação

- **[React Router](https://reactrouter.com/)** - Roteamento declarativo
- **[nuqs](https://nuqs.47ng.com/)** - URL state management

### Visualização de Dados

- **[Chart.js](https://www.chartjs.org/)** - Gráficos interativos
- **[React Chart.js 2](https://react-chartjs-2.js.org/)** - Wrapper React para Chart.js

### Utilitários

- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[date-fns](https://date-fns.org/)** - Manipulação de datas
- **[clsx](https://github.com/lukeed/clsx)** - Utility para classes condicionais
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge de classes Tailwind

### DevOps & Qualidade

- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Lint em arquivos staged

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── common/         # Componentes base (buttons, inputs, etc.)
│   ├── Charts/         # Componentes de gráficos
│   ├── Dashboard/      # Componentes do dashboard
│   ├── Evaluation/     # Componentes de avaliação
│   ├── Lideranca/      # Componentes de liderança
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── Dashboard/      # Página principal
│   ├── Avaliacao/      # Páginas de avaliação
│   ├── Colaboradores/  # Gestão de colaboradores
│   ├── Configuracoes/  # Configurações do sistema
│   └── ...
├── hooks/              # Custom hooks
│   ├── api/            # Hooks para integração com API
│   ├── useAuth.ts      # Hook de autenticação
│   ├── useCycle.ts     # Hook de ciclos
│   └── ...
├── services/           # Serviços e integração com API
│   └── api/            # Configuração e endpoints da API
├── contexts/           # Contextos React
│   ├── AuthContext.tsx # Contexto de autenticação
│   ├── CycleContext.tsx# Contexto de ciclos
│   └── ...
├── types/              # Definições TypeScript
│   ├── auth.ts         # Tipos de autenticação
│   ├── collaborator.ts # Tipos de colaborador
│   ├── evaluations.ts  # Tipos de avaliações
│   └── ...
├── schemas/            # Schemas de validação Zod
│   ├── evaluation.ts   # Schema de avaliações
│   ├── startCycleSchema.ts # Schema de ciclos
│   └── ...
├── utils/              # Funções utilitárias
├── layouts/            # Layouts da aplicação
├── router/             # Configuração de rotas
└── data/               # Dados mock para desenvolvimento
```

## � Instalação e Configuração

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **pnpm** (gerenciador de pacotes recomendado)
- **RPE Backend** rodando

### 1. Clone o repositório

```bash
git clone <repository-url>
cd rpe-frontend
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

### 4. Inicie a aplicação

```bash
# Modo desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview do build
pnpm preview
```

A aplicação estará disponível em `http://localhost:5173`

## ⚙️ Configuração

### Configuração da API

O frontend está configurado para integrar com a API REST do RPE Backend:

```typescript
// Principais endpoints integrados:
- Authentication: /auth/*
- Manager: /manager/*
- Employer: /employer/*
- Cycles: /cycles/*
- Users: /users/*
```

## 🔐 Autenticação

### Sistema de Autenticação

- **JWT Tokens** com refresh automático
- **Roles hierárquicos**: Admin, Manager, Leader, Employer
- **Rotas protegidas** com middleware de autenticação
- **Sessão persistente** com localStorage

### Fluxo de Autenticação

1. Login via formulário
2. Recebimento e armazenamento do JWT
3. Interceptação automática de requests
4. Refresh token automático
5. Logout com limpeza de dados

### Controle de Acesso

```typescript
// Roles disponíveis
enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  LEADER = 'LEADER',
  EMPLOYER = 'EMPLOYER'
}

// Rotas protegidas por role
<ProtectedRoute roles={[Role.MANAGER, Role.ADMIN]}>
  <ManagerDashboard />
</ProtectedRoute>
```

## 📱 Responsividade

### Breakpoints Tailwind

- **mobile**: 320px+ (padrão)
- **sm**: 640px+ (smartphones grandes)
- **md**: 768px+ (tablets)
- **lg**: 1024px+ (desktop)
- **xl**: 1280px+ (desktop large)
- **2xl**: 1536px+ (telas muito grandes)

### Abordagem Mobile-First

```typescript
// Exemplo de componente responsivo
<div className="
  grid grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-4
">
```

### Componentes Adaptáveis

- **Navegação**: Menu hambúrguer em mobile, sidebar em desktop
- **Tabelas**: Scroll horizontal em mobile, completas em desktop
- **Modais**: Fullscreen em mobile, centralizados em desktop
- **Charts**: Redimensionamento automático

## 🎨 Design System

### Paleta de Cores

```css
/* Cores principais */
--primary: #3b82f6 /* Blue-500 */ --secondary: #6b7280 /* Gray-500 */ --success: #10b981 /* Emerald-500 */ --warning: #f59e0b /* Amber-500 */ --error: #ef4444 /* Red-500 */;
```

### Componentes Base

- **Buttons**: Variações de size, color e variant
- **Inputs**: Validação visual e estados
- **Cards**: Elevation e hover effects
- **Tables**: Sorting, filtering e pagination
- **Modals**: Overlay e animações

### Temas

- **Light Mode**: Tema padrão claro
- **Dark Mode**: Em desenvolvimento
- **High Contrast**: Para acessibilidade

## � Scripts Disponíveis

### Desenvolvimento

```bash
pnpm dev              # Servidor de desenvolvimento
pnpm build            # Build para produção
pnpm preview          # Preview do build
```

### Qualidade de Código

```bash
pnpm lint             # Verifica problemas no código
pnpm lint:fix         # Corrige problemas automaticamente
pnpm format           # Formata código com Prettier
pnpm format:check     # Verifica formatação
pnpm type-check       # Verifica tipos TypeScript
```

### Utilitários

```bash
pnpm prepare          # Configura Husky hooks
```

## 🧪 Qualidade de Código

### Linting e Formatação

- **ESLint** configurado para React e TypeScript
- **Prettier** para formatação consistente
- **Husky** para git hooks automáticos
- **lint-staged** para verificação em commits

### Padrões de Código

```typescript
// Exemplo de estrutura de componente
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export const Component: React.FC<ComponentProps> = ({
  title,
  onAction
}) => {
  return (
    <div className="flex items-center justify-between p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Action
        </button>
      )}
    </div>
  );
};
```

### TypeScript Strict Mode

- **Strict type checking** habilitado
- **Interfaces explícitas** para props e dados
- **Type guards** para runtime safety
- **Utility types** para transformações

### Performance

- **Code splitting** automático por rota
- **Lazy loading** de componentes pesados
- **Memoização** com React.memo e useMemo
- **Otimização de re-renders** com useCallback

## 🚀 Deploy

### Build para Produção

```bash
pnpm build
```

### Deploy na Vercel

O projeto está configurado para deploy automático na Vercel através do `vercel.json`:

```json
{
    "buildCommand": "pnpm build",
    "outputDirectory": "dist",
    "framework": "vite"
}
```

### Variáveis de Ambiente em Produção

Configure as variáveis de ambiente no painel da Vercel:

- `VITE_API_BASE_URL`
- `VITE_APP_ENV=production`
- Outras variáveis conforme necessário

---

<p align="center">
  Desenvolvido com ❤️ para a <strong>RocketCorp</strong>
</p>
