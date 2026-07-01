# Tasks — Lista de Tarefas com Testes

Aplicação de lista de tarefas em Next.js 15 com TypeScript, demonstrando testes unitários com Jest e Testing Library.

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 15.3.3 | Framework (App Router) |
| TypeScript | 5 | Tipagem estática |
| Jest | 29 | Test runner |
| @testing-library/react | 16 | Testes de componentes |
| @testing-library/user-event | 14 | Simulação de interações |
| @testing-library/jest-dom | 6 | Matchers customizados |

## Estrutura

```
src/
├── app/
│   ├── layout.tsx               ← Root layout
│   ├── page.tsx                 ← Server Component (await getTarefas)
│   ├── page.module.css
│   └── globals.css
├── components/
│   ├── NovaTarefa.tsx           ← Client Component: formulário controlado
│   ├── NovaTarefa.module.css
│   ├── ListaDeTarefas.tsx       ← Client Component: lista + hook
│   └── ListaDeTarefas.module.css
├── hooks/
│   └── useContadorDeTarefas.ts  ← Hook customizado com useMemo
├── data/
│   └── tarefas.ts               ← Dados simulados com Promise.resolve()
└── __tests__/
    ├── NovaTarefa.test.tsx       ← 15 testes: render, input, submit, validação
    ├── useContadorDeTarefas.test.ts ← 13 testes: valores, vazia, rerenderização
    ├── ListaDeTarefas.test.tsx   ← 10 testes: integração completa
    └── page.test.tsx             ← 5 testes: jest.mock, renderização com dados
```

## Instalação e execução

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev
# → http://localhost:3000

# 3. Rodar todos os testes
npm test

# 4. Testes em modo watch (re-executa ao salvar)
npm run test:watch

# 5. Testes com relatório de cobertura
npm run test:coverage

# 6. Build de produção
npm run build
```

## Resultado dos testes

```
Test Suites: 4 passed, 4 total
Tests:       40 passed, 40 total
```

## Conceitos aplicados

| Conceito | Onde |
|---|---|
| `render` + `screen` | Todos os arquivos de teste |
| `fireEvent` | Submissão de formulário, clique em botões |
| `userEvent.type` | Digitação realista no input |
| `renderHook` | `useContadorDeTarefas.test.ts` |
| `rerender` | Testa atualização do hook com novos dados |
| `jest.mock` | `page.test.tsx` — mock de `@/data/tarefas` |
| `data-testid` | Seletores estáveis nos componentes |
| `waitFor` | Aguarda atualizações assíncronas de estado |

## Observação sobre o babel.test.config.json

O arquivo de configuração do Babel foi nomeado `babel.test.config.json`
(em vez do padrão `babel.config.json`) para evitar conflito com o build
do Next.js, que usa seu próprio compilador SWC. O `jest.config.ts` aponta
para ele explicitamente via `configFile`.
