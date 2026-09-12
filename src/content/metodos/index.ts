import type { BrewMethod } from "./types";
import { v60 } from "./v60";

/** Un archivo por método en esta carpeta; aquí se registran para las rutas. */
export const brewMethods: BrewMethod[] = [v60];

export function getBrewMethod(slug: string): BrewMethod | undefined {
  return brewMethods.find((method) => method.slug === slug);
}

export type { BrewMethod, ContentImage } from "./types";
