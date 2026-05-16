import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Card } from "@/components/Section";
import { MotorSimulator } from "@/components/MotorSimulator";
import { Formula } from "@/components/Formula";

export const Route = createFileRoute("/simulator")({
  head: () => ({
    meta: [
      { title: "Simulator interactiv — Control digital de motor" },
      { name: "description", content: "Modifică K, a, b și referința. Vezi polul în planul Z și răspunsul motorului în timp real." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="piesa centrală"
        title={<>Simulator <span className="text-primary glow-text">interactiv</span></>}
        subtitle="Modifică parametrii și observă în timp real polul din planul Z, răspunsul tranzitoriu și verdictul de stabilitate."
      />
      <Section>
        <MotorSimulator />
      </Section>

      <Section>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Ce calculează simulatorul?</h2>
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          <Card>
            <div className="mono text-xs uppercase text-muted-foreground">eroare</div>
            <Formula block>{String.raw`e[n] = r[n] - y[n]`}</Formula>
          </Card>
          <Card>
            <div className="mono text-xs uppercase text-muted-foreground">comandă</div>
            <Formula block>{String.raw`u[n] = K\, e[n]`}</Formula>
          </Card>
          <Card>
            <div className="mono text-xs uppercase text-muted-foreground">dinamică</div>
            <Formula block>{String.raw`y[n+1] = a\, y[n] + b\, u[n]`}</Formula>
          </Card>
        </div>
        <p className="mt-6 text-muted-foreground max-w-3xl">
          În buclă închisă, polul sistemului devine <Formula>{`z = a - bK`}</Formula>.
          Sistemul este stabil dacă <Formula>{`|a - bK| < 1`}</Formula>.
        </p>
      </Section>

      <Section>
        <Card className="p-8">
          <h3 className="font-display text-xl font-bold">Exemplu numeric complet</h3>
          <p className="text-muted-foreground mt-2">Modelul discret cu <Formula>{`a = 0.7,\\ b = 0.3`}</Formula>:</p>
          <Formula block>{String.raw`y[n+1] = 0.7\, y[n] + 0.3\, u[n],\quad u[n] = K\,(r[n] - y[n])`}</Formula>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-xl p-4 border" style={{ borderColor: "var(--stable)", background: "color-mix(in oklab, var(--stable) 8%, transparent)" }}>
              <div className="mono text-xs" style={{ color: "var(--stable)" }}>K = 1 → STABIL</div>
              <Formula block>{String.raw`y[n+1] = 0.4\, y[n] + 0.3\, r[n],\ \ z = 0.4`}</Formula>
              <p className="text-sm text-muted-foreground">Motorul ajunge la turația dorită fără oscilații mari.</p>
            </div>
            <div className="rounded-xl p-4 border" style={{ borderColor: "var(--pwm)", background: "color-mix(in oklab, var(--pwm) 8%, transparent)" }}>
              <div className="mono text-xs" style={{ color: "var(--pwm)" }}>K = 5 → STABIL cu oscilații</div>
              <Formula block>{String.raw`y[n+1] = -0.8\, y[n] + 1.5\, r[n],\ \ z = -0.8`}</Formula>
              <p className="text-sm text-muted-foreground">|z| &lt; 1 dar negativ → oscilații alternante.</p>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}
