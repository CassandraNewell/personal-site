resource "random_password" "db_password" {
  length  = 32
  special = false
}

resource "google_sql_database_instance" "main" {
  name             = "personal-site-db"
  database_version = "POSTGRES_16"
  region           = local.region

  settings {
    tier              = "db-f1-micro"
    edition           = "ENTERPRISE"
    availability_type = "ZONAL"

    disk_size = 10

    backup_configuration {
      enabled = false
    }

    ip_configuration {
      ipv4_enabled = true
    }
  }

  deletion_protection = false

  depends_on = [google_project_service.sql_admin]
}

resource "google_sql_database" "app" {
  name     = "personal_site"
  instance = google_sql_database_instance.main.name
}

resource "google_sql_user" "app" {
  name     = "api"
  instance = google_sql_database_instance.main.name
  password = random_password.db_password.result
}
