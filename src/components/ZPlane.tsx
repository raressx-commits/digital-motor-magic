import { useMemo } from "react";

type Props = {
  poleReal: number;
  poleImag?: number;
  size?: number;
};

// Visualize the unit circle and the system pole in the Z-plane.
export function ZPlane({ poleReal, poleImag = 0, size = 280 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const scale = (size - 60) / 2 / 1.6; // visible range ~[-1.6, 1.6]
  const px = cx + poleReal * scale;
  const py = cy - poleImag * scale;
  const mag = Math.hypot(poleReal, poleImag);
  const inside = mag < 1;

  const ticks = useMemo(() => [-1.5, -1, -0.5, 0.5, 1, 1.5], []);

  return (
    <svg width={size} height={size} className="block">
      {/* grid */}
      {ticks.map((t) => (
        <g key={t} stroke="oklch(0.4 0.04 250 / 0.25)" strokeWidth={1}>
          <line x1={cx + t * scale} y1={20} x2={cx + t * scale} y2={size - 20} />
          <line x1={20} y1={cy - t * scale} x2={size - 20} y2={cy - t * scale} />
        </g>
      ))}
      {/* axes */}
      <line x1={20} y1={cy} x2={size - 20} y2={cy} stroke="oklch(0.6 0.03 250)" strokeWidth={1.2} />
      <line x1={cx} y1={20} x2={cx} y2={size - 20} stroke="oklch(0.6 0.03 250)" strokeWidth={1.2} />
      {/* unit circle */}
      <circle
        cx={cx}
        cy={cy}
        r={scale}
        fill="oklch(0.78 0.22 145 / 0.06)"
        stroke="oklch(0.78 0.22 145 / 0.8)"
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />
      {/* labels */}
      <text x={size - 16} y={cy - 6} textAnchor="end" fill="oklch(0.7 0.03 250)" fontSize="11" fontFamily="JetBrains Mono">Re</text>
      <text x={cx + 6} y={22} fill="oklch(0.7 0.03 250)" fontSize="11" fontFamily="JetBrains Mono">Im</text>
      <text x={cx + scale + 4} y={cy + 14} fill="oklch(0.78 0.22 145)" fontSize="10" fontFamily="JetBrains Mono">|z|=1</text>
      {/* pole */}
      <g>
        <circle
          cx={px}
          cy={py}
          r={9}
          fill={inside ? "oklch(0.78 0.22 145)" : "oklch(0.65 0.26 25)"}
          opacity={0.25}
        />
        <circle
          cx={px}
          cy={py}
          r={5}
          fill={inside ? "oklch(0.78 0.22 145)" : "oklch(0.65 0.26 25)"}
          stroke="oklch(0.16 0.025 250)"
          strokeWidth={1.5}
        />
        <text
          x={px + 10}
          y={py - 8}
          fill={inside ? "oklch(0.78 0.22 145)" : "oklch(0.65 0.26 25)"}
          fontSize="11"
          fontFamily="JetBrains Mono"
        >
          z = {poleReal.toFixed(2)}
        </text>
      </g>
    </svg>
  );
}
