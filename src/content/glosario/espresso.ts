import type { GlossaryTerm } from "./types";

/*
 * La definición resume la ficha del espresso. La fuente de fuera es solo para la
 * nota: el DLE recoge la palabra como «expreso, sa — adj. Dicho del café: Hecho en
 * cafetera exprés». El sitio sigue escribiendo «espresso», que es como se lee en las
 * cartas, y la nota enseña la otra forma en vez de esconderla.
 */
export const espresso: GlossaryTerm = {
  kind: "term",
  slug: "espresso",
  term: "Espresso",
  note: "La RAE lo escribe *expreso*.",
  definition:
    "Café hecho con una bomba que empuja agua caliente a presión a través de café muy molido y apretado.",
  categories: ["carta", "barra"],
  readMore: { kind: "metodo", slug: "espresso" },
  sources: [
    {
      publisher: "Real Academia Española",
      title: "Diccionario de la lengua española, «expreso»",
      url: "https://dle.rae.es/expreso",
      retrieved: "2026-10-09",
    },
  ],
};
