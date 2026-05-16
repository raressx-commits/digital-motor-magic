import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,
} from "recharts";
import type { SimSample } from "@/lib/motor-sim";

export function ResponseChart({ data, reference, height = 280 }: { data: SimSample[]; reference: number; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -8 }}>
        <CartesianGrid stroke="oklch(0.35 0.03 250 / 0.25)" strokeDasharray="2 4" />
        <XAxis dataKey="n" stroke="oklch(0.6 0.03 250)" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} />
        <YAxis stroke="oklch(0.6 0.03 250)" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} />
        <Tooltip
          contentStyle={{
            background: "oklch(0.21 0.03 250)",
            border: "1px solid oklch(0.4 0.05 245)",
            borderRadius: 8,
            fontFamily: "JetBrains Mono",
            fontSize: 12,
          }}
          labelFormatter={(l) => `n = ${l}`}
          formatter={(v: number) => Number(v).toFixed(2)}
        />
        <ReferenceLine y={reference} stroke="oklch(0.82 0.18 80)" strokeDasharray="6 4" label={{ value: "referință", position: "insideTopRight", fill: "oklch(0.82 0.18 80)", fontSize: 11 }} />
        <Line type="monotone" dataKey="y" name="turație y[n]" stroke="oklch(0.72 0.18 240)" strokeWidth={2.5} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
