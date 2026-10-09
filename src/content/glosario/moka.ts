import type { GlossaryTerm } from "./types";

/*
 * La definición resume la ficha de la moka, sin bares: la cifra que circula no tiene
 * documento detrás, y la ficha cuenta por qué. La nota sale del DLE, «moka»: «Tb. moca.
 * Del fr. moka, y este de Moka, localidad de Yemen desde donde se exportaba. m. Café de
 * buena calidad procedente de la ciudad de Moka.» Es la única acepción: la cafetera no
 * está.
 */
export const moka: GlossaryTerm = {
  kind: "term",
  slug: "moka",
  term: "Moka",
  note: "La RAE solo la recoge como el café de Moka, la ciudad de Yemen desde donde se exportaba.",
  definition:
    "La cafetera de fogón: el agua se calienta abajo y sube empujada a través del café hasta el depósito de arriba.",
  categories: ["receta"],
  readMore: { kind: "metodo", slug: "moka" },
  sources: [
    {
      publisher: "Real Academia Española",
      title: "Diccionario de la lengua española, «moka»",
      url: "https://dle.rae.es/moka",
      retrieved: "2026-10-09",
    },
  ],
};
