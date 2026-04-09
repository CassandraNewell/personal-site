terraform {
  cloud {
    organization = "Nobel"
    workspaces {
      name = "personal-site"
    }
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.8.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}

provider "google" {
  project = "project-1a7de585-a8ff-489e-b5f"
  region  = "europe-west1"
}

locals {
  project = "project-1a7de585-a8ff-489e-b5f"
  region  = "europe-west1"
}
