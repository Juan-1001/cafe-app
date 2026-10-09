import type { GlossaryTerm } from "./types";

/*
 * DLE, «café»: «café descafeinado — m. café al que se ha reducido el contenido de
 * cafeína.» Dice «reducido» y no «quitado», y la definición lo respeta: un descafeinado
 * no es un café sin cafeína.
 */
export const descafeinado: GlossaryTerm = {
  kind: "term",
  slug: "descafeinado",
  term: "Descafeinado",
  definition: "Café al que se le ha reducido la cafeína.",
  categories: ["carta", "bolsa"],
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
