// Discrete motor model and simulation utilities.
// y[n+1] = a*y[n] + b*u[n], with u[n] = K*(r[n] - y[n])
// Closed-loop pole: z = a - b*K

export type SimParams = {
  a: number;
  b: number;
  K: number;
  r: number;
  N?: number;
  y0?: number;
};

export type SimSample = { n: number; y: number; r: number; u: number };

export function simulate({ a, b, K, r, N = 60, y0 = 0 }: SimParams): SimSample[] {
  const out: SimSample[] = [];
  let y = y0;
  for (let n = 0; n < N; n++) {
    const e = r - y;
    const u = K * e;
    out.push({ n, y, r, u });
    let next = a * y + b * u;
    // Clamp to keep chart from exploding when unstable
    if (!Number.isFinite(next)) next = 0;
    next = Math.max(-1e5, Math.min(1e5, next));
    y = next;
  }
  return out;
}

export function closedLoopPole(a: number, b: number, K: number) {
  return a - b * K;
}

export function stabilityVerdict(pole: number) {
  const mag = Math.abs(pole);
  if (mag < 1) {
    if (pole < 0) {
      return {
        status: "stable" as const,
        label: "STABIL cu oscilații alternante",
        explanation:
          "Polul este în interiorul cercului unitate dar negativ — răspunsul converge, dar își schimbă semnul de la un pas la altul.",
      };
    }
    return {
      status: "stable" as const,
      label: "STABIL",
      explanation:
        "Polul se află în interiorul cercului unitate (|z| < 1). Turația motorului converge către valoarea dorită.",
    };
  }
  if (mag === 1) {
    return {
      status: "marginal" as const,
      label: "LIMITĂ DE STABILITATE",
      explanation:
        "Polul este chiar pe cercul unitate. Sistemul oscilează fără a se amortiza.",
    };
  }
  return {
    status: "unstable" as const,
    label: "INSTABIL",
    explanation:
      "Polul iese din cercul unitate (|z| > 1). Turația nu se stabilizează — sistemul divergează.",
  };
}
