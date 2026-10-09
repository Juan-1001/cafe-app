import type { GlossaryRedirect } from "./types";

/* Una remisión, igual que `bloom`: el sitio dice «peso de bebida» y la barra, «shot». */
export const shot: GlossaryRedirect = {
  kind: "redirect",
  slug: "shot",
  term: "Shot",
  note: "Es como se le dice en la barra.",
  target: "peso-de-bebida",
};
