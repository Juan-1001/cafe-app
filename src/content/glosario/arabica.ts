import type { GlossaryTerm } from "./types";

/*
 * Resume el arranque de «Arábica y robusta», cuyas fuentes respaldan las dos
 * afirmaciones: que casi todo el café sale de dos especies y que Colombia cultiva
 * prácticamente solo arábica (Federación Nacional de Cafeteros, balance 2023-2024).
 */
export const arabica: GlossaryTerm = {
  kind: "term",
  slug: "arabica",
  term: "Arábica",
  definition:
    "Una de las dos especies de las que sale casi todo el café del mundo, y la que se cultiva en Colombia.",
  categories: ["bolsa"],
  readMore: { kind: "articulo", slug: "arabica-vs-robusta" },
  sources: [],
};
