export function Hero() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-secondary font-medium text-sm tracking-wide uppercase mb-3">
          Welcome
        </p>
        <h1 className="font-display text-5xl font-bold text-primary leading-tight mb-6">
          Cassandra Newell
        </h1>
        <p className="text-lg text-secondary leading-relaxed max-w-2xl">
          Senior software engineer, tinkerer, and lifelong learner. This is my
          corner of the internet where I experiment with new tools and
          technologies, share things I find interesting, and build small widgets
          just for the fun of it.
        </p>
        <div className="mt-8 h-px bg-gradient-to-r from-accent via-border to-transparent" />
      </div>
    </section>
  );
}
