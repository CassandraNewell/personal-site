import { Link } from "react-router";
import { useAuth } from "../auth/auth-context";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-sand">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-semibold text-bark hover:text-terracotta transition-colors">
          C.N.
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#widgets" className="text-warm-700 hover:text-terracotta transition-colors">
            Widgets
          </a>
          <a href="#blogs" className="text-warm-700 hover:text-terracotta transition-colors">
            Blogs &amp; Reshares
          </a>
          {user ? (
            <>
              <span className="text-warm-700">{user.email}</span>
              <button
                onClick={logout}
                className="text-warm-700 hover:text-terracotta transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-warm-700 hover:text-terracotta transition-colors">
                Log In
              </Link>
              <Link to="/register" className="text-warm-700 hover:text-terracotta transition-colors">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
