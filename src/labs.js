const labs = [
  { id: 1, nome: "Laboratório de Redes", status: "operacional", capacidade: 30 },
  { id: 2, nome: "Laboratório de DevOps", status: "manutencao", capacidade: 20 },
  { id: 3, nome: "Laboratório de Cloud", status: "operacional", capacidade: 24 }
];

function listLabs() {
  return labs.map((lab) => ({ ...lab }));
}

function getLabById(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return null;
  }
  const found = labs.find((lab) => lab.id === numericId);
  return found ? { ...found } : null;
}

function countByStatus(status) {
  return labs.filter((lab) => lab.status === status).length;
}

function createLab({ nome, status = "operacional", capacidade }) {
  if (!nome || typeof nome !== "string" || nome.trim().length < 3) {
    const error = new Error("Nome do laboratório é obrigatório (mínimo 3 caracteres).");
    error.statusCode = 400;
    throw error;
  }

  const capacidadeNum = Number(capacidade);
  if (!Number.isInteger(capacidadeNum) || capacidadeNum <= 0) {
    const error = new Error("Capacidade deve ser um inteiro positivo.");
    error.statusCode = 400;
    throw error;
  }

  const allowed = ["operacional", "manutencao", "indisponivel"];
  if (!allowed.includes(status)) {
    const error = new Error(`Status inválido. Use: ${allowed.join(", ")}.`);
    error.statusCode = 400;
    throw error;
  }

  const lab = {
    id: labs.length ? Math.max(...labs.map((item) => item.id)) + 1 : 1,
    nome: nome.trim(),
    status,
    capacidade: capacidadeNum
  };
  labs.push(lab);
  return { ...lab };
}

function resetLabs() {
  labs.splice(0, labs.length,
    { id: 1, nome: "Laboratório de Redes", status: "operacional", capacidade: 30 },
    { id: 2, nome: "Laboratório de DevOps", status: "manutencao", capacidade: 20 },
    { id: 3, nome: "Laboratório de Cloud", status: "operacional", capacidade: 24 }
  );
}

module.exports = {
  listLabs,
  getLabById,
  countByStatus,
  createLab,
  resetLabs
};
