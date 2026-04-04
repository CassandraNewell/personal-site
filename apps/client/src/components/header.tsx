export function Header() {
  return (
    <header className="border-b border-sand">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-semibold text-bark hover:text-terracotta transition-colors">
          C.N.
        </a>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#widgets" className="text-warm-700 hover:text-terracotta transition-colors">
            Widgets
          </a>
          <a href="#blogs" className="text-warm-700 hover:text-terracotta transition-colors">
            Blogs &amp; Reshares
          </a>
        </nav>
      </div>
    </header>
  );
}
