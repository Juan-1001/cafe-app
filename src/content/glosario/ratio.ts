import type { GlossaryTerm } from "./types";

/*
 * Es la convención de las fichas de método (`src/content/metodos/ratio.ts`): el ratio
 * se lee en peso, gramos de agua por gramo de café. El 1:16 es solo el ejemplo de cómo
 * se escribe, no una recomendación.
 */
export const ratio: GlossaryTerm = {
  kind: "term",
  slug: "ratio",
  term: "Ratio",
  definition:
    "La proporción entre café y agua, en peso: 1:16 quiere decir dieciséis gramos de agua por cada gramo de café.",
  categories: ["receta"],
  readMore: { kind: "metodo", slug: "v60" },
  sources: [],
};
