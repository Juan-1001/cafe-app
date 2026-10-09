import type { GlossaryTerm } from "./types";

/*
 * Sale de la comparación de «Arábica y robusta». Lo de «tierras bajas y cálidas» es lo
 * que esa fila sostiene porque es en lo que coinciden todas las fuentes; las altitudes
 * concretas se dejaron fuera allí y aquí también.
 */
export const robusta: GlossaryTerm = {
  kind: "term",
  slug: "robusta",
  term: "Robusta",
  definition:
    "La otra de las dos especies que dan casi todo el café del mundo. Crece en tierras bajas y cálidas.",
  categories: ["bolsa"],
  readMore: { kind: "articulo", slug: "arabica-vs-robusta" },
  sources: [],
};
