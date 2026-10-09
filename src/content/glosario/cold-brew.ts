import type { GlossaryTerm } from "./types";

/*
 * Resume la ficha del cold brew. Dice «sin calentar» y no «fría» porque la ficha deja
 * el frasco en la encimera o en la nevera, y las dos valen. Sin horas: la ficha cuenta
 * por qué ningún número de horas está medido.
 */
export const coldBrew: GlossaryTerm = {
  kind: "term",
  slug: "cold-brew",
  term: "Cold brew",
  definition:
    "Café preparado con agua sin calentar y horas de reposo, que se cuela al final.",
  categories: ["carta", "receta"],
  readMore: { kind: "metodo", slug: "cold-brew" },
  sources: [],
};
