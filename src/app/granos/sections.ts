import type { ArticleBlock } from "@/content/granos/types";

type StatBlock = Extract<ArticleBlock, { kind: "stat" }>;
type PullQuoteBlock = Extract<ArticleBlock, { kind: "pullquote" }>;

/**
 * Un tramo del artículo tal y como lo compone la página: una franja con su rótulo en el
 * margen y su contenido a la derecha.
 */
export type ArticleSection =
  | {
      kind: "section";
      /** «01», «02»… Solo lo lleva el tramo que abre un título; la entrada no. */
      number?: string;
      heading?: string;
      blocks: ArticleBlock[];
      /** Las cifras del tramo, que en escritorio se van al margen bajo el rótulo. */
      stats: StatBlock[];
    }
  | { kind: "quote"; block: PullQuoteBlock };

/**
 * Parte el cuerpo del artículo en las franjas del diseño.
 *
 * El contenido sigue siendo una lista plana de bloques, y es a propósito: quien escribe
 * un artículo pone un título donde empieza un apartado y no tiene que pensar en franjas
 * ni en márgenes. La composición la deduce la página de esa lista:
 *
 * - **Cada título abre una franja numerada.** El número sale del orden de los títulos y
 *   no se escribe en el contenido, así que mover un apartado no deja números viejos.
 * - **Lo que va antes del primer título es la entrada**, una franja sin rótulo: no es
 *   un apartado y numerarla como «00» afirmaría que lo es.
 * - **Una frase suelta con texto rompe la franja** y va en la suya, a lo ancho, como la
 *   cita escalonada del diseño. Lo que viene detrás sigue en una franja sin rótulo,
 *   porque el apartado no ha cambiado. Una frase todavía vacía no rompe nada: no se
 *   pinta, y partir la franja por ella dejaría un corte sin motivo a la vista.
 */
export function splitIntoSections(blocks: ArticleBlock[]): ArticleSection[] {
  const sections: ArticleSection[] = [];
  let headings = 0;
  let current: Extract<ArticleSection, { kind: "section" }> | null = null;

  const open = (heading?: string) => {
    current = {
      kind: "section",
      number: heading ? String(++headings).padStart(2, "0") : undefined,
      heading,
      blocks: [],
      stats: [],
    };
    sections.push(current);
    return current;
  };

  for (const block of blocks) {
    if (block.kind === "heading") {
      open(block.text);
      continue;
    }

    if (block.kind === "pullquote" && block.text.trim()) {
      sections.push({ kind: "quote", block });
      current = null;
      continue;
    }

    const section: Extract<ArticleSection, { kind: "section" }> =
      current ?? open();
    section.blocks.push(block);
    if (block.kind === "stat") section.stats.push(block);
  }

  // Una franja que se quedó sin nada que enseñar —solo una frase vacía, por ejemplo—
  // no se pinta: sería un filete con un hueco debajo.
  return sections.filter(
    (section) =>
      section.kind === "quote" ||
      section.heading !== undefined ||
      section.blocks.some(
        (block) => block.kind !== "pullquote" || block.text.trim(),
      ),
  );
}
