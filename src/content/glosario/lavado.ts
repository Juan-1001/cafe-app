import type { GlossaryTerm } from "./types";

/*
 * Resume la ficha del lavado en «Lavado, natural y honey», que se apoya en el glosario
 * de la Federación Nacional de Cafeteros. Sin horas de fermentación ni días de secado:
 * esas cifras son de un estudio concreto y el artículo las da como tales.
 */
export const lavado: GlossaryTerm = {
  kind: "term",
  slug: "lavado",
  term: "Lavado",
  definition:
    "Un proceso en la finca: se le quita la pulpa a la cereza, se deja fermentar para que se suelte el mucílago y se lava antes de secar el grano.",
  categories: ["bolsa"],
  readMore: { kind: "articulo", slug: "procesos-en-origen" },
  sources: [],
};
