import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Card } from "@/components/Section";
import { Formula } from "@/components/Formula";
import { MotorVisual } from "@/components/MotorVisual";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

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
  const [u, setU] = useState(0.6);
  return (
    <>
      <PageHero
        eyebrow="aplicație"
        title={<>De la motor electric la <span className="text-primary glow-text">model matematic</span></>}
        subtitle="Intrare, ieșire, perturbații și controller — toate într-o singură ecuație de recurență."
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Card className="aspect-square max-w-md mx-auto w-full p-4">
            <MotorVisual speed={u * 4} />
            <div className="mt-2 px-2">
              <div className="flex justify-between text-xs mono">
                <span className="text-muted-foreground">comandă u</span>
                <span className="text-primary">{u.toFixed(2)}</span>
              </div>
              <Slider value={[u]} min={0} max={1} step={0.01} onValueChange={(v) => setU(v[0])} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Mărește comanda și motorul accelerează. Animația leagă matematica de fizica reală.
              </p>
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
            <div className="mt-6">
              <Formula block>{String.raw`y[n+1] = a\, y[n] + b\, u[n]`}</Formula>
              <div className="grid sm:grid-cols-2 gap-3 mt-2 text-sm">
                <Item k="y[n]" v="turația motorului la pasul n" />
                <Item k="u[n]" v="comanda aplicată motorului" />
                <Item k="a"   v="cât din starea anterioară se păstrează" />
                <Item k="b"   v="cât de puternic influențează comanda motorul" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-5">
          <Behaviour color="oklch(0.78 0.22 145)" title="a ≈ 1" text="Motorul reacționează lent și păstrează mult din starea anterioară." />
          <Behaviour color="oklch(0.72 0.18 240)" title="a mic" text="Sistemul se stabilizează rapid la valoarea dorită." />
          <Behaviour color="oklch(0.65 0.26 25)" title="parametri prost aleși" text="Sistemul poate oscila puternic sau deveni instabil." />
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
