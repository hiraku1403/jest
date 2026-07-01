// ─────────────────────────────────────────────────────────────
// components/ListaDeTarefas.tsx
// Client Component: exibe tarefas + contador via hook
// ─────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import type { Tarefa } from "@/data/tarefas";
import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";
import NovaTarefa from "./NovaTarefa";
import styles from "./ListaDeTarefas.module.css";

interface ListaDeTarefasProps {
  tarefasIniciais: Tarefa[];
}

export default function ListaDeTarefas({ tarefasIniciais }: ListaDeTarefasProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais);

  // Hook customizado — retorna contagens memoizadas
  const contador = useContadorDeTarefas(tarefas);

  const adicionarTarefa = (nova: Tarefa): void => {
    setTarefas((prev) => [nova, ...prev]);
  };

  const alternarConcluida = (id: number): void => {
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
  };

  const removerTarefa = (id: number): void => {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className={styles.container} data-testid="lista-container">
      {/* Contador usando dados do hook */}
      <div className={styles.contador} data-testid="contador">
        <span data-testid="total">{contador.total} tarefas</span>
        <span className={styles.sep}>·</span>
        <span data-testid="pendentes">{contador.pendentes} pendentes</span>
        <span className={styles.sep}>·</span>
        <span data-testid="concluidas">{contador.concluidas} concluídas</span>
        <span className={styles.sep}>·</span>
        <span data-testid="percentual">{contador.percentual}% completo</span>
      </div>

      {/* Barra de progresso */}
      <div className={styles.progressoTrilha} role="progressbar"
        aria-valuenow={contador.percentual} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.progressoBarra}
          style={{ width: `${contador.percentual}%` }} />
      </div>

      {/* Formulário */}
      <NovaTarefa onAdicionar={adicionarTarefa} />

      {/* Lista */}
      {tarefas.length === 0 ? (
        <p className={styles.vazia} data-testid="lista-vazia">
          Nenhuma tarefa cadastrada.
        </p>
      ) : (
        <ul className={styles.lista} data-testid="lista-tarefas">
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              className={`${styles.item} ${tarefa.concluida ? styles.itemConcluida : ""}`}
              data-testid={`tarefa-${tarefa.id}`}
            >
              <button
                className={styles.checkBtn}
                onClick={() => alternarConcluida(tarefa.id)}
                aria-label={tarefa.concluida ? "Marcar como pendente" : "Marcar como concluída"}
                data-testid={`check-${tarefa.id}`}
              >
                {tarefa.concluida ? "☑" : "☐"}
              </button>
              <span className={styles.texto}>{tarefa.texto}</span>
              <button
                className={styles.removerBtn}
                onClick={() => removerTarefa(tarefa.id)}
                aria-label="Remover tarefa"
                data-testid={`remover-${tarefa.id}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
