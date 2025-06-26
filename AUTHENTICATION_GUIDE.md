# 🔐 Guia Prático de Autenticação - Tutorial para Devs

## 🎯 **O que você precisa saber:**

Nosso sistema é **simples**: tudo é baseado em **roles**. Cada usuário tem um ou mais roles, e você controla o que ele vê/acessa baseado nisso.

## 👥 **Roles do Sistema:**

```typescript
EMPLOYER  = Colaborador (só faz avaliação)
MENTOR    = Mentor
LEADER    = Líder de equipe
MANAGER   = Gestor
RH        = Recursos Humanos (critérios + importar)
COMMITTEE = Comitê de avaliação
ADMIN     = Administrador (vê tudo)
DEVELOPER = Dev (acesso técnico)
```

## 🚀 **Como usar na prática:**

### **1. Hook useAuth (para verificar no código)**

```tsx
import { useAuth } from '../hooks/useAuth';

function MeuComponente() {
    const { hasRole, hasAnyRole, user } = useAuth();

    // ✅ Verificar role específico
    if (hasRole(UserRoleEnum.RH)) {
        // Só RH vê isso
    }

    // ✅ Verificar múltiplos roles
    if (hasAnyRole([UserRoleEnum.ADMIN, UserRoleEnum.RH])) {
        // ADMIN OU RH veem isso
    }

    return (
        <div>
            <h1>Olá, {user?.name}!</h1>
            {hasRole(UserRoleEnum.ADMIN) && <AdminButton />}
        </div>
    );
}
```

### **2. RoleGuard (para esconder/mostrar componentes)**

```tsx
import { RoleGuard } from '../components/common/RoleGuard';

function Dashboard() {
    return (
        <div>
            {/* ✅ Só RH vê */}
            <RoleGuard role={UserRoleEnum.RH}>
                <Button>Importar Histórico</Button>
            </RoleGuard>

            {/* ✅ ADMIN OU RH veem */}
            <RoleGuard anyRole={[UserRoleEnum.ADMIN, UserRoleEnum.RH]}>
                <CriteriosPanel />
            </RoleGuard>

            {/* ✅ Só colaboradores veem */}
            <RoleGuard role={UserRoleEnum.EMPLOYER}>
                <AvaliacaoButton />
            </RoleGuard>
        </div>
    );
}
```

### **3. Proteção de Rotas (no router)**

```tsx
// src/router/index.tsx
<Route
    path="avaliacao"
    element={
        <RoleRoute requiredRoles={[UserRoleEnum.EMPLOYER]}>
            <AvaliacaoPage />
        </RoleRoute>
    }
/>

<Route
    path="criterios"
    element={
        <RoleRoute requiredRoles={[UserRoleEnum.RH, UserRoleEnum.ADMIN]}>
            <CriteriosPage />
        </RoleRoute>
    }
/>
```

## � **Casos Práticos Comuns:**

### **Caso 1: Dashboard com conteúdo diferente por role**

```tsx
function Dashboard() {
    const { hasRole, hasAnyRole } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>

            {/* Colaborador vê suas métricas */}
            <RoleGuard role={UserRoleEnum.EMPLOYER}>
                <MinhasAvaliacoes />
                <MeuProgresso />
            </RoleGuard>

            {/* RH vê métricas gerais */}
            <RoleGuard role={UserRoleEnum.RH}>
                <RelatoriosGerais />
                <ImportarDados />
            </RoleGuard>

            {/* Gestores veem time */}
            <RoleGuard anyRole={[UserRoleEnum.MANAGER, UserRoleEnum.LEADER]}>
                <MetricasDoTime />
                <EquipeStatus />
            </RoleGuard>

            {/* Admin vê tudo */}
            <RoleGuard role={UserRoleEnum.ADMIN}>
                <PainelCompleto />
                <ConfiguracoesGerais />
            </RoleGuard>
        </div>
    );
}
```

### **Caso 2: Botões condicionais**

```tsx
function EmployeeCard({ employee }) {
    const { hasAnyRole } = useAuth();

    return (
        <div className="card">
            <h3>{employee.name}</h3>

            {/* Só gestores podem editar */}
            <RoleGuard
                anyRole={[
                    UserRoleEnum.MANAGER,
                    UserRoleEnum.RH,
                    UserRoleEnum.ADMIN,
                ]}
            >
                <Button onClick={() => editEmployee(employee)}>Editar</Button>
            </RoleGuard>

            {/* Só RH pode demitir */}
            <RoleGuard anyRole={[UserRoleEnum.RH, UserRoleEnum.ADMIN]}>
                <Button variant="danger">Remover</Button>
            </RoleGuard>
        </div>
    );
}
```

