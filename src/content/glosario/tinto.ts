import type { GlossaryTerm } from "./types";

/*
 * DLE, «tinto, ta»: «m. Col. y Ec. Infusión de café negro.» El Diccionario de
 * americanismos coincide: «II. 1. Co, Ve, Ec. Café puro, sin leche.»
 *
 * Sin enlace: ninguna página del sitio cuenta el tinto como bebida. El colado en tela
 * es una forma de hacerlo, no su definición.
 */
export const tinto: GlossaryTerm = {
  kind: "term",
  slug: "tinto",
  term: "Tinto",
  definition: "En Colombia, una taza de café negro.",
  categories: ["carta"],
  readMore: null,
  sources: [
    {
      publisher: "Real Academia Española",
      title: "Diccionario de la lengua española, «tinto»",
      url: "https://dle.rae.es/tinto",
      retrieved: "2026-10-09",
    },
  ],
};
