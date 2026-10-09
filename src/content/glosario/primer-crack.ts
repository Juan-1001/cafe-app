import type { GlossaryTerm } from "./types";

/*
 * Resume «Niveles de tueste». Sin los 196 °C a propósito: el artículo cuenta que esa
 * cifra es la lectura de una sonda en el bombo y no la temperatura del grano. Sin
 * categoría.
 */
export const primerCrack: GlossaryTerm = {
  kind: "term",
  slug: "primer-crack",
  term: "Primer crack",
  definition:
    "El chasquido que da el grano en la tostadora cuando su estructura cede por dentro. A partir de ahí empieza a ser café.",
  categories: [],
  readMore: { kind: "articulo", slug: "niveles-de-tueste" },
  sources: [],
};
