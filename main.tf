terraform {
  cloud {
    organization = "Nobel"
    workspaces {
      name = "personal-site"
    }
  }

  required_providers {
    google = {
      source = "hashicorp/google"
      version = "6.8.0"
    }
  }
}

provider "google" {
  project = "project-1a7de585-a8ff-489e-b5f"
  region  = "europe-west1"
  zone    = "europe-west1-b"
}

resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}
