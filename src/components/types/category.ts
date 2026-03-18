import type { JSX } from "react/jsx-runtime";

export interface ICategory {
  map(arg0: (category: ICategory) => JSX.Element): import("react").ReactNode;
  id: number;
  name: string;
  createdAt: string;
}
