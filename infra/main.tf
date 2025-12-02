# infra/main.tf
#############################################
# PROVIDER E BÁSICO
#############################################

provider "aws" {
  region = "us-east-1"
}

data "aws_caller_identity" "current" {}

data "aws_vpc" "lab" {
  default = true
}

data "aws_subnets" "lab" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.lab.id]
  }
}

resource "random_id" "suffix" {
  byte_length = 4
}

#############################################
# SECURITY GROUP
#############################################

resource "aws_security_group" "app_sg" {
  name        = "${var.project_name}-sg-${random_id.suffix.hex}"
  description = "Allow HTTP traffic"
  vpc_id      = data.aws_vpc.lab.id

  ingress {
    description = "Allow HTTP 0-65535"
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#############################################
# ECS CLUSTER
#############################################

resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster-${random_id.suffix.hex}"
}

#############################################
# TASK DEFINITION (3 containers)
#############################################

resource "aws_ecs_task_definition" "fullstack" {
  family                   = "${var.project_name}-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "1024"
  memory                   = "2048"

#   execution_role_arn = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/LabRole"
#   task_role_arn      = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/LabRole"

  container_definitions = jsonencode([

    #############################################
    # CONTAINER 1 — DATABASE
    #############################################
    {
      name      = "db"
      image     = "postgres:16-alpine"
      essential = true

      environment = [
        { name = "POSTGRES_USER",     value = var.db_username },
        { name = "POSTGRES_PASSWORD", value = var.db_password },
        { name = "POSTGRES_DB",       value = var.db_name }
      ]

      portMappings = [
        { containerPort = 5432 }
      ]
    },

    #############################################
    # CONTAINER 2 — BACKEND
    #############################################
    {
      name      = "backend"
      image     = var.backend_image
      essential = true

      portMappings = [
        { containerPort = 5000 }
      ]

      dependsOn = [
        {
          containerName = "db"
          condition     = "START"
        }
      ]

      environment = [
        {
          name  = "DATABASE_URL"
          value = "postgresql://${var.db_username}:${var.db_password}@localhost:5432/${var.db_name}?schema=public"
        },
        { name = "JWT_SECRET", value = "supersecreto" },
        { name = "PORT",       value = "5000" }
      ]
    },

    #############################################
    # CONTAINER 3 — FRONTEND
    #############################################
    {
      name      = "frontend"
      image     = var.frontend_image
      essential = true

      portMappings = [
        { containerPort = 80 }
      ]

      environment = [
        {
          name  = "API_URL"
          value = "http://${var.backend_public_ip}:5000/api"
        }
      ]
    }

  ])
}

#############################################
# ECS SERVICE (1 service único com a task completa)
#############################################

resource "aws_ecs_service" "app" {
  name            = "${var.project_name}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.fullstack.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    assign_public_ip = true
    subnets          = data.aws_subnets.lab.ids
    security_groups  = [aws_security_group.app_sg.id]
  }
}
