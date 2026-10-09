import type { Source } from "../types";

/**
 * Dónde se encuentra el lector la palabra. Es el filtro de la página y responde a la
 * pregunta con la que llega: «¿dónde vi esto?».
 *
 * Un término puede estar en varias: «espresso» se lee en la carta y se oye en la barra,
 * y «molienda» sale en la bolsa y en la receta. Elegir solo una obligaría a decidir
 * dónde se la encuentra uno primero, y en muchas esa decisión sería discutible.
 */
export type GlossaryCategory = "bolsa" | "barra" | "carta" | "receta";

/**
 * Cómo se lee cada categoría en la página. La de la carta lleva las dos palabras
 * porque «Menú» sola choca con el botón «Menú» de la cabecera, que en la misma página
 * significa otra cosa.
 */
export const GLOSSARY_CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  bolsa: "Bolsa",
  barra: "Barra",
  carta: "Menú/Carta",
  receta: "Receta",
};

/**
 * Dónde se cuenta entero lo que el término resume en una frase. El glosario no repite
 * lo que ya está escrito: es una puerta a ello.
 *
 * El slug no es un tipo cerrado porque los artículos y los métodos no exportan uno;
 * lo comprueba `index.ts` al compilar, así que un enlace a una página que no existe
 * rompe la compilación en vez de llegar a la web.
 */
export type GlossaryLink =
  | { kind: "articulo"; slug: string }
  | { kind: "metodo"; slug: string };

/** Una palabra con su definición. */
export type GlossaryTerm = {
  kind: "term";
  /** El ancla de la página: `/glosario#<slug>`. Igual que el nombre del archivo. */
  slug: string;
  /** La palabra tal como se busca y se escribe en la entrada. */
  term: string;
  /**
   * Una frase, dos como mucho. Admite *itálicas* con asteriscos, igual que los
   * párrafos de los artículos. **Sin cifras**: el número vive en la ficha o el
   * artículo que lo tiene verificado, y el glosario enlaza a esa página.
   */
  definition: string;
  /**
   * La línea bajo la palabra con cómo la vas a oír o a encontrar escrita: «Lo vas a
   * oír como *bloom*», «La RAE lo escribe *expreso*». Solo cuando hay algo que decir.
   */
  note?: string;
  /**
   * Puede ir vacía, y eso también afirma algo: que la palabra no se encuentra fuera,
   * sino leyendo el sitio. Es el caso de «mucílago» o «pergamino», que el propio
   * glosario usa en sus definiciones y que nadie ve escritas en una bolsa ni en una
   * carta. Un término sin categoría sale solo con «Todas» y sin etiqueta en su fila;
   * forzarlo a una categoría mentiría sobre dónde se lo encuentra uno.
   */
  categories: GlossaryCategory[];
  /**
   * Va sin `?`, como el crédito de las fotos: dejarlo en `null` tiene que ser un acto
   * escrito. `null` quiere decir que el sitio todavía no tiene ninguna página que
   * cuente esto, no que da igual.
   */
  readMore: GlossaryLink | null;
  /**
   * Documentos de fuera que respaldan la definición. Va vacío cuando la definición
   * resume una página del sitio, porque esa página ya lleva sus fuentes; el comentario
   * de cada archivo dice de cuál sale. Un término sin `readMore` y sin fuentes no
   * compila: no tendría nada detrás.
   */
  sources: Source[];
};

/**
 * Una entrada que solo manda a otra. Existe para el anglicismo que el lector oye
 * cuando el sitio usa la palabra española: quien buscó *bloom* tiene que encontrarlo
 * en la B, aunque la definición viva en «Floración».
 *
 * No declara categorías: hereda las de su destino, para que las dos no puedan
 * contradecirse.
 */
export type GlossaryRedirect = {
  kind: "redirect";
  slug: string;
  term: string;
  note: string;
  /** El slug de un `GlossaryTerm`, nunca de otra remisión. */
  target: string;
};

export type GlossaryEntry = GlossaryTerm | GlossaryRedirect;
