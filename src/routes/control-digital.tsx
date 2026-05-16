import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Card } from "@/components/Section";
import { Formula } from "@/components/Formula";
import { BlockDiagram } from "@/components/BlockDiagram";

export const Route = createFileRoute("/control-digital")({
  head: () => ({
    meta: [
      { title: "Control digital — referință, eroare, PWM" },
      { name: "description", content: "Cum funcționează un controller digital: referință, măsurare, eroare, comandă și semnal PWM." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="bucla de reglare"
        title={<>Control <span className="text-primary glow-text">digital</span></>}
        subtitle="Referință, măsurare, eroare, comandă — patru pași care se repetă la fiecare pas de timp."
      />

      <Section>
        <Card>
          <BlockDiagram />
        </Card>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-5">
          <Step n="1" title="Referința" math={String.raw`r[n] = 1000\ \text{rpm}`}
            text="Valoarea dorită — turația țintă pentru motor." />
          <Step n="2" title="Măsurarea" math={String.raw`y[n] = 850\ \text{rpm}`}
            text="Senzorul (encoder, tahometru) citește turația reală." />
          <Step n="3" title="Eroarea" math={String.raw`e[n] = r[n] - y[n] = 150`}
            text="Diferența dintre ce vrem și ce avem." />
          <Step n="4" title="Comanda" math={String.raw`u[n] = K\cdot e[n]`}
            text="Controllerul transformă eroarea în comandă. K bine ales → răspuns rapid și stabil." />
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl md:text-3xl font-bold">PWM — puntea între matematică și motor</h2>
        <p className="mt-3 text-muted-foreground max-w-3xl">
          PWM (Pulse Width Modulation) modulează lățimea impulsurilor electrice. Valoarea medie a tensiunii
          aplicate motorului depinde de factorul de umplere (duty cycle):
        </p>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Duty pct={20} label="putere mică" />
          <Duty pct={50} label="putere medie" />
          <Duty pct={90} label="putere mare" />
        </div>
        <p className="mt-6 text-muted-foreground max-w-3xl">
          Controllerul digital calculează comanda <Formula>{`u[n]`}</Formula>, iar această comandă devine
          factor de umplere PWM. Astfel, analiza în domeniul <Formula>{`z`}</Formula> are efect direct asupra
          comportamentului fizic al motorului.
        </p>
      </Section>
    </>
  );
}

function Step({ n, title, math, text }: { n: string; title: string; math: string; text: string }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-9 h-9 rounded-full bg-primary/15 text-primary font-display font-bold border border-primary/30">{n}</span>
        <h3 className="font-display text-xl font-bold">{title}</h3>
      </div>
      <Formula block>{math}</Formula>
      <p className="text-sm text-muted-foreground -mt-2">{text}</p>
    </Card>
  );
}

function Duty({ pct, label }: { pct: number; label: string }) {
  return (
    <div className="glow-card rounded-xl p-4">
      <div className="flex justify-between mono text-xs">
        <span className="text-muted-foreground">duty cycle</span>
        <span style={{ color: "var(--pwm)" }}>{pct}%</span>
      </div>
      <svg viewBox="0 0 200 60" className="w-full h-16 mt-2">
        {Array.from({ length: 4 }).map((_, i) => {
          const x = i * 50;
          const w = (pct / 100) * 50;
          return (
            <g key={i}>
              <rect x={x} y={10} width={w} height={28} fill="oklch(0.82 0.18 80)" />
              <rect x={x + w} y={38} width={50 - w} height={2} fill="oklch(0.82 0.18 80)" />
            </g>
          );
        })}
        <line x1={0} y1={50} x2={200} y2={50} stroke="oklch(0.5 0.03 250)" />
      </svg>
      <p className="text-sm mt-1">{label}</p>
    </div>
  );
}
