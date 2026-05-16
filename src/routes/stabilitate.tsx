import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Card } from "@/components/Section";
import { Formula } from "@/components/Formula";
import { ZPlane } from "@/components/ZPlane";
import { ResponseChart } from "@/components/ResponseChart";
import { simulate, stabilityVerdict } from "@/lib/motor-sim";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/stabilitate")({
  head: () => ({
    meta: [
      { title: "Stabilitatea în planul Z — Cercul unitate" },
      { name: "description", content: "Criteriul |z| < 1, planul Z și răspunsul tranzitoriu pentru sisteme discrete." },
    ],
  }),
  component: Page,
});

function Page() {
  const [pole, setPole] = useState(0.6);
  // model y[n+1] = pole * y[n] + (1-pole) * r  (so steady-state = r)
  const data = simulate({ a: pole, b: 1 - Math.min(0.99, Math.abs(pole)), K: 0, r: 1, N: 50, y0: 0 });
  // Direct iteration with our chosen pole
  const direct: { n: number; y: number; r: number; u: number }[] = [];
  let y = 0;
  for (let n = 0; n < 40; n++) {
    direct.push({ n, y, r: 1, u: 0 });
    y = pole * y + (1 - pole) * 1; // converges to 1 if |pole|<1
  }
  void data;
  const v = stabilityVerdict(pole);

  return (
    <>
      <PageHero
        eyebrow="criteriu fundamental"
        title={<>Cercul unitate <span className="text-primary glow-text">|z| &lt; 1</span></>}
        subtitle="Un sistem discret este stabil dacă toți polii săi sunt în interiorul cercului unitate. Iese un pol → sistemul divergează."
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="flex flex-col items-center">
            <ZPlane poleReal={pole} size={320} />
            <div className="w-full mt-4">
              <div className="flex justify-between text-sm">
                <span>Poziția polului</span>
                <span className="mono text-primary">z = {pole.toFixed(2)}</span>
              </div>
              <Slider value={[pole]} min={-1.4} max={1.4} step={0.01} onValueChange={(v) => setPole(v[0])} className="mt-2" />
            </div>
          </Card>

          <Card>
            <div className="mono text-xs uppercase text-muted-foreground">Răspunsul în timp</div>
            <ResponseChart data={direct} reference={1} />
            <div className="mt-4 rounded-xl p-4 border"
              style={{
                borderColor: v.status === "stable" ? "var(--stable)" : v.status === "unstable" ? "var(--unstable)" : "var(--pwm)",
                background: v.status === "stable" ? "color-mix(in oklab, var(--stable) 10%, transparent)" : v.status === "unstable" ? "color-mix(in oklab, var(--unstable) 10%, transparent)" : "color-mix(in oklab, var(--pwm) 10%, transparent)",
              }}>
              <div className="font-display font-bold">{v.label}</div>
              <p className="text-sm text-muted-foreground mt-1">{v.explanation}</p>
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Trei cazuri tipice</h2>
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          <Case z="0.6"  status="stable" txt="Convergent, fără oscilații. Cazul ideal pentru un motor lin." />
          <Case z="-0.8" status="alt"    txt="Convergent, dar cu oscilații alternante — semnul se schimbă la fiecare pas." />
          <Case z="1.2"  status="unstable" txt="|z| > 1 → divergent. Turația motorului ar exploda numeric." />
        </div>
      </Section>

      <Section>
        <Card className="p-8">
          <h3 className="font-display text-xl font-bold">De ce contează în Inginerie Electrică?</h3>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            În sistemele continue, stabilitatea se analizează prin poziția polilor în planul <Formula>{`s`}</Formula>
            (semiplanul stâng). În sistemele discrete, criteriul corespunzător este cercul unitate din planul <Formula>{`z`}</Formula>.
            Pentru controlul digital al motorului, alegerea parametrilor controllerului trebuie să păstreze polii buclei închise
            în interiorul cercului unitate.
          </p>
        </Card>
      </Section>
    </>
  );
}

function Case({ z, status, txt }: { z: string; status: "stable" | "alt" | "unstable"; txt: string }) {
  const map = {
    stable:   { c: "var(--stable)",   l: "STABIL" },
    alt:      { c: "var(--pwm)",      l: "STABIL · oscilant" },
    unstable: { c: "var(--unstable)", l: "INSTABIL" },
  } as const;
  const m = map[status];
  return (
    <div className="rounded-2xl p-5 border" style={{ borderColor: m.c, background: `color-mix(in oklab, ${m.c} 8%, transparent)` }}>
      <div className="mono text-xs uppercase tracking-wider" style={{ color: m.c }}>{m.l}</div>
      <div className="font-display text-2xl font-bold mt-1 mono">z = {z}</div>
      <p className="text-sm text-muted-foreground mt-2">{txt}</p>
    </div>
  );
}
