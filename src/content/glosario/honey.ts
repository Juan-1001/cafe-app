import type { GlossaryTerm } from "./types";

/*
 * Resume «Lavado, natural y honey».
 *
 * Descartado: la línea «también se le dice *enmielado*». Una búsqueda apuntó a un
 * artículo de Cenicafé (2022) que habla de «cafés enmielados (honey)», pero el PDF no
 * abrió el 2026-10-09 y no se leyó, así que no se escribe. Si se llega a leer, este es
 * el sitio donde va, como `note`.
 */
export const honey: GlossaryTerm = {
  kind: "term",
  slug: "honey",
  term: "Honey",
  definition:
    "Un proceso en la finca: se quitan la piel y la pulpa, y el grano se seca con el mucílago pegado. Cuánto se deja lo decide el productor, y el nombre no quiere decir lo mismo en todas las regiones.",
  categories: ["bolsa"],
  readMore: { kind: "articulo", slug: "procesos-en-origen" },
  sources: [],
};
