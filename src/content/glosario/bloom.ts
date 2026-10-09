import type { GlossaryRedirect } from "./types";

/*
 * Una remisión y no una entrada: el sitio llama a esto «floración», y la palabra que se
 * oye tiene que estar en la B para quien la busque por ahí.
 */
export const bloom: GlossaryRedirect = {
  kind: "redirect",
  slug: "bloom",
  term: "Bloom",
  note: "Es como se le dice en inglés, y así la vas a oír.",
  target: "floracion",
};
