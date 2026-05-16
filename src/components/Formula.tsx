import { BlockMath, InlineMath } from "react-katex";

export function Formula({ children, block = false }: { children: string; block?: boolean }) {
  return block ? (
    <div className="my-4 px-4 py-3 rounded-xl bg-card/60 border border-border overflow-x-auto">
      <BlockMath math={children} />
    </div>
  ) : (
    <InlineMath math={children} />
  );
}
