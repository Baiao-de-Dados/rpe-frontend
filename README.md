# RPE Frontend

Projeto frontend usando React + TypeScript + Vite + Tailwind CSS v4.

## 🚀 Como começar

### Pré-requisitos

- Node.js 18+
- pnpm (package manager)

```bash
# Instalar pnpm globalmente (se não tiver)
npm install -g pnpm
```

### Instalação

```bash
# Clonar o repositório
git clone <url-do-repo>
cd rpe-frontend

# Instalar dependências (Husky se configura automaticamente)
pnpm install

# Rodar em desenvolvimento
pnpm dev
```

## 📦 Scripts disponíveis

```bash
pnpm dev           # Rodar em desenvolvimento
pnpm build         # Build de produção
pnpm preview       # Preview do build
pnpm lint          # Verificar problemas no código
pnpm lint:fix      # Corrigir problemas automaticamente
pnpm format        # Formatar código com Prettier
pnpm format:check  # Verificar formatação
pnpm type-check    # Verificar tipos TypeScript
```

## 🔧 Ferramentas configuradas

### Git Hooks (Husky)

**Configuração automática** - não precisa fazer nada extra!

**Pre-commit:**

- ✅ Verificação de tipos TypeScript
- 🎨 Formatação automática com Prettier
- 🔍 Lint com ESLint (apenas arquivos modificados)

**Commit-msg:**

- 📝 Validação do formato da mensagem de commit

### Formato de Commits

```
feat: adiciona nova funcionalidade
fix: corrige bug na navegação
docs: atualiza documentação
style: formata código
refactor: refatora componente Header
test: adiciona testes para Counter
chore: atualiza dependências
```

## 🛠️ Stack

- **React 19** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS v4** - Framework CSS utility-first
- **ESLint** - Linter
- **Prettier** - Formatador de código
- **Husky** - Git hooks
- **pnpm** - Package manager

---

**Importante:** O Husky se configura automaticamente quando você roda `pnpm install`, então não precisa de configuração extra! 🎉

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
