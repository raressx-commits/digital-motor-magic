import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Cpu, Gauge, Sigma, Activity, Waves, Circle } from "lucide-react";
import { BlockDiagram } from "@/components/BlockDiagram";
import { ZPlane } from "@/components/ZPlane";
import { Section, Card } from "@/components/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Transformata Z în controlul digital al motoarelor electrice" },
      { name: "description", content: "Stabilitate, răspuns tranzitoriu și aplicații în Inginerie Electrică." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pill text-primary border-primary/40">
              <Sigma className="w-3.5 h-3.5" /> Calcul Operațional · Cursul 12
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight"
            >
              Transformata <span className="text-primary glow-text">Z</span> în controlul digital al motoarelor electrice
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="mt-5 text-lg text-muted-foreground max-w-xl"
            >
              Stabilitate, răspuns tranzitoriu și aplicații în Inginerie Electrică. De la
              ecuația de recurență <code className="mono text-primary">y[n+1] = a·y[n] + b·u[n]</code> la
              polii din planul Z.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-8 flex flex-wrap gap-3">
              <Link to="/transformata-z"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[var(--shadow-glow)]">
                Vezi teoria <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/stabilitate"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border hover:bg-accent transition">
                Criteriul |z| &lt; 1
              </Link>
            </motion.div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <Stat icon={Cpu} label="microcontroler" value="10 ms" />
              <Stat icon={Gauge} label="turație țintă" value="rpm" />
              <Stat icon={Activity} label="poli |z|" value="< 1" />
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
            <Card className="relative p-6 w-full">
              <div className="text-xs mono uppercase tracking-wider text-muted-foreground">planul Z</div>
              <h3 className="font-display text-lg font-semibold mt-1 mb-3">Pol în interiorul cercului unitate</h3>
              <div className="flex justify-center">
                <ZPlane poleReal={0.6} size={320} />
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* INTRO TEXT */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="pill"><Waves className="w-3.5 h-3.5" /> de la continuu la discret</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">De ce avem nevoie de Transformata Z?</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Motoarele electrice moderne nu mai sunt controlate doar analogic, ci prin sisteme digitale:
              microcontrolere, convertoare, invertoare și algoritmi de reglare. Un microcontroler citește
              turația la fiecare 10 ms, compară valoarea cu turația dorită și modifică semnalul PWM. Sistemul
              nu mai este descris doar prin funcții continue <code className="mono text-primary">x(t)</code>,
              ci prin șiruri:
            </p>
            <p className="mt-3 mono text-primary">x[0], x[1], x[2], …</p>
            <p className="mt-3 text-muted-foreground">Exact aici intră Transformata Z.</p>
          </div>
          <Card className="p-7">
            <div className="text-xs mono uppercase tracking-wider text-muted-foreground">Schemă bloc</div>
            <h3 className="font-display text-lg font-semibold mt-1 mb-3">Lanțul controlului digital</h3>
            <BlockDiagram />
          </Card>
        </div>
      </Section>

      {/* FEATURES */}
      <Section className="!py-8">
        <div className="grid md:grid-cols-3 gap-5">
          <FeatureCard
            icon={Sigma}
            color="electric"
            title="Definiție & legătură cu Laplace"
            text="Transformata Z face pentru sistemele discrete ceea ce Laplace face pentru cele continue."
            to="/transformata-z"
          />
          <FeatureCard
            icon={Circle}
            color="stable"
            title="Cercul unitate"
            text="Un sistem discret este stabil dacă toți polii săi se află în interiorul cercului |z| < 1."
            to="/stabilitate"
          />
          <FeatureCard
            icon={Gauge}
            color="pwm"
            title="Control digital & PWM"
            text="Bucla referință → eroare → comandă → PWM, pas cu pas."
            to="/control-digital"
          />
        </div>
      </Section>

      {/* COMPARE TEACHING TOPICS */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <div className="pill mx-auto">legătura cu cursul</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">De la Fourier la Z</h2>
          <p className="mt-3 text-muted-foreground">Trei instrumente, trei tipuri de sisteme — toate trei în Calcul Operațional.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          <CompareCard
            tag="Curs 9–10" title="Sistem periodic"
            color="oklch(0.82 0.18 80)"
            signal="f(t) periodic"
            tool="Serii / Transformata Fourier"
            app="armonici, semnale AC"
          />
          <CompareCard
            tag="Curs 11" title="Sistem continuu"
            color="oklch(0.72 0.18 240)"
            signal="x(t)"
            tool="Transformata Laplace"
            app="circuite, ecuații diferențiale"
          />
          <CompareCard
            tag="Curs 12" title="Sistem discret"
            color="oklch(0.78 0.22 145)"
            signal="x[n]"
            tool="Transformata Z"
            app="control digital, motoare, microcontrolere"
            highlight
          />
        </div>
      </Section>
    </>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Cpu; label: string; value: string }) {
  return (
    <div className="glow-card rounded-xl p-3">
      <Icon className="w-4 h-4 text-primary" />
      <div className="font-display font-bold mt-2 text-lg">{value}</div>
      <div className="text-[11px] uppercase tracking-wider mono text-muted-foreground">{label}</div>
    </div>
  );
}

function FeatureCard({ icon: Icon, color, title, text, to }: {
  icon: typeof Cpu; color: "electric" | "stable" | "pwm"; title: string; text: string; to: string;
}) {
  const c = `var(--${color})`;
  return (
    <Link to={to} className="glow-card rounded-2xl p-6 group hover:border-primary/50 transition-all hover:-translate-y-0.5">
      <div className="w-10 h-10 rounded-lg grid place-items-center" style={{ background: `color-mix(in oklab, ${c} 15%, transparent)`, color: c }}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      <div className="mt-4 text-sm text-primary inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        Citește mai mult <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

function CompareCard({ tag, title, color, signal, tool, app, highlight }: {
  tag: string; title: string; color: string; signal: string; tool: string; app: string; highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl p-6 border relative overflow-hidden"
      style={{
        borderColor: highlight ? color : "var(--border)",
        background: highlight
          ? `linear-gradient(180deg, color-mix(in oklab, ${color} 15%, transparent), transparent)`
          : "oklch(0.22 0.04 250 / 0.6)",
        boxShadow: highlight ? `0 0 30px color-mix(in oklab, ${color} 25%, transparent)` : undefined,
      }}>
      <div className="mono text-[11px] uppercase tracking-wider" style={{ color }}>{tag}</div>
      <h3 className="mt-1 font-display text-xl font-bold">{title}</h3>
      <dl className="mt-4 space-y-2 text-sm">
        <Row k="Semnal" v={<code className="mono">{signal}</code>} />
        <Row k="Instrument" v={tool} />
        <Row k="Aplicație" v={app} />
      </dl>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-t border-border/60 pt-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
