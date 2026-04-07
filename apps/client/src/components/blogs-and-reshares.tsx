interface ArticleCard {
  title: string;
  description: string;
  tag: "blog" | "reshare";
  url?: string;
  date: string;
}

const articles: ArticleCard[] = [
  {
    title: "Coming soon!",
    description: "Blog posts and reshares coming soon",
    tag: "blog",
    date: "Apr 2026",
  },
];

function TagBadge({ tag }: { tag: "blog" | "reshare" }) {
  const styles =
    tag === "blog"
      ? "bg-forest/10 text-forest"
      : "bg-terracotta/10 text-terracotta";

  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${styles}`}
    >
      {tag === "blog" ? "Blog" : "Reshare"}
    </span>
  );
}

export function BlogsAndReshares() {
  return (
    <section id="blogs" className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-bark mb-2">
          Blogs &amp; Reshares
        </h2>
        <p className="text-warm-500 mb-10">
          Writing about things I&apos;m learning, and sharing articles worth
          reading.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <article
              key={article.title}
              className="bg-white rounded-xl border border-sand p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <TagBadge tag={article.tag} />
                <span className="text-xs text-warm-400">{article.date}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-bark mb-2">
                {article.url ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-terracotta transition-colors"
                  >
                    {article.title} &rarr;
                  </a>
                ) : (
                  article.title
                )}
              </h3>
              <p className="text-sm text-warm-600 leading-relaxed">
                {article.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
