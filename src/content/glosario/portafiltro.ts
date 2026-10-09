import type { GlossaryTerm } from "./types";

/* Describe el objeto como lo hace el catálogo de equipo. Sin diámetros a propósito. */
export const portafiltro: GlossaryTerm = {
  kind: "term",
  slug: "portafiltro",
  term: "Portafiltro",
  definition:
    "El mango con la cesta de metal donde va el café molido, y que se engancha a la máquina de espresso.",
  categories: ["barra"],
  readMore: { kind: "metodo", slug: "espresso" },
  sources: [],
};
