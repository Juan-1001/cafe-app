import type { GlossaryTerm } from "./types";

/*
 * Es el nombre que la ficha del espresso le da al dato, y la ficha es también la que
 * dice que en una barra se oye «el shot». La palabra inglesa tiene su propia entrada,
 * `shot`, que remite aquí.
 */
export const pesoDeBebida: GlossaryTerm = {
  kind: "term",
  slug: "peso-de-bebida",
  term: "Peso de bebida",
  note: "En la barra lo vas a oír como *shot*.",
  definition:
    "Lo que pesa el espresso que cae en la taza. En el espresso se pesa eso y no el agua, porque la máquina no la dosifica.",
  categories: ["barra", "receta"],
  readMore: { kind: "metodo", slug: "espresso" },
  sources: [],
};
