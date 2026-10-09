import type { GlossaryTerm } from "./types";

/* Resume la tesis de «La molienda»: una molienda no es un tamaño, es un reparto. */
export const molienda: GlossaryTerm = {
  kind: "term",
  slug: "molienda",
  term: "Molienda",
  definition:
    "El tamaño al que se parte el grano antes de prepararlo. En realidad nunca es un tamaño, sino una mezcla de trozos de muchos tamaños.",
  categories: ["receta", "bolsa"],
  readMore: { kind: "articulo", slug: "la-molienda" },
  sources: [],
};
