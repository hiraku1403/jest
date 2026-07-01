// ─────────────────────────────────────────────────────────────
// hooks/useContadorDeTarefas.ts
// Hook customizado: retorna contagens derivadas da lista
// ─────────────────────────────────────────────────────────────
import { useMemo } from "react";
import type { Tarefa } from "@/data/tarefas";

export interface ContadorDeTarefas {
  total:      number;
  concluidas: number;
  pendentes:  number;
  percentual: number;  // % de conclusão (0–100)
}

/**
 * useContadorDeTarefas
 *
 * Recebe a lista de tarefas e retorna contagens memoizadas.
 * Testável de forma isolada com renderHook.
 */
export function useContadorDeTarefas(tarefas: Tarefa[]): ContadorDeTarefas {
  return useMemo(() => {
    const total      = tarefas.length;
    const concluidas = tarefas.filter((t) => t.concluida).length;
    const pendentes  = total - concluidas;
    const percentual = total === 0 ? 0 : Math.round((concluidas / total) * 100);
    return { total, concluidas, pendentes, percentual };
  }, [tarefas]);
}
