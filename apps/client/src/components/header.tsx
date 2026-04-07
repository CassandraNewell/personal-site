import { Link } from "react-router";
import { useAuth } from "../auth/auth-context";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-semibold text-primary hover:text-accent transition-colors">
          C.N.
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#widgets" className="text-secondary hover:text-accent transition-colors">
            Widgets
          </a>
          <a href="#blogs" className="text-secondary hover:text-accent transition-colors">
            Blogs &amp; Reshares
          </a>
          {user ? (
            <>
              <span className="text-secondary">{user.email}</span>
              <button
                onClick={logout}
                className="text-secondary hover:text-accent transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-secondary hover:text-accent transition-colors">
                Log In
              </Link>
              <Link to="/register" className="text-secondary hover:text-accent transition-colors">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
