output "bucket_name" {
  value = aws_s3_bucket.site.bucket
}

output "website_endpoint" {
  value = aws_s3_bucket_website_configuration.site.website_endpoint
}

output "website_url" {
  value = "http://${aws_s3_bucket_website_configuration.site.website_endpoint}"
}

output "security_group_id" {
  value = aws_security_group.api.id
}

output "ec2_public_ip" {
  value = var.create_ec2 ? aws_instance.api[0].public_ip : null
}

output "api_url" {
  value = var.create_ec2 ? "http://${aws_instance.api[0].public_ip}:${var.app_port}/health" : null
}
