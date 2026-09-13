import type { Article, ArticleBlock } from "./types";

/**
 * Palabras por minuto que se suponen al lector. 200 es la cifra habitual para lectura
 * corrida en español; no es una medida de este sitio, es una convención, y por eso el
 * resultado se enseña siempre como aproximado ("4 min") y nunca al segundo.
 */
const WORDS_PER_MINUTE = 200;

/** Todo el texto visible de un bloque, que es lo único que el lector tiene que leer. */
function blockText(block: ArticleBlock): string {
  switch (block.kind) {
    case "paragraph":
      return block.text;
    case "heading":
      return block.text;
    case "comparison":
      return [
        ...block.columns,
        ...block.rows.flatMap((row) => [row.label, ...row.values]),
        block.caption ?? "",
      ].join(" ");
    case "stat":
      return [block.value, block.label, block.note ?? ""].join(" ");
    // Del bloque de imagen solo se lee el pie. El texto alternativo describe la foto
    // para quien no la ve, no es lectura que se sume al tiempo de nadie.
    case "image":
      return block.caption ?? "";
    case "pullquote":
      return [block.text, block.attribution ?? ""].join(" ");
    // De la escala cuentan los textos de todos los peldaños, porque están todos en la
    // página y se leen. No cuentan las cifras: ni `figure` ni los pesos de las barras
    // ni los días de los carriles, que son un dato suelto que se mira y no una frase
    // que se lee. Contarlos inflaría el tiempo con algo que nadie recorre palabra a
    // palabra.
    //
    // Las dos variantes cuentan igual, así que no hace falta ramificar: lo que cambia
    // entre ellas es el dibujo, y un dibujo no se lee.
    case "scale":
      return [
        block.intro,
        ...block.axes,
        ...block.steps.flatMap((step) => [step.name, ...step.notes]),
        block.diagramNote,
        block.note,
      ].join(" ");
  }
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * El tiempo de lectura sale de contar el cuerpo, no de escribirlo a mano en cada
 * artículo: un número puesto a mano se despega del texto en cuanto se edita un
 * párrafo, y acaba siendo un dato inventado en un sitio que no los admite.
 *
 * Las fuentes no cuentan: son una referencia para comprobar, no lectura.
 */
export function readingMinutes(article: Article): number {
  const words = article.blocks.reduce(
    (total, block) => total + countWords(blockText(block)),
    0,
  );

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Si todos los artículos tardan lo mismo, el índice no enseña el tiempo: una columna
 * en la que todas las filas ponen "4 min" no ayuda a elegir, solo añade ruido. En la
 * ficha del artículo sí se muestra siempre, porque ahí informa de lo que vas a leer
 * en vez de comparar.
 */
export function readingTimesVary(articles: Article[]): boolean {
  if (articles.length < 2) return false;

  const first = readingMinutes(articles[0]);
  return articles.some((article) => readingMinutes(article) !== first);
}
