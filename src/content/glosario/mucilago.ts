import type { GlossaryTerm } from "./types";

/*
 * Una de las capas de la cereza en «Lavado, natural y honey». Sin categoría, aunque las
 * definiciones de lavado, natural y honey la usan: por eso tiene que estar aquí.
 */
export const mucilago: GlossaryTerm = {
  kind: "term",
  slug: "mucilago",
  term: "Mucílago",
  definition:
    "La capa pegajosa y azucarada que queda pegada al grano cuando se le quita la pulpa.",
  categories: [],
  readMore: { kind: "articulo", slug: "procesos-en-origen" },
  sources: [],
};
