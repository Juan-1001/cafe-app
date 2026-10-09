import type { GlossaryTerm } from "./types";

/*
 * Resume la ficha del espresso. Lo de «no para apretar fuerte» la ficha lo da por
 * medido: con distintas fuerzas de apisonado no cambiaron ni el tiempo ni la
 * extracción. Es el nombre de la barra, igual que la clave `tamper` del catálogo.
 */
export const tamper: GlossaryTerm = {
  kind: "term",
  slug: "tamper",
  term: "Tamper",
  definition:
    "La pieza de base plana con la que se aplana el café dentro de la cesta antes de un espresso. Está para dejar el lecho parejo, no para apretar fuerte.",
  categories: ["barra"],
  readMore: { kind: "metodo", slug: "espresso" },
  sources: [],
};
