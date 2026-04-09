# Dedicated service account for the Cloud Run service
resource "google_service_account" "cloud_run" {
  account_id   = "personal-site-api"
  display_name = "Personal Site API (Cloud Run)"
}

# Grant the service account permission to connect to Cloud SQL
resource "google_project_iam_member" "cloud_run_sql" {
  project = local.project
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}

resource "google_cloud_run_v2_service" "api" {
  name     = "personal-site-api"
  location = local.region

  template {
    service_account = google_service_account.cloud_run.email

    containers {
      # Placeholder image — replaced by the first CI/CD deployment
      image = "gcr.io/cloudrun/hello"

      ports {
        container_port = 5001
      }

      env {
        name  = "NODE_ENV"
        value = "production"
      }

      env {
        name = "DATABASE_URL"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.database_url.secret_id
            version = "latest"
          }
        }
      }

      env {
        name = "JWT_SECRET"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.jwt_secret.secret_id
            version = "latest"
          }
        }
      }

      env {
        name = "ADMIN_EMAIL"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.admin_email.secret_id
            version = "latest"
          }
        }
      }

      env {
        name = "ADMIN_PASSWORD"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.admin_password.secret_id
            version = "latest"
          }
        }
      }

      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }
    }

    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [google_sql_database_instance.main.connection_name]
      }
    }

    scaling {
      min_instance_count = 0
      max_instance_count = 2
    }
  }

  lifecycle {
    ignore_changes = [
      template[0].containers[0].image,
      client,
      client_version,
      scaling,
    ]
  }

  depends_on = [
    google_project_service.cloud_run,
    google_secret_manager_secret_version.database_url,
    google_secret_manager_secret_version.jwt_secret,
    google_secret_manager_secret_version.admin_email,
    google_secret_manager_secret_version.admin_password,
  ]
}

# Allow unauthenticated access (public API)
resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.api.name
  location = local.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}
