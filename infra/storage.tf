resource "google_storage_bucket" "client" {
  name     = "cassandranewell.com"
  location = local.region

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }
}

# Allow public read access to the bucket contents
resource "google_storage_bucket_iam_member" "client_public" {
  bucket = google_storage_bucket.client.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}
