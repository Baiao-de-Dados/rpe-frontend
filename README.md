# RPE Frontend

Projeto frontend usando React + TypeScript + Vite + Tailwind CSS v4.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- pnpm (package manager)

```bash
# Instalar pnpm globalmente (se não tiver)
npm install -g pnpm
```

### Configuração do Projeto

```bash
# 1. Clonar o repositório
git clone <url-do-repo>
cd rpe-frontend

# 2. Instalar dependências
pnpm install

# 3. Rodar em desenvolvimento pra ver se tá tudo ok
pnpm dev
```

## 📦 Scripts do Dia a Dia

### Desenvolvimento

```bash
pnpm dev           # Rodar projeto (localhost:5173)
pnpm build         # Build de produção
pnpm preview       # Preview do build
```

### Qualidade de Código

```bash
pnpm lint          # 🔍 Verificar problemas no código
pnpm lint:fix      # 🔧 Corrigir problemas automaticamente
pnpm format        # 🎨 Formatar código (raramente necessário)
pnpm type-check    # ✅ Verificar tipos TypeScript
```

## 🛡️ Git Hooks (Husky) - Funcionamento Automático

O projeto tem **verificações automáticas** que rodam quando você faz commit:

### ⚡ Pre-commit (roda automaticamente)

```bash
git commit -m "feat: nova funcionalidade"

# 🤖 Automaticamente executa:
# 1. Verificação de tipos TypeScript
# 2. ESLint nos arquivos modificados
# 3. Prettier formata código automaticamente
```

### 📝 Validação de Mensagem de Commit

```bash
# ✅ FORMATO CORRETO:
git commit -m "feat: adiciona botão de login"
git commit -m "fix: corrige bug na navegação"
git commit -m "docs: atualiza README"
git commit -m "chore: configura husky"

# ❌ FORMATO INCORRETO (vai dar erro):
git commit -m "adiciona botão"           # sem tipo
git commit -m "ADD: novo botão"          # tipo inválido
git commit -m "feat adiciona botão"      # sem ":"
```

### 🎯 Tipos de Commit Válidos

| Tipo       | Descrição            | Exemplo                                   |
| ---------- | -------------------- | ----------------------------------------- |
| `feat`     | Nova funcionalidade  | `feat: adiciona dark mode`                |
| `fix`      | Correção de bug      | `fix: corrige contador que não resetava`  |
| `docs`     | Documentação         | `docs: atualiza instruções de instalação` |
| `style`    | Formatação de código | `style: corrige indentação`               |
| `refactor` | Refatoração          | `refactor: melhora estrutura do Header`   |
| `test`     | Testes               | `test: adiciona testes para Counter`      |
| `chore`    | Manutenção/config    | `chore: atualiza dependências`            |
| `perf`     | Performance          | `perf: otimiza carregamento de imagens`   |
| `ci`       | CI/CD                | `ci: configura GitHub Actions`            |

## 🚨 Resolvendo Problemas Comuns

### Commit foi rejeitado - Erro de tipo:

```bash
# ❌ Erro: "type may not be empty"
git commit -m "feat: adiciona nova funcionalidade"  # ✅ Correto
```

### Commit foi rejeitado - Erro de lint:

```bash
# 1. Ver os problemas:
pnpm lint

# 2. Corrigir automaticamente:
pnpm lint:fix

# 3. Adicionar correções e tentar novamente:
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

### Commit foi rejeitado - Erro de tipos:

```bash
# 1. Ver os erros de tipo:
pnpm type-check

# 2. Corrigir os tipos no código
# 3. Tentar commit novamente
```

### Código não está formatado:

```bash
# O Prettier roda automaticamente no commit, mas se quiser formatar manualmente:
pnpm format
```

## 💡 Dicas Para a Equipe

### ✅ Boas Práticas

- Use `pnpm dev` para desenvolvimento
- Faça commits pequenos e frequentes
- Use os tipos de commit corretos
- Não se preocupe com formatação - é automática!

### ⚠️ O que NÃO fazer

- Não commite com `--no-verify` (pula as verificações)
- Não edite os arquivos `.husky/*` sem avisar
- Não rode `npm install` - use `pnpm install`

### 🔧 Se algo der errado

1. **Sempre rode:** `pnpm lint:fix` antes de commitar
2. **Verificação manual:** `pnpm type-check` para ver erros de tipo
3. **Reset das configurações:** delete `node_modules` e rode `pnpm install`

## 📱 Comandos de Emergência

```bash
# Se o Husky não estiver funcionando:
pnpm exec husky install

# Se quiser commitar sem verificações (use com cuidado!):
git commit -m "fix: emergência" --no-verify

# Se quiser formatar todo o projeto:
pnpm format
```

---
