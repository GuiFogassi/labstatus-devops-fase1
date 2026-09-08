# LabStatus

Projeto das Fases 1 e 2 da disciplina DevOps na Prática (PUCRS).

API em Node.js para consulta de status de laboratórios, com testes automatizados, GitHub Actions, Terraform e containers Docker.

## Execução local

```bash
npm install
npm test
npm start
```

Com Docker:

```bash
docker compose up --build
```

Verificação: `http://localhost:3000/health`

## Pipeline

- Integração contínua: `.github/workflows/ci.yml` — testes, validação do Terraform e `docker build`.
- Entrega contínua: `.github/workflows/cd.yml` — publicação da imagem em `ghcr.io/guifogassi/labstatus-api` na branch `main`.

O CD não executa `terraform apply`, para não consumir crédito da AWS Academy automaticamente.

## Implantação do container

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## Infraestrutura

A pasta `terraform/` descreve S3, security group e EC2 opcional. O `user_data` instala Docker na instância.

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
```
