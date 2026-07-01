// ─────────────────────────────────────────────────────────────
// components/NovaTarefa.tsx
// Client Component: formulário controlado para adicionar tarefa
// ─────────────────────────────────────────────────────────────
"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import type { Tarefa } from "@/data/tarefas";
import styles from "./NovaTarefa.module.css";

interface NovaTarefaProps {
  onAdicionar: (tarefa: Tarefa) => void;
}

export default function NovaTarefa({ onAdicionar }: NovaTarefaProps) {
  const [texto, setTexto]   = useState<string>("");
  const [erro,  setErro]    = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTexto(e.target.value);
    if (e.target.value.trim()) setErro("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!texto.trim()) {
      setErro("O campo não pode estar vazio.");
      return;
    }

    onAdicionar({
      id:        Date.now(),
      texto:     texto.trim(),
      concluida: false,
    });

    setTexto("");
    setErro("");
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      data-testid="form-nova-tarefa"
      noValidate
    >
      <div className={styles.inputGroup}>
        <input
          className={`${styles.input} ${erro ? styles.inputErro : ""}`}
          type="text"
          value={texto}
          onChange={handleChange}
          placeholder="Nova tarefa..."
          aria-label="Texto da nova tarefa"
          data-testid="input-nova-tarefa"
          maxLength={120}
        />
        <button
          type="submit"
          className={styles.botao}
          disabled={!texto.trim()}
          data-testid="botao-adicionar"
        >
          Adicionar
        </button>
      </div>

      {erro && (
        <p
          className={styles.erro}
          role="alert"
          data-testid="mensagem-erro"
        >
          {erro}
        </p>
      )}
    </form>
  );
}
