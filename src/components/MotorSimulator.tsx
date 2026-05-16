import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { simulate, closedLoopPole, stabilityVerdict } from "@/lib/motor-sim";
import { ZPlane } from "./ZPlane";
import { ResponseChart } from "./ResponseChart";
import { Gauge, Zap } from "lucide-react";

export function MotorSimulator() {
  const [a, setA] = useState(0.7);
  const [b, setB] = useState(0.3);
  const [K, setK] = useState(1);
  const [r, setR] = useState(1500);

  const data = useMemo(() => simulate({ a, b, K, r, N: 60 }), [a, b, K, r]);
  const pole = closedLoopPole(a, b, K);
  const verdict = stabilityVerdict(pole);
  const lastY = data[data.length - 1].y;

  const color =
    verdict.status === "stable" ? "var(--stable)" :
    verdict.status === "unstable" ? "var(--unstable)" : "var(--pwm)";

  return (
    <div className="glow-card rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-4 h-4 text-primary" />
        <span className="pill">Simulator interactiv</span>
      </div>
      <h3 className="font-display text-2xl md:text-3xl font-bold mt-3">Controlează digital un motor electric</h3>
      <p className="text-muted-foreground mt-1 text-sm">
        Modifică parametrii sistemului discret <code className="mono text-primary">y[n+1] = a·y[n] + b·u[n]</code> și
        regulatorul proporțional <code className="mono text-primary">u[n] = K·(r − y[n])</code>.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <SliderRow label="a — păstrarea stării" value={a} min={0} max={1.3} step={0.01} onChange={setA}
            help="Aproape de 1 → motor lent. Mai mic → reacționează rapid." />
          <SliderRow label="b — influența comenzii" value={b} min={0.1} max={1} step={0.01} onChange={setB} />
          <SliderRow label="K — câștigul controllerului" value={K} min={0} max={3} step={0.01} onChange={setK}
            help="Prea mic → lent. Prea mare → oscilații sau instabilitate." />
          <SliderRow label="Referință (rpm)" value={r} min={500} max={3000} step={50} onChange={setR} integer />
          <div className="mt-2">
            <ResponseChart data={data} reference={r} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="glow-card rounded-xl p-4 flex flex-col items-center">
            <ZPlane poleReal={pole} />
            <div className="mono text-xs text-muted-foreground mt-2">
              pol închis: z = a − b·K = <span className="text-primary">{pole.toFixed(3)}</span>
            </div>
          </div>

          <div
            className="rounded-xl p-4 border"
            style={{
              borderColor: `color-mix(in oklab, ${color} 50%, transparent)`,
              background: `color-mix(in oklab, ${color} 12%, transparent)`,
              boxShadow: `0 0 30px color-mix(in oklab, ${color} 25%, transparent)`,
            }}
          >
            <div className="mono text-[11px] uppercase tracking-wider opacity-80">Verdict</div>
            <div className="font-display text-xl font-bold mt-1" style={{ color: `oklch(from ${color} l c h)` }}>
              {verdict.label}
            </div>
            <p className="text-sm mt-2 text-foreground/85">{verdict.explanation}</p>
          </div>

          <div className="glow-card rounded-xl p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mono uppercase">
              <Gauge className="w-3.5 h-3.5" /> Turația curentă
            </div>
            <div className="font-display text-3xl font-bold mt-1">
              {isFinite(lastY) ? lastY.toFixed(0) : "—"} <span className="text-sm font-normal text-muted-foreground">rpm</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1 mono">eroare finală: {(r - lastY).toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderRow({
  label, value, min, max, step, onChange, help, integer,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; help?: string; integer?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="mono text-sm text-primary">{integer ? value.toFixed(0) : value.toFixed(2)}</span>
      </div>
      <Slider
        className="mt-2"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      />
      {help && <p className="text-xs text-muted-foreground mt-1.5">{help}</p>}
    </div>
  );
}
