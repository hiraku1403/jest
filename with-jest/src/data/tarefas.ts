// ─────────────────────────────────────────────────────────────
// data/tarefas.ts
// Fonte de dados simulada — em produção seria um fetch() real
// ─────────────────────────────────────────────────────────────

export interface Tarefa {
  id: number;
  texto: string;
  concluida: boolean;
}

// Simula um banco de dados em memória (como se fosse uma API)
const tarefasIniciais: Tarefa[] = [
  { id: 1, texto: "Estudar Jest e Testing Library",   concluida: false },
  { id: 2, texto: "Criar testes para componentes",     concluida: false },
  { id: 3, texto: "Configurar CI no projeto Next.js",  concluida: true  },
  { id: 4, texto: "Revisar documentação do App Router",concluida: false },
];

/**
 * Simula uma chamada assíncrona à API.
 * Promise.resolve garante que o Server Component possa usar await.
 */
export async function getTarefas(): Promise<Tarefa[]> {
  return Promise.resolve(tarefasIniciais);
}
