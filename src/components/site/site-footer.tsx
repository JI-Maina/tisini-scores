import { tisiniLogo } from '#/assets'

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-sportpesa-azure/20 bg-card/70 mt-10 rounded-xl border border-l-4 border-l-sportpesa-azure px-4 py-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
        <p className="text-muted-foreground">
          <span className="text-foreground font-semibold">SportPesa7s</span> ©{' '}
          {year}
        </p>

        <nav className="text-muted-foreground flex items-center gap-4">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Contact
          </a>
        </nav>

        <div className="border-border/60 flex items-center gap-2 border-t pt-4 sm:border-t-0 sm:pt-0">
          <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Powered by
          </span>
          <img
            src={tisiniLogo}
            alt="Tisini"
            className="h-7 w-auto object-contain opacity-90 transition-[filter,opacity] hover:opacity-100 dark:brightness-0 dark:invert"
          />
        </div>
      </div>
    </footer>
  )
}
