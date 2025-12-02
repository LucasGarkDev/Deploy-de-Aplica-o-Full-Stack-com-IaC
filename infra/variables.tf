variable "project_name" {
  description = "Nome base do projeto"
  type        = string
  default     = "smartclass"
}

variable "db_username" {
  description = "Usuario do banco"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Senha do banco"
  type        = string
  default     = "admin"
  sensitive   = true
}

variable "db_name" {
  description = "Nome do banco"
  type        = string
  default     = "smartclass"
}

variable "backend_image" {
  description = "Imagem Docker do backend"
  type        = string
  default     = "garcia3glxy/smartclass-backend:latest"
}

variable "frontend_image" {
  description = "Imagem Docker do frontend"
  type        = string
  default     = "garcia3glxy/smartclass-frontend:latest"
}

variable "backend_public_ip" {
  description = "IP publico do backend, preenchido apos o primeiro apply"
  type        = string
  default     = ""
}
