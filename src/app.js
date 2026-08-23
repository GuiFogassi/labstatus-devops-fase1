const express = require("express");
const { listLabs, getLabById, countByStatus, createLab } = require("./labs");

function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      servico: "labstatus-api",
      timestamp: new Date().toISOString()
    });
  });

  app.get("/api/labs", (_req, res) => {
    const data = listLabs();
    res.json({
      total: data.length,
      operacionais: countByStatus("operacional"),
      data
    });
  });

  app.get("/api/labs/:id", (req, res) => {
    const lab = getLabById(req.params.id);
    if (!lab) {
      return res.status(404).json({ erro: "Laboratório não encontrado." });
    }
    return res.json(lab);
  });

  app.post("/api/labs", (req, res) => {
    try {
      const created = createLab(req.body || {});
      return res.status(201).json(created);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ erro: error.message });
    }
  });

  app.use((_req, res) => {
    res.status(404).json({ erro: "Rota não encontrada." });
  });

  return app;
}

module.exports = { createApp };
