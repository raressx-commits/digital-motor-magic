import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Card } from "@/components/Section";
import { Formula } from "@/components/Formula";

export const Route = createFileRoute("/transformata-z")({
  head: () => ({
    meta: [
      { title: "Transformata Z — Definiție și legătură cu Laplace" },
      { name: "description", content: "Definiția Transformatei Z, legătura cu Transformata Laplace și rolul ei în analiza sistemelor discrete." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Curs 12 · Calcul Operațional"
        title={<>De ce <span className="text-primary glow-text">Transformata Z</span>?</>}
        subtitle="Varianta discretă a Transformatei Laplace — pentru funcții definite pe mulțimea numerelor naturale."
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-2xl font-bold">Definiție</h2>
            <p className="mt-3 text-muted-foreground">
              Fie <Formula>{`f(n)`}</Formula> o funcție original discretă, definită pe mulțimea numerelor naturale.
              Imaginea sa prin Transformata Z este funcția <Formula>{`F(z)`}</Formula> dată de seria:
            </p>
            <Formula block>{String.raw`F(z) = \mathcal{Z}\{f(n)\} = \sum_{n=0}^{\infty} f(n)\, z^{-n}`}</Formula>
            <p className="text-muted-foreground">
              unde <Formula>{`z \\in \\mathbb{C}`}</Formula> aparține unei regiuni de convergență.
              Transformata Z face pentru sistemele discrete exact ceea ce Transformata Laplace face pentru cele continue.
            </p>
          </div>

          <Card>
            <div className="mono text-xs uppercase tracking-wider text-muted-foreground">analogie</div>
            <h3 className="font-display text-xl font-bold mt-1">Laplace ↔ Z</h3>
            <p className="text-sm text-muted-foreground mt-2">
              În curs, Transformata Laplace este notată cu variabila complexă <Formula>{`p`}</Formula>:
            </p>
            <Formula block>{String.raw`F(p) = \mathcal{L}\{f(t)\} = \int_0^\infty f(t)\, e^{-pt}\, dt`}</Formula>
            <p className="text-sm text-muted-foreground">
              unde <Formula>{`f(t)`}</Formula> este funcția originală, iar <Formula>{`F(p)`}</Formula> este funcția imagine.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="mono text-xs text-muted-foreground">CONTINUU</div>
                <Formula block>{String.raw`F(p) = \int_0^\infty f(t)\, e^{-pt}\, dt`}</Formula>
                <p className="text-muted-foreground">funcții continue · ecuații diferențiale</p>
              </div>
              <div>
                <div className="mono text-xs text-muted-foreground">DISCRET</div>
                <Formula block>{String.raw`F(z) = \sum_{n=0}^\infty f(n)\, z^{-n}`}</Formula>
                <p className="text-muted-foreground">funcții discrete · ecuații cu recurențe</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Ce câștigăm în practică?</h2>
        <p className="mt-3 text-muted-foreground max-w-3xl">
          În loc să lucrăm direct cu ecuații de recurență, le transformăm în ecuații algebrice în <Formula>{`z`}</Formula>,
          mai ușor de analizat. Pornind de la o ecuație simplă:
        </p>
        <Formula block>{String.raw`y[n+1] = a\, y[n] + b\, u[n]`}</Formula>
        <p className="text-muted-foreground max-w-3xl">
          Prin Transformata Z putem studia direct:
        </p>
        <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            ["Stabilitatea", "Sistemul converge sau divergează?"],
            ["Viteza de răspuns", "Cât de repede ajunge la valoarea dorită?"],
            ["Oscilațiile", "Există supracreștere sau oscilații alternante?"],
            ["Eroarea staționară", "Cât rămâne motorul depărtat de referință?"],
            ["Influența parametrilor", "Cum schimbă K comportamentul sistemului?"],
            ["Funcția de transfer", "Modelul algebric H(z) = Y(z)/U(z)"],
          ].map(([t, d]) => (
            <Card key={t} className="p-5">
              <div className="font-display font-semibold">{t}</div>
              <div className="text-sm text-muted-foreground mt-1">{d}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Card className="p-8">
          <div className="pill text-primary border-primary/40">exemple simple</div>
          <h2 className="font-display text-2xl font-bold mt-3">Transformate de bază</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
            <Example f={String.raw`\delta[n]`} F={String.raw`1`} note="impuls unitar" />
            <Example f={String.raw`1[n]`} F={String.raw`\dfrac{z}{z-1},\ |z|>1`} note="treaptă unitară" />
            <Example f={String.raw`a^n`} F={String.raw`\dfrac{z}{z-a},\ |z|>|a|`} note="exponențial discret" />
          </div>
        </Card>
      </Section>
    </>
  );
}

function Example({ f, F, note }: { f: string; F: string; note: string }) {
  return (
    <div className="rounded-xl border border-border p-4 bg-card/50">
      <div className="text-xs mono uppercase text-muted-foreground">{note}</div>
      <div className="mt-2 flex items-center gap-3">
        <Formula>{f}</Formula>
        <span className="text-primary">→</span>
        <Formula>{F}</Formula>
      </div>
    </div>
  );
}
