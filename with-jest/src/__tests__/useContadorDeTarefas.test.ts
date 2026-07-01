// ─────────────────────────────────────────────────────────────
// __tests__/useContadorDeTarefas.test.ts
// Testes unitários do hook useContadorDeTarefas
// ─────────────────────────────────────────────────────────────
import { renderHook } from "@testing-library/react";
import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";
import type { Tarefa } from "@/data/tarefas";

// ── Fixtures ──────────────────────────────────────────────────
const tarefasVazias: Tarefa[] = [];

const tarefasSemConcluir: Tarefa[] = [
  { id: 1, texto: "Tarefa A", concluida: false },
  { id: 2, texto: "Tarefa B", concluida: false },
  { id: 3, texto: "Tarefa C", concluida: false },
];

const tarefasMistas: Tarefa[] = [
  { id: 1, texto: "Tarefa A", concluida: true  },
  { id: 2, texto: "Tarefa B", concluida: false },
  { id: 3, texto: "Tarefa C", concluida: true  },
  { id: 4, texto: "Tarefa D", concluida: false },
];

const todasConcluidas: Tarefa[] = [
  { id: 1, texto: "Tarefa A", concluida: true },
  { id: 2, texto: "Tarefa B", concluida: true },
];

// ── Lista vazia ───────────────────────────────────────────────
describe("useContadorDeTarefas — lista vazia", () => {
  it("retorna zeros para lista vazia", () => {
    const { result } = renderHook(() => useContadorDeTarefas(tarefasVazias));
    expect(result.current.total).toBe(0);
    expect(result.current.concluidas).toBe(0);
    expect(result.current.pendentes).toBe(0);
  });

  it("retorna percentual 0 para lista vazia", () => {
    const { result } = renderHook(() => useContadorDeTarefas(tarefasVazias));
    expect(result.current.percentual).toBe(0);
  });
});

// ── Valores retornados ────────────────────────────────────────
describe("useContadorDeTarefas — valores retornados", () => {
  it("conta corretamente o total de tarefas", () => {
    const { result } = renderHook(() =>
      useContadorDeTarefas(tarefasSemConcluir)
    );
    expect(result.current.total).toBe(3);
  });

  it("conta corretamente as pendentes (nenhuma concluída)", () => {
    const { result } = renderHook(() =>
      useContadorDeTarefas(tarefasSemConcluir)
    );
    expect(result.current.pendentes).toBe(3);
    expect(result.current.concluidas).toBe(0);
  });

  it("conta corretamente tarefas mistas", () => {
    const { result } = renderHook(() =>
      useContadorDeTarefas(tarefasMistas)
    );
    expect(result.current.total).toBe(4);
    expect(result.current.concluidas).toBe(2);
    expect(result.current.pendentes).toBe(2);
  });

  it("calcula percentual correto para tarefas mistas (50%)", () => {
    const { result } = renderHook(() =>
      useContadorDeTarefas(tarefasMistas)
    );
    expect(result.current.percentual).toBe(50);
  });

  it("retorna percentual 100 quando todas estão concluídas", () => {
    const { result } = renderHook(() =>
      useContadorDeTarefas(todasConcluidas)
    );
    expect(result.current.percentual).toBe(100);
    expect(result.current.pendentes).toBe(0);
  });
});

// ── Reatualização ─────────────────────────────────────────────
describe("useContadorDeTarefas — reatualização", () => {
  it("atualiza os valores quando a lista muda", () => {
    let tarefas = tarefasSemConcluir;

    const { result, rerender } = renderHook(
      ({ lista }: { lista: Tarefa[] }) => useContadorDeTarefas(lista),
      { initialProps: { lista: tarefas } }
    );

    expect(result.current.total).toBe(3);

    // Adiciona uma nova tarefa
    tarefas = [
      ...tarefasSemConcluir,
      { id: 99, texto: "Nova", concluida: false },
    ];
    rerender({ lista: tarefas });

    expect(result.current.total).toBe(4);
    expect(result.current.pendentes).toBe(4);
  });

  it("recalcula percentual ao concluir uma tarefa", () => {
    const { result, rerender } = renderHook(
      ({ lista }: { lista: Tarefa[] }) => useContadorDeTarefas(lista),
      { initialProps: { lista: tarefasSemConcluir } }
    );

    expect(result.current.percentual).toBe(0);

    // Conclui uma das três tarefas → 33%
    const atualizada = tarefasSemConcluir.map((t) =>
      t.id === 1 ? { ...t, concluida: true } : t
    );
    rerender({ lista: atualizada });

    expect(result.current.percentual).toBe(33);
    expect(result.current.concluidas).toBe(1);
    expect(result.current.pendentes).toBe(2);
  });
});
