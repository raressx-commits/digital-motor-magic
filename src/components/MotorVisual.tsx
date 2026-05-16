import { motion } from "motion/react";

// Stylized SVG electric motor with rotating rotor + PWM pulses.
export function MotorVisual({ speed = 1 }: { speed?: number }) {
  const duration = Math.max(0.3, 4 / Math.max(0.1, speed));
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full">
      <defs>
        <radialGradient id="stator" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.35 0.06 245)" />
          <stop offset="100%" stopColor="oklch(0.2 0.04 250)" />
        </radialGradient>
        <linearGradient id="shaft" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.6 0.03 250)" />
          <stop offset="1" stopColor="oklch(0.85 0.02 250)" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>

      {/* mounting base */}
      <rect x="60" y="170" width="200" height="14" rx="3" fill="oklch(0.25 0.03 250)" />
      <rect x="80" y="184" width="20" height="14" fill="oklch(0.2 0.03 250)" />
      <rect x="220" y="184" width="20" height="14" fill="oklch(0.2 0.03 250)" />

      {/* stator housing */}
      <circle cx="160" cy="110" r="78" fill="url(#stator)" stroke="oklch(0.45 0.05 245)" strokeWidth="2" />
      <circle cx="160" cy="110" r="68" fill="none" stroke="oklch(0.4 0.04 250)" strokeDasharray="3 6" />

      {/* fan slots */}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        const x1 = 160 + Math.cos(a) * 60;
        const y1 = 110 + Math.sin(a) * 60;
        const x2 = 160 + Math.cos(a) * 74;
        const y2 = 110 + Math.sin(a) * 74;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="oklch(0.15 0.025 250)" strokeWidth="2" />;
      })}

      {/* rotor */}
      <motion.g
        style={{ originX: "160px", originY: "110px", transformBox: "fill-box" } as React.CSSProperties}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="160" cy="110" r="44" fill="oklch(0.28 0.05 245)" stroke="oklch(0.72 0.18 240)" strokeWidth="1.5" />
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          const x = 160 + Math.cos(a) * 30;
          const y = 110 + Math.sin(a) * 30;
          return <circle key={i} cx={x} cy={y} r="5" fill="oklch(0.72 0.18 240)" filter="url(#glow)" />;
        })}
        <rect x="156" y="60" width="8" height="100" rx="2" fill="oklch(0.72 0.18 240 / 0.35)" />
        <rect x="110" y="106" width="100" height="8" rx="2" fill="oklch(0.72 0.18 240 / 0.35)" />
      </motion.g>

      {/* shaft */}
      <rect x="232" y="106" width="58" height="8" rx="2" fill="url(#shaft)" />

      {/* leads */}
      <path d="M 60 90 Q 30 90 30 60" stroke="oklch(0.65 0.26 25)" strokeWidth="3" fill="none" />
      <path d="M 60 130 Q 30 130 30 160" stroke="oklch(0.55 0.02 250)" strokeWidth="3" fill="none" />
      <circle cx="30" cy="60" r="4" fill="oklch(0.65 0.26 25)" />
      <circle cx="30" cy="160" r="4" fill="oklch(0.55 0.02 250)" />
    </svg>
  );
}
