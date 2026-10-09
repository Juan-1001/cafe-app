import type { GlossaryTerm } from "./types";

/* DLE, «café»: «café cortado — m. café con muy poca leche.» */
export const cortado: GlossaryTerm = {
  kind: "term",
  slug: "cortado",
  term: "Cortado",
  definition: "Café con muy poca leche.",
  categories: ["carta"],
  readMore: null,
  sources: [
    {
      publisher: "Real Academia Española",
      title: "Diccionario de la lengua española, «café»",
      url: "https://dle.rae.es/café",
      retrieved: "2026-10-09",
    },
  ],
};
