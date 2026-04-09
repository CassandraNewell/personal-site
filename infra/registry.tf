resource "google_artifact_registry_repository" "api" {
  location      = local.region
  repository_id = "personal-site"
  format        = "DOCKER"
  description   = "Docker images for the personal-site API"

  depends_on = [google_project_service.artifact_registry]
}
