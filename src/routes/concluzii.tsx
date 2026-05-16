import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, Card } from "@/components/Section";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/concluzii")({
  head: () => ({
    meta: [
      { title: "Concluzii și bibliografie" },
      { name: "description", content: "Sinteza proiectului și legătura cu materia de la curs." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="sinteză"
        title={<>De la formulă la <span className="text-primary glow-text">motor real</span></>}
        subtitle="Transformata Z aduce sistemele discrete în domeniul algebric — exact ce ne trebuie pentru controlul digital."
      />

      <Section>
        <Card className="p-8 md:p-10">
          <p className="text-lg leading-relaxed text-foreground/90">
            Transformata Z permite analiza sistemelor discrete, iar controlul digital al motoarelor electrice
            este un exemplu direct în care această transformare devine utilă.
            Prin poziția polilor în planul <span className="text-primary mono">Z</span> se poate determina
            stabilitatea sistemului, iar prin analiza răspunsului tranzitoriu se poate evalua calitatea controlului.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-foreground/90">
            Astfel, o noțiune din <span className="text-primary">Calcul Operațional</span> devine un instrument
            real pentru <span className="text-primary">Ingineria Electrică</span> modernă.
          </p>
        </Card>
      </Section>

      <Section>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Ce am acoperit</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {[
            "Definiția Transformatei Z",
            "Legătura cu Transformata Laplace și Calculul Operațional",
            "Model discret al motorului electric",
            "Schemă bloc a sistemului de control",
            "Eroarea e[n] = r[n] − y[n]",
            "Funcția de transfer H(z)",
            "Polii în planul Z și cercul unitate",
            "Criteriul de stabilitate |z| < 1",
            "Răspuns tranzitoriu",
            "Legătura cu PWM",
            "Aplicații reale în Inginerie Electrică",
          ].map((it, i) => (
            <div key={it} className="flex items-start gap-3 rounded-xl border border-border p-4 bg-card/40">
              <span className="mono text-xs text-primary mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm">{it}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Bibliografie</h2>
        <div className="mt-4 space-y-2 text-muted-foreground">
          <p>· Cursul 9–10 — Serii și Transformata Fourier</p>
          <p>· Cursul 11 — Transformata Laplace</p>
          <p>· Cursul 12 — Transformata Z (definiție, funcție original/imagine)</p>
          <p>· Note de seminar: ecuații de recurență, funcția de transfer H(z)</p>
          <p>· Bibliografie suport: K. Ogata — Discrete-Time Control Systems</p>
        </div>
        <Link to="/transformata-z"
          className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[var(--shadow-glow)]">
          Revino la teorie <ArrowRight className="w-4 h-4" />
        </Link>
      </Section>
    </>
  );
}
