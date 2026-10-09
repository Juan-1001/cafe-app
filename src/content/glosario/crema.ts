import type { GlossaryTerm } from "./types";

/*
 * Se queda en lo que se ve, igual que la ficha del espresso: de qué está hecha la
 * crema no se describe hasta leer entero el trabajo de Illy y Navarini (2011), del que
 * solo se pudo leer el resumen.
 */
export const crema: GlossaryTerm = {
  kind: "term",
  slug: "crema",
  term: "Crema",
  definition: "La capa de espuma color avellana que corona un espresso recién hecho.",
  categories: ["barra"],
  readMore: { kind: "metodo", slug: "espresso" },
  sources: [],
};
