variable "jwt_secret" {
  description = "Secret key for signing JWTs"
  type        = string
  sensitive   = true
}

variable "admin_email" {
  description = "Email address for the seeded admin user"
  type        = string
}

variable "admin_password" {
  description = "Password for the seeded admin user"
  type        = string
  sensitive   = true
}
