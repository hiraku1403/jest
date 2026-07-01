// ─────────────────────────────────────────────────────────────
// __tests__/ListaDeTarefas.test.tsx
// Testes de integração do componente <ListaDeTarefas />
// ─────────────────────────────────────────────────────────────
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListaDeTarefas from "@/components/ListaDeTarefas";
import type { Tarefa } from "@/data/tarefas";

const tarefasFixture: Tarefa[] = [
  { id: 1, texto: "Estudar Jest",       concluida: false },
  { id: 2, texto: "Revisar TypeScript", concluida: true  },
  { id: 3, texto: "Fazer exercícios",   concluida: false },
];

const renderComponente = (tarefas = tarefasFixture) =>
  render(<ListaDeTarefas tarefasIniciais={tarefas} />);

// ── Renderização inicial ───────────────────────────────────────
describe("ListaDeTarefas — renderização", () => {
  it("renderiza o container principal", () => {
    renderComponente();
    expect(screen.getByTestId("lista-container")).toBeInTheDocument();
  });

  it("renderiza todas as tarefas fornecidas", () => {
    renderComponente();
    const lista = screen.getByTestId("lista-tarefas");
    expect(lista.querySelectorAll("li")).toHaveLength(3);
  });

  it("exibe os textos das tarefas", () => {
    renderComponente();
    expect(screen.getByText("Estudar Jest")).toBeInTheDocument();
    expect(screen.getByText("Revisar TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Fazer exercícios")).toBeInTheDocument();
  });

  it("exibe mensagem de lista vazia quando não há tarefas", () => {
    renderComponente([]);
    expect(screen.getByTestId("lista-vazia")).toBeInTheDocument();
  });

  it("exibe o contador com valores corretos", () => {
    renderComponente();
    expect(screen.getByTestId("total")).toHaveTextContent("3 tarefas");
    expect(screen.getByTestId("concluidas")).toHaveTextContent("1 concluídas");
    expect(screen.getByTestId("pendentes")).toHaveTextContent("2 pendentes");
  });
});

// ── Adicionar tarefas ─────────────────────────────────────────
describe("ListaDeTarefas — adicionar tarefa", () => {
  it("adiciona uma nova tarefa à lista", async () => {
    renderComponente();
    const input = screen.getByTestId("input-nova-tarefa");
    await userEvent.type(input, "Nova tarefa de teste");
    fireEvent.submit(screen.getByTestId("form-nova-tarefa"));

    await waitFor(() => {
      expect(screen.getByText("Nova tarefa de teste")).toBeInTheDocument();
    });
  });

  it("atualiza o contador após adicionar tarefa", async () => {
    renderComponente();
    const input = screen.getByTestId("input-nova-tarefa");
    await userEvent.type(input, "Mais uma tarefa");
    fireEvent.submit(screen.getByTestId("form-nova-tarefa"));

    await waitFor(() => {
      expect(screen.getByTestId("total")).toHaveTextContent("4 tarefas");
      expect(screen.getByTestId("pendentes")).toHaveTextContent("3 pendentes");
    });
  });

  it("nova tarefa aparece no topo da lista", async () => {
    renderComponente();
    const input = screen.getByTestId("input-nova-tarefa");
    await userEvent.type(input, "Tarefa do topo");
    fireEvent.submit(screen.getByTestId("form-nova-tarefa"));

    await waitFor(() => {
      const itens = screen.getByTestId("lista-tarefas").querySelectorAll("li");
      expect(itens[0]).toHaveTextContent("Tarefa do topo");
    });
  });
});

// ── Remover tarefas ───────────────────────────────────────────
describe("ListaDeTarefas — remover tarefa", () => {
  it("remove uma tarefa ao clicar no botão remover", () => {
    renderComponente();
    expect(screen.getByText("Estudar Jest")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("remover-1"));

    expect(screen.queryByText("Estudar Jest")).not.toBeInTheDocument();
  });

  it("atualiza contador após remover tarefa", () => {
    renderComponente();
    fireEvent.click(screen.getByTestId("remover-1"));
    expect(screen.getByTestId("total")).toHaveTextContent("2 tarefas");
  });

  it("exibe mensagem vazia ao remover última tarefa", () => {
    const unica: Tarefa[] = [{ id: 1, texto: "Única", concluida: false }];
    render(<ListaDeTarefas tarefasIniciais={unica} />);
    fireEvent.click(screen.getByTestId("remover-1"));
    expect(screen.getByTestId("lista-vazia")).toBeInTheDocument();
  });
});

// ── Alternar status ───────────────────────────────────────────
describe("ListaDeTarefas — alternar status", () => {
  it("atualiza o contador ao marcar tarefa como concluída", () => {
    renderComponente();
    // Tarefa 1 está pendente — marca como concluída
    fireEvent.click(screen.getByTestId("check-1"));

    expect(screen.getByTestId("concluidas")).toHaveTextContent("2 concluídas");
    expect(screen.getByTestId("pendentes")).toHaveTextContent("1 pendentes");
  });

  it("atualiza o percentual ao concluir tarefa", () => {
    renderComponente();
    // 1/3 concluída inicialmente = 33%
    expect(screen.getByTestId("percentual")).toHaveTextContent("33%");

    // Conclui mais uma → 2/3 = 67%
    fireEvent.click(screen.getByTestId("check-1"));
    expect(screen.getByTestId("percentual")).toHaveTextContent("67%");
  });
});
