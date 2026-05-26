import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-6 md:grid-cols-2 text-sm">
        <div>
          <p className="font-display font-semibold text-foreground">Transformata Z</p>
          <p className="text-muted-foreground mt-2">
            Proiect de Inginerie Electrică — controlul digital al motoarelor electrice.
          </p>
        </div>
        <div>
          <p className="font-display font-semibold text-foreground">Navigare</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li><Link to="/transformata-z" className="hover:text-primary">Transformata Z</Link></li>
            <li><Link to="/stabilitate" className="hover:text-primary">Cercul unitate</Link></li>
            <li><Link to="/concluzii" className="hover:text-primary">Concluzii</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        Nica Rareș-Mihai · Năstase Ștefan-Robert · Cioc Ruben-Samuel — Grupa 115B
      </div>
    </footer>
  );
}
