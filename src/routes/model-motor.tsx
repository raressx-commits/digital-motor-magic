import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Card } from "@/components/Section";
import { Formula } from "@/components/Formula";

export const Route = createFileRoute("/model-motor")({
  head: () => ({
    meta: [
      { title: "Modelul discret al motorului electric" },
      { name: "description", content: "Reprezentarea motorului ca sistem cu intrare, ieșire și ecuație de recurență y[n+1] = a·y[n] + b·u[n]." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="aplicație"
        title={<>De la motor electric la <span className="text-primary glow-text">model matematic</span></>}
        subtitle="Intrare, ieșire, perturbații și controller — toate într-o singură ecuație de recurență."
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <Card className="p-6">
            <div className="text-xs mono uppercase tracking-wider text-muted-foreground">ecuația de recurență</div>
            <h3 className="font-display text-xl font-bold mt-1">Modelul discret al motorului</h3>
            <Formula block>{String.raw`y[n+1] = a\, y[n] + b\, u[n]`}</Formula>
            <p className="text-sm text-muted-foreground">
              Pornind de la tipul de ecuații cu recurență studiate la Transformata Z,
              modelăm simplificat sistemul digital prin această relație.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
              <Item k="y[n]" v="ieșirea sistemului la pasul n (turația motorului)" />
              <Item k="u[n]" v="intrarea sistemului la pasul n (semnalul de comandă)" />
              <Item k="a"   v="cât din starea anterioară se păstrează" />
              <Item k="b"   v="cât de puternic influențează comanda evoluția sistemului" />
            </div>
          </Card>

          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Un motor ca sistem</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li><span className="text-foreground font-medium">Intrare:</span> tensiune, curent sau semnal PWM</li>
              <li><span className="text-foreground font-medium">Ieșire:</span> turație, poziție sau cuplu</li>
              <li><span className="text-foreground font-medium">Perturbații:</span> sarcină mecanică, frecare, variații de tensiune</li>
              <li><span className="text-foreground font-medium">Controller:</span> algoritm digital care modifică intrarea</li>
            </ul>

            <Card className="mt-6 p-5">
              <div className="text-xs mono uppercase tracking-wider text-muted-foreground">funcția de transfer</div>
              <Formula block>{String.raw`H(z) = \dfrac{Y(z)}{U(z)}`}</Formula>
              <p className="text-sm text-muted-foreground">
                Pentru un sistem discret simplificat, o formă posibilă este:
              </p>
              <Formula block>{String.raw`H(z) = \dfrac{b}{z - a}`}</Formula>
              <p className="text-sm text-muted-foreground">
                Numitorul determină polii sistemului. În exemplul de mai sus, polul este <Formula>{`z = a`}</Formula>.
                Stabilitatea depinde de poziția acestui pol în planul complex <Formula>{`z`}</Formula>.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-5">
          <Behaviour color="oklch(0.78 0.22 145)" title="a ≈ 1" text="Motorul reacționează lent și păstrează mult din starea anterioară." />
          <Behaviour color="oklch(0.72 0.18 240)" title="a mic" text="Sistemul se stabilizează rapid la valoarea dorită." />
          <Behaviour color="oklch(0.65 0.26 25)" title="parametri nepotriviți" text="Sistemul poate oscila puternic sau deveni instabil." />
        </div>
      </Section>
    </>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-3">
      <code className="mono text-primary w-12">{k}</code>
      <span className="text-muted-foreground">{v}</span>
    </div>
  );
}

function Behaviour({ color, title, text }: { color: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: color, background: `color-mix(in oklab, ${color} 8%, transparent)` }}>
      <div className="font-display text-lg font-bold" style={{ color }}>{title}</div>
      <p className="text-sm text-muted-foreground mt-2">{text}</p>
    </div>
  );
}
