export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // nova funcionalidade
        'fix', // correção de bug
        'docs', // documentação
        'style', // formatação, sem mudança de código
        'refactor', // refatoração
        'test', // testes
        'chore', // tarefas de build, configuração
        'perf', // melhorias de performance
        'ci', // CI/CD
        'revert', // reverter commit
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'], // ← Mudança aqui
  },
}
