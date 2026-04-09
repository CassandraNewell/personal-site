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

output "github_wif_provider" {
  description = "Full resource name of the GitHub Actions WIF provider (for google-github-actions/auth)"
  value       = google_iam_workload_identity_pool_provider.github_actions.name
}

output "github_actions_sa_email" {
  description = "Email of the GitHub Actions service account"
  value       = google_service_account.github_actions.email
}
