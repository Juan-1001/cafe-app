import type { GlossaryTerm } from "./types";

/* Resume la ficha del espresso, que enseña a reconocerla mirando la cesta por debajo. */
export const cestaPresurizada: GlossaryTerm = {
  kind: "term",
  slug: "cesta-presurizada",
  term: "Cesta presurizada",
  definition:
    "Una cesta de portafiltro con doble fondo y un solo agujero por fuera. Frena el agua ese agujero y no el café, así que la molienda deja de cambiar nada.",
  categories: ["barra"],
  readMore: { kind: "metodo", slug: "espresso" },
  sources: [],
};
