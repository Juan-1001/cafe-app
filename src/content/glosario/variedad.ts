import type { GlossaryTerm } from "./types";

/* Es la definición que da «Arábica y robusta» al separar especie de variedad. */
export const variedad: GlossaryTerm = {
  kind: "term",
  slug: "variedad",
  term: "Variedad",
  definition:
    "Una subdivisión dentro de una especie: *Caturra*, *Castillo* o *Geisha* son variedades de arábica.",
  categories: ["bolsa"],
  readMore: { kind: "articulo", slug: "arabica-vs-robusta" },
  sources: [],
};
