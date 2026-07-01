// ─────────────────────────────────────────────────────────────
// __tests__/page.test.tsx
// Testa a renderização da página com tarefas mockadas
// ─────────────────────────────────────────────────────────────
import React from "react";
import { render, screen } from "@testing-library/react";

// Mock do módulo de dados — evita dependência externa nos testes
jest.mock("@/data/tarefas", () => ({
  getTarefas: jest.fn().mockResolvedValue([
    { id: 1, texto: "Tarefa mockada A", concluida: false },
    { id: 2, texto: "Tarefa mockada B", concluida: true  },
  ]),
}));

// Importa o componente ListaDeTarefas diretamente
// (page.tsx é async Server Component — testamos o Client Component com dados)
import ListaDeTarefas from "@/components/ListaDeTarefas";
import type { Tarefa } from "@/data/tarefas";

const tarefasMockadas: Tarefa[] = [
  { id: 1, texto: "Tarefa mockada A", concluida: false },
  { id: 2, texto: "Tarefa mockada B", concluida: true  },
];

describe("Página principal — renderização com tarefas", () => {
  it("renderiza o container da lista", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMockadas} />);
    expect(screen.getByTestId("lista-container")).toBeInTheDocument();
  });

  it("exibe as tarefas carregadas via mock", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMockadas} />);
    expect(screen.getByText("Tarefa mockada A")).toBeInTheDocument();
    expect(screen.getByText("Tarefa mockada B")).toBeInTheDocument();
  });

  it("exibe a contagem correta de tarefas", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMockadas} />);
    expect(screen.getByTestId("total")).toHaveTextContent("2 tarefas");
  });

  it("exibe o formulário para adicionar novas tarefas", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMockadas} />);
    expect(screen.getByTestId("form-nova-tarefa")).toBeInTheDocument();
    expect(screen.getByTestId("input-nova-tarefa")).toBeInTheDocument();
  });

  it("exibe percentual de conclusão correto (1 de 2 = 50%)", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMockadas} />);
    expect(screen.getByTestId("percentual")).toHaveTextContent("50%");
  });
});
