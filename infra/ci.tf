# --- GitHub Actions service account ---

resource "google_service_account" "github_actions" {
  account_id   = "github-actions"
  display_name = "GitHub Actions (CI/CD)"
}

# --- Workload Identity Federation for GitHub Actions ---

resource "google_iam_workload_identity_pool" "github_actions" {
  workload_identity_pool_id = "github-actions"
  display_name              = "GitHub Actions"

  depends_on = [google_project_service.iam_credentials]
}

resource "google_iam_workload_identity_pool_provider" "github_actions" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github_actions.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-actions-provider"
  display_name                       = "GitHub Actions Provider"

  # Only allow tokens from this specific repository
  attribute_condition = "assertion.repository == 'CassandraNewell/personal-site'"

  attribute_mapping = {
    "google.subject"             = "assertion.sub"
    "attribute.actor"            = "assertion.actor"
    "attribute.repository"       = "assertion.repository"
    "attribute.repository_owner" = "assertion.repository_owner"
  }

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

# --- Allow GitHub Actions WIF to impersonate the service account ---

resource "google_service_account_iam_member" "github_actions_wif" {
  service_account_id = google_service_account.github_actions.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github_actions.name}/attribute.repository/CassandraNewell/personal-site"
}

# --- Project-level permissions for the GitHub Actions SA ---

# Push Docker images to Artifact Registry
resource "google_project_iam_member" "github_actions_ar_writer" {
  project = local.project
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Deploy new revisions to Cloud Run
resource "google_project_iam_member" "github_actions_run_developer" {
  project = local.project
  role    = "roles/run.developer"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Act as the Cloud Run runtime service account during deploys
resource "google_project_iam_member" "github_actions_sa_user" {
  project = local.project
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}
