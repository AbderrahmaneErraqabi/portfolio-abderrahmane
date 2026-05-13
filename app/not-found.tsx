import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--page-gradient)] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16 lg:px-8">
        <section className="w-full rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)]/95 p-10 text-center shadow-[var(--shadow-gloss)] backdrop-blur-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-primary/70">Page not found</p>
          <h1 className="mt-4 text-4xl font-bold text-[var(--electric-blue)]">404</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            The page you requested does not exist or has moved.
          </p>
          <Link
            href="/#hero"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/20"
          >
            Return home
          </Link>
        </section>
      </div>
    </main>
  )
}
