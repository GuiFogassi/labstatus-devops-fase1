const { listLabs, getLabById, countByStatus, createLab, resetLabs } = require("../src/labs");

describe("serviço de laboratórios", () => {
  beforeEach(() => {
    resetLabs();
  });

  test("lista os laboratórios cadastrados", () => {
    const labs = listLabs();
    expect(labs).toHaveLength(3);
    expect(labs[0]).toMatchObject({ id: 1, nome: "Laboratório de Redes" });
  });

  test("busca laboratório existente pelo id", () => {
    expect(getLabById(2)).toEqual({
      id: 2,
      nome: "Laboratório de DevOps",
      status: "manutencao",
      capacidade: 20
    });
  });

  test("retorna null para id inexistente ou inválido", () => {
    expect(getLabById(99)).toBeNull();
    expect(getLabById("abc")).toBeNull();
    expect(getLabById(0)).toBeNull();
  });

  test("conta laboratórios por status", () => {
    expect(countByStatus("operacional")).toBe(2);
    expect(countByStatus("manutencao")).toBe(1);
    expect(countByStatus("indisponivel")).toBe(0);
  });

  test("cria um laboratório válido", () => {
    const created = createLab({
      nome: "Laboratório de Segurança",
      status: "operacional",
      capacidade: 18
    });
    expect(created.id).toBe(4);
    expect(listLabs()).toHaveLength(4);
  });

  test("rejeita criação com dados inválidos", () => {
    expect(() => createLab({ nome: "AB", capacidade: 10 })).toThrow(/mínimo 3/);
    expect(() => createLab({ nome: "Lab QA", capacidade: -1 })).toThrow(/inteiro positivo/);
    expect(() => createLab({ nome: "Lab QA", capacidade: 10, status: "quebrado" })).toThrow(/Status inválido/);
  });
});
