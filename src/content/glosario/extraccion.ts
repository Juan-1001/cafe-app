import type { GlossaryTerm } from "./types";

/*
 * Resume lo que cuenta la ficha del V60 en sus fallos de sub y sobreextracción. A
 * propósito no dice a qué sabe cada una: que la subextraída «sabe ácida» se repite
 * mucho, y se escribirá cuando se haya verificado, no aquí de pasada.
 */
export const extraccion: GlossaryTerm = {
  kind: "term",
  slug: "extraccion",
  term: "Extracción",
  definition:
    "Lo que el agua consigue sacarle al café molido. Se puede quedar corta (*subextracción*) o pasarse (*sobreextracción*).",
  categories: ["receta", "barra"],
  readMore: { kind: "metodo", slug: "v60" },
  sources: [],
};
