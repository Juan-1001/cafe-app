import type { GlossaryTerm } from "./types";

/*
 * DLE, «café»: «café americano — m. café que se prepara con una cantidad de agua
 * superior a la habitual.» Esa es la primera frase.
 *
 * La segunda es la práctica de barra y va atribuida a propósito («en la barra»), no
 * como dato del sitio: no hay ningún organismo que defina el americano, solo blogs que
 * se copian unos a otros.
 */
export const americano: GlossaryTerm = {
  kind: "term",
  slug: "americano",
  term: "Americano",
  definition:
    "Café hecho con más agua de la habitual. En la barra se prepara alargando un espresso con agua caliente.",
  categories: ["carta"],
  readMore: { kind: "metodo", slug: "espresso" },
  sources: [
    {
      publisher: "Real Academia Española",
      title: "Diccionario de la lengua española, «café»",
      url: "https://dle.rae.es/café",
      retrieved: "2026-10-09",
    },
  ],
};
