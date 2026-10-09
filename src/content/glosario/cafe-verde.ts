import type { GlossaryTerm } from "./types";

/*
 * Resume el arranque de «Niveles de tueste». La humedad del grano verde no se escribe
 * aquí: el artículo la da como rango y explica por qué no es una cifra exacta. Sin
 * categoría.
 */
export const cafeVerde: GlossaryTerm = {
  kind: "term",
  slug: "cafe-verde",
  term: "Café verde",
  definition: "El grano antes de tostar. No huele a café: huele a hierba o a heno.",
  categories: [],
  readMore: { kind: "articulo", slug: "niveles-de-tueste" },
  sources: [],
};
