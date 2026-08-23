const request = require("supertest");
const { createApp } = require("../src/app");
const { resetLabs } = require("../src/labs");

describe("LabStatus API", () => {
  let app;

  beforeEach(() => {
    resetLabs();
    app = createApp();
  });

  test("GET /health retorna status da aplicação", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.servico).toBe("labstatus-api");
  });

  test("GET /api/labs retorna a lista paginada em memória", async () => {
    const response = await request(app).get("/api/labs");
    expect(response.status).toBe(200);
    expect(response.body.total).toBe(3);
    expect(response.body.operacionais).toBe(2);
    expect(response.body.data[0].nome).toContain("Redes");
  });

  test("GET /api/labs/:id retorna 200 e 404", async () => {
    const ok = await request(app).get("/api/labs/1");
    expect(ok.status).toBe(200);
    expect(ok.body.nome).toBe("Laboratório de Redes");

    const missing = await request(app).get("/api/labs/99");
    expect(missing.status).toBe(404);
    expect(missing.body.erro).toMatch(/não encontrado/);
  });

  test("POST /api/labs cria laboratório e valida entrada", async () => {
    const created = await request(app)
      .post("/api/labs")
      .send({ nome: "Laboratório de Testes", capacidade: 12 });

    expect(created.status).toBe(201);
    expect(created.body.id).toBe(4);

    const invalid = await request(app)
      .post("/api/labs")
      .send({ nome: "X", capacidade: 12 });

    expect(invalid.status).toBe(400);
  });

  test("rota inexistente retorna 404", async () => {
    const response = await request(app).get("/nao-existe");
    expect(response.status).toBe(404);
  });
});
