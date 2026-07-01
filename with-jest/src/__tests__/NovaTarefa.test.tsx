// ─────────────────────────────────────────────────────────────
// __tests__/NovaTarefa.test.tsx
// Testes unitários do componente <NovaTarefa />
// ─────────────────────────────────────────────────────────────
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NovaTarefa from "@/components/NovaTarefa";
import type { Tarefa } from "@/data/tarefas";

// ── Helpers ───────────────────────────────────────────────────
const mockAdicionar = jest.fn();

const renderComponente = () =>
  render(<NovaTarefa onAdicionar={mockAdicionar} />);

beforeEach(() => {
  mockAdicionar.mockClear();
});

// ── Renderização ──────────────────────────────────────────────
describe("NovaTarefa — renderização", () => {
  it("renderiza o input de texto", () => {
    renderComponente();
    expect(screen.getByTestId("input-nova-tarefa")).toBeInTheDocument();
  });

  it("renderiza o botão Adicionar", () => {
    renderComponente();
    expect(screen.getByTestId("botao-adicionar")).toBeInTheDocument();
  });

  it("o botão começa desabilitado (input vazio)", () => {
    renderComponente();
    expect(screen.getByTestId("botao-adicionar")).toBeDisabled();
  });

  it("não exibe mensagem de erro ao renderizar", () => {
    renderComponente();
    expect(screen.queryByTestId("mensagem-erro")).not.toBeInTheDocument();
  });
});

// ── Controle do input ─────────────────────────────────────────
describe("NovaTarefa — controle do input", () => {
  it("atualiza o valor do input ao digitar", async () => {
    renderComponente();
    const input = screen.getByTestId("input-nova-tarefa");
    await userEvent.type(input, "Estudar Jest");
    expect(input).toHaveValue("Estudar Jest");
  });

  it("habilita o botão quando o input tem texto", async () => {
    renderComponente();
    const input = screen.getByTestId("input-nova-tarefa");
    await userEvent.type(input, "Nova tarefa");
    expect(screen.getByTestId("botao-adicionar")).not.toBeDisabled();
  });

  it("mantém botão desabilitado com apenas espaços", async () => {
    renderComponente();
    const input = screen.getByTestId("input-nova-tarefa");
    await userEvent.type(input, "   ");
    // Espaços não devem habilitar o botão
    expect(screen.getByTestId("botao-adicionar")).toBeDisabled();
  });
});

// ── Submissão ─────────────────────────────────────────────────
describe("NovaTarefa — submissão do formulário", () => {
  it("chama onAdicionar com a tarefa correta ao submeter", async () => {
    renderComponente();
    const input = screen.getByTestId("input-nova-tarefa");
    await userEvent.type(input, "Aprender Testing Library");
    fireEvent.submit(screen.getByTestId("form-nova-tarefa"));

    expect(mockAdicionar).toHaveBeenCalledTimes(1);

    const tarefaPassada: Tarefa = mockAdicionar.mock.calls[0][0];
    expect(tarefaPassada.texto).toBe("Aprender Testing Library");
    expect(tarefaPassada.concluida).toBe(false);
    expect(typeof tarefaPassada.id).toBe("number");
  });

  it("limpa o input após submissão bem-sucedida", async () => {
    renderComponente();
    const input = screen.getByTestId("input-nova-tarefa");
    await userEvent.type(input, "Tarefa para limpar");
    fireEvent.submit(screen.getByTestId("form-nova-tarefa"));
    expect(input).toHaveValue("");
  });

  it("remove espaços extras (trim) do texto antes de salvar", async () => {
    renderComponente();
    const input = screen.getByTestId("input-nova-tarefa");
    await userEvent.type(input, "  Tarefa com espaços  ");
    fireEvent.submit(screen.getByTestId("form-nova-tarefa"));

    const tarefaPassada: Tarefa = mockAdicionar.mock.calls[0][0];
    expect(tarefaPassada.texto).toBe("Tarefa com espaços");
  });
});

// ── Validação ─────────────────────────────────────────────────
describe("NovaTarefa — validação", () => {
  it("exibe mensagem de erro ao submeter com input vazio", () => {
    renderComponente();
    // Força submit sem texto (normalmente o botão fica disabled,
    // mas testamos o fireEvent diretamente para cobrir o guard interno)
    fireEvent.submit(screen.getByTestId("form-nova-tarefa"));
    expect(screen.getByTestId("mensagem-erro")).toBeInTheDocument();
    expect(screen.getByTestId("mensagem-erro")).toHaveTextContent(
      "O campo não pode estar vazio."
    );
  });

  it("a mensagem de erro some ao digitar texto válido", async () => {
    renderComponente();
    fireEvent.submit(screen.getByTestId("form-nova-tarefa"));
    expect(screen.getByTestId("mensagem-erro")).toBeInTheDocument();

    const input = screen.getByTestId("input-nova-tarefa");
    await userEvent.type(input, "T");

    await waitFor(() => {
      expect(screen.queryByTestId("mensagem-erro")).not.toBeInTheDocument();
    });
  });

  it("não chama onAdicionar quando o input está vazio", () => {
    renderComponente();
    fireEvent.submit(screen.getByTestId("form-nova-tarefa"));
    expect(mockAdicionar).not.toHaveBeenCalled();
  });
});
