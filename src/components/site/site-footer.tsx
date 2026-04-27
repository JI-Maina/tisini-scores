export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-border/70 bg-card/70 mt-10 rounded-xl border px-4 py-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col items-center justify-between gap-2 text-sm sm:flex-row">
        <p className="text-muted-foreground">
          <span className="text-foreground font-semibold">Tisini Scores</span> © {year}
        </p>
        <nav className="text-muted-foreground flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
}
