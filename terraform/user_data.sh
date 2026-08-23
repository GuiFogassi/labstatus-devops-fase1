#!/bin/bash
set -euo pipefail

dnf update -y
dnf install -y nodejs npm git

mkdir -p /opt/labstatus
cat >/opt/labstatus/health.js <<'EOF'
const http = require("http");
const port = Number(process.env.PORT) || 3000;
const server = http.createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok", origem: "user-data" }));
});
server.listen(port);
EOF

cat >/etc/systemd/system/labstatus.service <<'EOF'
[Unit]
Description=labstatus
After=network.target

[Service]
Environment=PORT=3000
ExecStart=/usr/bin/node /opt/labstatus/health.js
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now labstatus.service
