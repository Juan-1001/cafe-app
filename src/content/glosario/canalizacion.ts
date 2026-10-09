import type { GlossaryTerm } from "./types";

/*
 * Resume la ficha del espresso, que la llama «el fallo más común de una extracción que
 * se ve rara».
 */
export const canalizacion: GlossaryTerm = {
  kind: "term",
  slug: "canalizacion",
  term: "Canalización",
  definition:
    "Cuando el agua encuentra un camino fácil por el lecho y pasa casi toda por ahí. Es el fallo más común de un espresso que sale raro.",
  categories: ["barra"],
  readMore: { kind: "metodo", slug: "espresso" },
  sources: [],
};
