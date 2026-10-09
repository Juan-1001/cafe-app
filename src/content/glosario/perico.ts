import type { GlossaryTerm } from "./types";

/*
 * Los dos diccionarios académicos no coinciden, y la definición cuenta el desacuerdo
 * en vez de elegir uno:
 *
 * - DLE, «perico»: «m. Col. cortado (‖ café cortado).» Y en «café»: «café cortado — m.
 *   café con muy poca leche.» Hacen falta las dos entradas, porque la primera remite.
 * - Diccionario de americanismos (ASALE), «perico»: «IV. 1. m. Co:C. Café con leche
 *   pequeño.» Y en «pintado»: «I. 1. m. Ho, Pa, Co:C,O,SO, Ec. Café con leche
 *   pequeño.» Por eso la nota lo iguala al pintado.
 *
 * La primera versión de este término, aprobada antes de consultar el de americanismos,
 * decía solo lo del DLE: «un café cortado: café con muy poca leche».
 */
export const perico: GlossaryTerm = {
  kind: "term",
  slug: "perico",
  term: "Perico",
  note: "Según el Diccionario de americanismos, es lo mismo que un *pintado*.",
  definition:
    "En Colombia, un café con leche. Los diccionarios no se ponen de acuerdo en cuánta: el de la RAE dice que muy poca, y el de americanismos, que es un café con leche pequeño.",
  categories: ["carta"],
  readMore: null,
  sources: [
    {
      publisher: "Asociación de Academias de la Lengua Española",
      title: "Diccionario de americanismos, «perico»",
      url: "https://www.asale.org/damer/perico",
      retrieved: "2026-10-09",
    },
    {
      publisher: "Real Academia Española",
      title: "Diccionario de la lengua española, «perico»",
      url: "https://dle.rae.es/perico",
      retrieved: "2026-10-09",
    },
    {
      publisher: "Real Academia Española",
      title: "Diccionario de la lengua española, «café»",
      url: "https://dle.rae.es/café",
      retrieved: "2026-10-09",
    },
  ],
};
