import type { GlossaryTerm } from "./types";

/*
 * «Floración» es el nombre que el sitio ya le da a esta pausa en la ficha del colado en
 * tela, y por eso el enlace va ahí y no al V60, que explica lo mismo sin nombrarla. La
 * palabra inglesa tiene su propia entrada, `bloom`, que remite aquí.
 */
export const floracion: GlossaryTerm = {
  kind: "term",
  slug: "floracion",
  term: "Floración",
  note: "Lo vas a oír como *bloom*.",
  definition:
    "La pausa después del primer chorro de agua, para que el café recién tostado suelte el gas antes de seguir vertiendo.",
  categories: ["receta"],
  readMore: { kind: "metodo", slug: "colado-en-tela" },
  sources: [],
};
