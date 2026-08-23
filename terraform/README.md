# Terraform

Infra da Fase 1 na AWS Academy.

Cria:

- bucket S3 (site estático)
- security group
- EC2 `t2.micro` (opcional)

```bash
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

O GitHub Actions só valida. Apply é manual no lab.

Pra tirar tudo: `terraform destroy`.
