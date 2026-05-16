declare module "react-katex" {
  import type { ComponentType } from "react";
  type Props = { math: string; errorColor?: string; renderError?: (error: Error) => React.ReactNode };
  export const InlineMath: ComponentType<Props>;
  export const BlockMath: ComponentType<Props>;
}
