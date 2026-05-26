import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, Card } from "@/components/Section";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/concluzii")({
  head: () => ({
    meta: [
      { title: "Concluzii și bibliografie" },
      { name: "description", content: "Sinteza proiectului și legătura cu materia de la curs." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="sinteză"
        title={<>De la formulă la <span className="text-primary glow-text">motor real</span></>}
        subtitle="Transformata Z aduce sistemele discrete în domeniul algebric — exact ce ne trebuie pentru controlul digital."
      />

      <Section>
        <Card className="p-8 md:p-10">
          <p className="text-lg leading-relaxed text-foreground/90">
            Transformata Z permite analiza sistemelor discrete, iar controlul digital al motoarelor electrice
            este un exemplu direct în care această transformare devine utilă.
            Prin poziția polilor în planul <span className="text-primary mono">Z</span> se poate determina
            stabilitatea sistemului, iar prin analiza răspunsului tranzitoriu se poate evalua calitatea controlului.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-foreground/90">
            Astfel, o noțiune din <span className="text-primary">Calcul Operațional</span> devine un instrument
            real pentru <span className="text-primary">Ingineria Electrică</span> modernă.
          </p>
        </Card>
      </Section>

      <Section>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Ce am acoperit</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {[
            "Definiția Transformatei Z",
            "Legătura cu Transformata Laplace și Calculul Operațional",
            "Model discret al motorului electric",
            "Schemă bloc a sistemului de control",
            "Eroarea e[n] = r[n] − y[n]",
            "Funcția de transfer H(z)",
            "Polii în planul Z și cercul unitate",
            "Criteriul de stabilitate |z| < 1",
            "Răspuns tranzitoriu",
            "Legătura cu PWM",
            "Aplicații reale în Inginerie Electrică",
          ].map((it, i) => (
            <div key={it} className="flex items-start gap-3 rounded-xl border border-border p-4 bg-card/40">
              <span className="mono text-xs text-primary mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm">{it}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Materia conexă</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          {[
            ["Curs 9–10", "Serii și Transformata Fourier"],
            ["Curs 11", "Transformata Laplace"],
            ["Curs 12", "Transformata Z"],
          ].map(([t, d]) => (
            <Card key={t} className="p-5">
              <div className="mono text-xs uppercase tracking-wider text-primary">{t}</div>
              <div className="mt-1 font-display font-semibold">{d}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Bibliografie</h2>
        <ol className="mt-6 space-y-3">
          {[
            "Simona Bibic, Curs 12 (MS) — Calcul Operațional (4): Transformata Z.",
            "Dumitru Popescu, Conducerea numerică a proceselor, Editura AGIR, București, 2004.",
            "D. Stanomir, O. Stănășilă, Metode matematice în teoria semnalelor, Editura Tehnică, București, 1980.",
            "R. Dobrescu, Semnale și sisteme, Editura Politehnica Press, București, 2007.",
            "D. Popescu, Conducerea numerică a proceselor, Editura AGIR, București, 2004.",
            "V. Surpățeanu, A. G. Stan, Microcontrolere. Arhitectură și aplicații, Editura Matrix Rom, București, 2011.",
            "N. Muntean, M. Rădulescu, Acționări electrice și controlul motoarelor, Editura Orizonturi Universitare, Timișoara, 2010.",
            "D. Ștefănoiu, Prelucrarea numerică a semnalelor, Editura Matrix Rom, București, 2010.",
            "V. Răsvan, Teoria sistemelor automate, Editura Tehnică, București, 2000.",
            "R.-E. Precup, Conducerea numerică a proceselor, Editura Orizonturi Universitare, Timișoara, 2004.",
            "S. Călin, Regulatoare automate, Editura Didactică și Pedagogică, București, 1985.",
            "E. Ceangă, Sisteme cu microprocesoare în conducerea proceselor, Editura Tehnică, București, 1993.",
            "C. Rădoi, Electronică de putere: convertoare statice, comanda PWM, Editura Tehnică, București, 2000.",
            "A. Câmpeanu, Mașini și acționări electrice, Editura Universitaria, Craiova, 2001.",
            "D. A. Stoichescu, Microprocesoare și microcontrolere, Editura Politehnica Press, București, 2007.",
          ].map((ref, i) => (
            <div key={i} className="flex gap-4 rounded-xl border border-border p-4 bg-card/40">
              <span className="mono text-xs text-primary shrink-0 mt-0.5">[{i + 1}]</span>
              <span className="text-sm text-foreground/90 leading-relaxed">{ref}</span>
            </div>
          ))}
        </ol>
        <Link to="/transformata-z"
          className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[var(--shadow-glow)]">
          Revino la teorie <ArrowRight className="w-4 h-4" />
        </Link>
      </Section>
    </>
  );
}
