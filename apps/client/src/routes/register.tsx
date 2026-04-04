import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/auth-context";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-semibold text-bark mb-8 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-sand rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-sand rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-terracotta text-white font-medium py-2 rounded hover:bg-terracotta/90 transition-colors disabled:opacity-50"
          >
            {submitting ? "Creating account…" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-warm-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-terracotta hover:underline font-medium"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
