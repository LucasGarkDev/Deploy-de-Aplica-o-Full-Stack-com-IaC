output "backend_task_ip_lookup" {
  description = "INSTRUCAO: Consulte o IP publico em ECS > Tasks > Network"
  value       = "Apos o primeiro apply, pegue o public IP do backend e coloque em terraform.tfvars"
}

output "cluster_name" {
  description = "Nome do cluster ECS"
  value       = aws_ecs_cluster.main.name
}
