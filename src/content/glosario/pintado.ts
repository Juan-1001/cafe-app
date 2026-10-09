import type { GlossaryTerm } from "./types";

/*
 * Diccionario de americanismos (ASALE), «pintado»: «I. 1. m. Ho, Pa, Co:C,O,SO, Ec.
 * Café con leche pequeño.» En Colombia lo da solo en algunas regiones, de ahí el «en
 * partes de». El DLE no lo recoge para el café.
 */
export const pintado: GlossaryTerm = {
  kind: "term",
  slug: "pintado",
  term: "Pintado",
  note: "Según el Diccionario de americanismos, es lo mismo que un *perico*.",
  definition: "En partes de Colombia, un café con leche pequeño.",
  categories: ["carta"],
  readMore: null,
  sources: [
    {
      publisher: "Asociación de Academias de la Lengua Española",
      title: "Diccionario de americanismos, «pintado»",
      url: "https://www.asale.org/damer/pintado",
      retrieved: "2026-10-09",
    },
  ],
};
