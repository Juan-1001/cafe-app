import type { GlossaryTerm } from "./types";

/*
 * Resume «La molienda». La frontera de las 100 micras no se escribe aquí: el artículo
 * la da con su fuente y explica que otro laboratorio la pone en otro sitio, que es
 * justo lo que dice la segunda frase.
 */
export const finos: GlossaryTerm = {
  kind: "term",
  slug: "finos",
  term: "Finos",
  definition:
    "Las partículas más pequeñas de una molienda, el polvo. Dónde empieza un fino es un convenio, no una medida de la naturaleza.",
  categories: ["receta"],
  readMore: { kind: "articulo", slug: "la-molienda" },
  sources: [],
};