### **Caso 3: Sidebar dinâmico**

```tsx
function Sidebar() {
    return (
        <nav>
            {/* Todos veem Dashboard */}
            <NavItem to="/dashboard">Dashboard</NavItem>

            {/* Só colaboradores avaliam */}
            <RoleGuard role={UserRoleEnum.EMPLOYER}>
                <NavItem to="/avaliacao">Avaliação</NavItem>
            </RoleGuard>

            {/* Gestores veem evolução */}
            <RoleGuard
                anyRole={[
                    UserRoleEnum.MANAGER,
                    UserRoleEnum.COMMITTEE,
                    UserRoleEnum.ADMIN,
                ]}
            >
                <NavItem to="/evolucao">Evolução</NavItem>
            </RoleGuard>

            {/* RH tem área específica */}
            <RoleGuard anyRole={[UserRoleEnum.RH, UserRoleEnum.ADMIN]}>
                <NavItem to="/criterios">Critérios</NavItem>
                <NavItem to="/importar">Importar</NavItem>
            </RoleGuard>
        </nav>
    );
}
```

## 🎨 **Qual método usar quando:**

### **Use `hasRole()` quando:**

- ✅ Funcionalidade é exclusiva de **UM** role
- ✅ "Só admin pode fazer X"
- ✅ "Só RH acessa Y"

```tsx
{
    hasRole(UserRoleEnum.ADMIN) && <AdminPanel />;
}
```

### **Use `hasAnyRole()` quando:**

- ✅ Funcionalidade é para **MÚLTIPLOS** roles específicos
- ✅ "Admin OU RH podem fazer X"
- ✅ "Manager OU Leader veem Y"

```tsx
{
    hasAnyRole([UserRoleEnum.ADMIN, UserRoleEnum.RH]) && <ImportButton />;
}
```

### **Use `RoleGuard` quando:**

- ✅ Quer **esconder/mostrar** componentes
- ✅ Tem **JSX condicional**
- ✅ Quer **fallback** quando não tem acesso

```tsx
<RoleGuard role={UserRoleEnum.RH} fallback={<AccessDenied />}>
    <RHPanel />
</RoleGuard>
```

### **Use `RoleRoute` quando:**

- ✅ Quer **proteger páginas inteiras**
- ✅ Usuário **não deve** acessar a URL
- ✅ Quer **redirecionamento** automático

```tsx
<RoleRoute requiredRoles={[UserRoleEnum.ADMIN]}>
    <AdminPage />
</RoleRoute>
```

## ⚠️ **O que NÃO fazer:**

```tsx
// ❌ NUNCA confie no localStorage
const roles = JSON.parse(localStorage.getItem('user'))?.roles;

// ❌ NUNCA faça checagem direta
if (roles.includes('ADMIN')) {
    // Usuário pode hackear isso!
}

// ✅ SEMPRE use o contexto
const { hasRole } = useAuth();
if (hasRole(UserRoleEnum.ADMIN)) {
    // Isso é seguro!
}
```

## 🧪 **Como testar:**

1. **Abra o DevTools > Application > Local Storage**
2. **Copie o token JWT**
3. **Cole em [jwt.io](https://jwt.io) para ver os roles**
4. **Teste com diferentes usuários**

## 📋 **Checklist rápido:**

- [ ] Sempre use `useAuth()` para verificações
- [ ] Use `RoleGuard` para componentes condicionais
- [ ] Use `RoleRoute` para proteger páginas
- [ ] Nunca confie no localStorage
- [ ] Teste com diferentes roles

## 🎯 **Exemplo Completo - Página de Colaboradores:**

```tsx
import { useAuth } from '../hooks/useAuth';
import { RoleGuard } from '../components/common/RoleGuard';

function ColaboradoresPage() {
    const { hasAnyRole } = useAuth();

    return (
        <div>
            <h1>Colaboradores</h1>

            {/* Lista que todos podem ver */}
            <EmployeeList />

            {/* Só gestores podem adicionar */}
            <RoleGuard
                anyRole={[
                    UserRoleEnum.MANAGER,
                    UserRoleEnum.RH,
                    UserRoleEnum.ADMIN,
                ]}
            >
                <Button>Adicionar Colaborador</Button>
            </RoleGuard>

            {/* Só RH vê relatórios */}
            <RoleGuard anyRole={[UserRoleEnum.RH, UserRoleEnum.ADMIN]}>
                <RelatoriosSection />
            </RoleGuard>

            {/* Verificação no código */}
            {hasAnyRole([UserRoleEnum.LEADER, UserRoleEnum.MANAGER]) && (
                <TeamMetrics />
            )}
        </div>
    );
}
```
