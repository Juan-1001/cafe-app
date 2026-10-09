import type { GlossaryTerm } from "./types";

/* Es la definición que da «Niveles de tueste» al leer una bolsa. */
export const notasDeCata: GlossaryTerm = {
  kind: "term",
  slug: "notas-de-cata",
  term: "Notas de cata",
  definition: "La lista de sabores que el tostador encontró al probar el café.",
  categories: ["bolsa"],
  readMore: { kind: "articulo", slug: "niveles-de-tueste" },
  sources: [],
};
