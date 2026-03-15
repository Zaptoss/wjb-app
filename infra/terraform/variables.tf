variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "europe-central2"
}

variable "project_codename" {
  type = string
}

variable "gar_repo" {
  type    = string
  default = "app"
}

variable "github_owner" {
  type = string
}

variable "github_repo" {
  type = string
}

variable "kubernetes_config_path" {
  type = string
  default = "~/.kube/config"
}

variable "kubernetes_config_context" {
  type    = string
}

variable "kubernetes_namespace" {
  type    = string
  default = "default"
}

variable "cloudflare_api_token" {
  type = string
  sensitive = true
}
