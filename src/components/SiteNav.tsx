import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, CircuitBoard } from "lucide-react";

const links = [
  { to: "/", label: "Acasă" },
  { to: "/transformata-z", label: "Transformata Z" },
  { to: "/model-motor", label: "Modelul motorului" },
  { to: "/control-digital", label: "Control digital" },
  { to: "/stabilitate", label: "Stabilitate" },
  { to: "/aplicatii", label: "Aplicații" },
  { to: "/concluzii", label: "Concluzii" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-bold">
          <span className="grid place-items-center w-8 h-8 rounded-md bg-primary/15 text-primary border border-primary/30">
            <CircuitBoard className="w-4 h-4" />
          </span>
          <span className="hidden sm:inline">Transformata <span className="text-primary">Z</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Meniu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-card/90 backdrop-blur-xl">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm ${
                  pathname === l.to ? "bg-primary/15 text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
