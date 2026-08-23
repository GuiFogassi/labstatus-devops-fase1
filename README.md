# LabStatus

Fase 1 da disciplina DevOps na Prática (PUCRS).

API em Node.js pra consultar o status dos laboratórios, site estático, pipeline no GitHub Actions e scripts Terraform pra AWS Academy.

## Como rodar

```bash
npm install
npm test
npm start
```

Rotas:

- `GET /health`
- `GET /api/labs`
- `GET /api/labs/:id`
- `POST /api/labs`

## CI

O arquivo `.github/workflows/ci.yml` roda em push/PR na `main`:

- instala as dependências e executa os testes
- valida o Terraform (`fmt`, `init` e `validate`)

Nesta fase o pipeline **não** faz deploy e **não** roda `terraform apply`.

## Infra

Na pasta `terraform/`:

- S3 com o site
- security group (22, 80 e 3000)
- EC2 `t2.micro` (dá pra desligar com `create_ec2 = false`)

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
```

O `apply` só no lab da AWS Academy. No final, `terraform destroy` e encerra o lab.
