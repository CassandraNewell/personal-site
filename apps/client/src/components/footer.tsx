export function Footer() {
  return (
    <footer className="border-t border-sand py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-warm-500">
        <p>&copy; {new Date().getFullYear()} Cassandra Newell</p>
        <p>
          Built with{" "}
          <a
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
            className="text-terracotta hover:underline"
          >
            React
          </a>
          ,{" "}
          <a
            href="https://turborepo.dev"
            target="_blank"
            rel="noreferrer"
            className="text-terracotta hover:underline"
          >
            Turborepo
          </a>
          , &amp;{" "}
          <a
            href="https://nestjs.com"
            target="_blank"
            rel="noreferrer"
            className="text-terracotta hover:underline"
          >
            NestJS
          </a>
        </p>
      </div>
    </footer>
  );
}
