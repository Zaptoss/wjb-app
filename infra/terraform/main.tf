provider "google" {
  project = var.project_id
  region  = var.region
}

provider "kubernetes" {
  config_path    = var.kubernetes_config_path
  config_context = var.kubernetes_config_context
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "google_project_service" "services" {
  for_each = toset([
    "artifactregistry.googleapis.com",
    "iam.googleapis.com",
    "sts.googleapis.com"
  ])
  service            = each.value
  disable_on_destroy = false
}

resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = var.gar_repo
  format        = "DOCKER"
  description   = "Docker images"

  depends_on = [google_project_service.services]
}

resource "google_service_account" "gha" {
  account_id   = "${var.project_codename}-gha-gar-publisher"
  display_name = "GitHub Actions -> GAR publisher"
}

resource "google_project_iam_member" "gar_writer" {
  project = var.project_id
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.gha.email}"
}

resource "google_iam_workload_identity_pool" "pool" {
  workload_identity_pool_id = "${var.project_codename}-github-pool"
  display_name              = "GitHub Actions ${var.project_codename} pool"
}

resource "google_iam_workload_identity_pool_provider" "provider" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "${var.project_codename}-github-provider"
  display_name                       = "GitHub OIDC Provider"

  oidc { issuer_uri = "https://token.actions.githubusercontent.com" }

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.repository" = "assertion.repository"
    "attribute.ref"        = "assertion.ref"
  }

  attribute_condition = "attribute.repository == \"${var.github_owner}/${var.github_repo}\""
}

resource "google_service_account_iam_binding" "wif_binding" {
  service_account_id = google_service_account.gha.name
  role               = "roles/iam.workloadIdentityUser"

  members = [
    "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.pool.name}/attribute.repository/${var.github_owner}/${var.github_repo}"
  ]
}

resource "google_service_account" "gar_pull" {
  account_id   = "${var.project_codename}-gar-pull"
  display_name = "GAR pull (read-only)"
}

resource "google_project_iam_member" "gar_pull_reader" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${google_service_account.gar_pull.email}"
}

resource "google_service_account_key" "gar_pull_key" {
  service_account_id = google_service_account.gar_pull.name
}

resource "kubernetes_secret_v1" "gar_pull" {
  metadata {
    name      = "gar-pull"
    namespace = var.kubernetes_namespace
  }

  type = "kubernetes.io/dockerconfigjson"

  data = {
    ".dockerconfigjson" = jsonencode({
      auths = {
        "${var.region}-docker.pkg.dev" = {
          username = "_json_key"
          password = base64decode(google_service_account_key.gar_pull_key.private_key)
          email    = "not@val.id"
          auth     = base64encode("_json_key:${base64decode(google_service_account_key.gar_pull_key.private_key)}")
        }
      }
    })
  }

  depends_on = [google_project_iam_member.gar_pull_reader]
}
