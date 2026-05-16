// Control-loop block diagram, SVG, theme-tokenized.
export function BlockDiagram() {
  return (
    <svg viewBox="0 0 760 200" className="w-full h-auto">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(0.72 0.18 240)" />
        </marker>
      </defs>
      {/* nodes */}
      {[
        { x: 30,  label: "Referință r[n]", color: "oklch(0.82 0.18 80)" },
        { x: 200, label: "Controller", color: "oklch(0.72 0.18 240)" },
        { x: 360, label: "Driver PWM",  color: "oklch(0.82 0.18 80)" },
        { x: 520, label: "Motor",       color: "oklch(0.72 0.18 240)" },
        { x: 660, label: "Senzor y[n]", color: "oklch(0.78 0.22 145)" },
      ].map((n, i) => (
        <g key={i}>
          <rect x={n.x} y="70" width="100" height="60" rx="10"
            fill="oklch(0.22 0.04 250)" stroke={n.color} strokeWidth="1.5" />
          <text x={n.x + 50} y="105" textAnchor="middle" fill="oklch(0.96 0.01 240)"
            fontSize="12" fontFamily="Inter">{n.label}</text>
        </g>
      ))}
      {/* summing junction */}
      <circle cx="160" cy="100" r="14" fill="oklch(0.16 0.025 250)" stroke="oklch(0.72 0.18 240)" />
      <text x="160" y="104" textAnchor="middle" fill="oklch(0.72 0.18 240)" fontSize="14">Σ</text>
      <text x="148" y="92" fill="oklch(0.78 0.22 145)" fontSize="11">+</text>
      <text x="160" y="128" textAnchor="middle" fill="oklch(0.65 0.26 25)" fontSize="11">−</text>
      {/* arrows */}
      <line x1="130" y1="100" x2="146" y2="100" stroke="oklch(0.72 0.18 240)" strokeWidth="2" markerEnd="url(#arr)" />
      <line x1="174" y1="100" x2="200" y2="100" stroke="oklch(0.72 0.18 240)" strokeWidth="2" markerEnd="url(#arr)" />
      <line x1="300" y1="100" x2="360" y2="100" stroke="oklch(0.72 0.18 240)" strokeWidth="2" markerEnd="url(#arr)" />
      <line x1="460" y1="100" x2="520" y2="100" stroke="oklch(0.72 0.18 240)" strokeWidth="2" markerEnd="url(#arr)" />
      <line x1="620" y1="100" x2="660" y2="100" stroke="oklch(0.72 0.18 240)" strokeWidth="2" markerEnd="url(#arr)" />
      {/* feedback */}
      <polyline points="710,100 740,100 740,170 160,170 160,114"
        fill="none" stroke="oklch(0.78 0.22 145)" strokeWidth="2" markerEnd="url(#arr)" />
      <text x="240" y="42" fill="oklch(0.72 0.18 240)" fontSize="11" fontFamily="JetBrains Mono">e[n] = r[n] − y[n]</text>
      <text x="380" y="58" fill="oklch(0.82 0.18 80)" fontSize="11" fontFamily="JetBrains Mono">u[n] = K · e[n]</text>
      <text x="440" y="188" fill="oklch(0.78 0.22 145)" fontSize="11" fontFamily="JetBrains Mono">buclă de reacție</text>
    </svg>
  );
}
