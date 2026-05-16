import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Card } from "@/components/Section";
import { Car, Bot, Plane, Factory, Fan, Cpu } from "lucide-react";

export const Route = createFileRoute("/aplicatii")({
  head: () => ({
    meta: [
      { title: "Aplicații reale — Vehicule electrice, drone, roboți" },
      { name: "description", content: "Unde se folosește în practică Transformata Z și controlul digital al motoarelor electrice." },
    ],
  }),
  component: Page,
});

const apps = [
  { icon: Car, title: "Vehicule electrice", text: "Controlul motoarelor de tracțiune cere accelerație lină, regenerare de energie și stabilitate la orice viteză." },
  { icon: Bot, title: "Roboți industriali", text: "Fiecare articulație trebuie să ajungă precis la o poziție sau turație — controlul digital este esențial." },
  { icon: Plane, title: "Drone & UAV", text: "Patru motoare controlate la kilohertz pentru menținerea echilibrului. Polii din planul Z trebuie strâns ținuți." },
  { icon: Factory, title: "Benzi transportoare", text: "Viteză constantă chiar și când sarcina mecanică variază — bucla de reglare compensează." },
  { icon: Fan, title: "Pompe & HVAC", text: "Reglare automată a debitului și eficiență energetică prin variația turației." },
  { icon: Cpu, title: "Invertoare & convertoare", text: "Algoritmi digitali pe DSP/microcontrolere modulează semnalele PWM în timp real." },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="în lumea reală"
        title={<>Aplicații în <span className="text-primary glow-text">Inginerie Electrică</span></>}
        subtitle="Controlul digital al motoarelor este peste tot — de la mașini electrice la drone și roboți industriali."
      />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((a) => (
            <Card key={a.title} className="group hover:border-primary/50 transition">
              <div className="w-11 h-11 rounded-xl grid place-items-center bg-primary/15 text-primary border border-primary/30">
                <a.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold mt-4">{a.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{a.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Control bun vs control nepotrivit</h2>
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <div className="rounded-2xl p-6 border" style={{ borderColor: "var(--unstable)", background: "color-mix(in oklab, var(--unstable) 8%, transparent)" }}>
            <div className="mono text-xs uppercase tracking-wider" style={{ color: "var(--unstable)" }}>control instabil</div>
            <h3 className="font-display text-xl font-bold mt-1">Ce vezi?</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Câștig K prea mare</li>
              <li>Răspuns oscilant</li>
              <li>Motorul depășește mult turația dorită</li>
              <li>Sistemul nu se stabilizează</li>
              <li>Pol în afara cercului unitate</li>
            </ul>
          </div>
          <div className="rounded-2xl p-6 border" style={{ borderColor: "var(--stable)", background: "color-mix(in oklab, var(--stable) 8%, transparent)" }}>
            <div className="mono text-xs uppercase tracking-wider" style={{ color: "var(--stable)" }}>control stabil</div>
            <h3 className="font-display text-xl font-bold mt-1">Ce vrem?</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Câștig K bine ales</li>
              <li>Răspuns rapid</li>
              <li>Oscilații reduse</li>
              <li>Turația converge la referință</li>
              <li>Pol în interiorul cercului unitate</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
