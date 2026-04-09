output "cloud_run_url" {
  description = "URL of the deployed Cloud Run service"
  value       = google_cloud_run_v2_service.api.uri
}

output "artifact_registry_repo" {
  description = "Full path for docker push (use as image prefix)"
  value       = "${local.region}-docker.pkg.dev/${local.project}/${google_artifact_registry_repository.api.repository_id}"
}

output "cloud_sql_connection_name" {
  description = "Cloud SQL instance connection name (for Cloud SQL proxy)"
  value       = google_sql_database_instance.main.connection_name
}
