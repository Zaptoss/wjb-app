output "gha_gar_publisher_sa_email" {
  value = google_service_account.gha.email
}

output "workload_identity_provider" {
  value = "projects/${var.project_id}/locations/global/workloadIdentityPools/${google_iam_workload_identity_pool.pool.workload_identity_pool_id}/providers/${google_iam_workload_identity_pool_provider.provider.workload_identity_pool_provider_id}"
}

output "gar_pull_sa_email" {
  value = google_service_account.gar_pull.email
}

output "gar_pull_secret_name" {
  value = kubernetes_secret_v1.gar_pull.metadata[0].name
}

output "gar_registry_host" {
  value = "${var.region}-docker.pkg.dev"
}
