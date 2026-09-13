import type { Source } from "./types";

/**
 * La parte automática del procedimiento de datos del proyecto.
 *
 * El procedimiento entero está en la Skill `verificar-datos` y lo ejecuta una persona:
 * llegar al documento que mide el dato, hacerle las cinco preguntas, clasificar la
 * certeza y anotar lo descartado junto al dato con el que se confunde. Nada de eso lo
 * puede hacer una máquina, y este archivo no pretende hacerlo.
 *
 * Lo que sí se puede comprobar sola es la parte que se pudre con el tiempo y la que se
 * olvida con las prisas: una fuente sin fecha, una fecha inventada, un enlace escrito a
 * medias, un campo que se quedó vacío al copiar y pegar la referencia de al lado. Eso
 * es lo que hay aquí, y corre al compilar, así que un descuido no llega a la página.
 *
 * La comprobación que falta —si el enlace todavía lleva a alguna parte— no cabe en la
 * compilación porque necesita red. Vive en `scripts/verificar-fuentes.mjs` y se lanza
 * a mano con `npm run verificar-fuentes`.
 */

/** Lo que se admite como fecha de consulta: una fecha ISO y nada más. */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Un título de fuente por debajo de esto casi siempre es un marcador de posición
 * («Estudio», «Manual») y no la referencia que permite volver al documento.
 */
const MIN_TITLE_LENGTH = 12;

/**
 * Comprueba que una lista de fuentes se pueda usar para volver al documento.
 *
 * `where` es lo que se imprime cuando algo falla: el slug del artículo o del método,
 * para no tener que buscar a mano en qué archivo está la fuente rota.
 */
export function assertSourcesAreUsable(where: string, sources: Source[]): void {
  const today = new Date().toISOString().slice(0, 10);

  for (const source of sources) {
    const label = `"${source.title || source.url || "(sin título ni enlace)"}"`;

    if (!source.publisher.trim()) {
      throw new Error(
        `En "${where}", la fuente ${label} no dice quién la publica. El lector no puede ` +
          `juzgar un dato sin saber de dónde sale.`,
      );
    }

    if (source.title.trim().length < MIN_TITLE_LENGTH) {
      throw new Error(
        `En "${where}", la fuente ${label} tiene un título demasiado corto para volver al ` +
          `documento. Escribe el título real, no una etiqueta.`,
      );
    }

    if (!source.url.startsWith("https://")) {
      throw new Error(
        `En "${where}", la fuente ${label} no enlaza por https: "${source.url}".`,
      );
    }

    if (!ISO_DATE.test(source.retrieved)) {
      throw new Error(
        `En "${where}", la fuente ${label} tiene una fecha de consulta que no es ISO: ` +
          `"${source.retrieved}". Se escribe "AAAA-MM-DD".`,
      );
    }

    /*
     * Una fecha de consulta en el futuro significa casi siempre que se copió la línea
     * de otra fuente y no se tocó, que es justo lo que la fecha existe para evitar.
     */
    if (source.retrieved > today) {
      throw new Error(
        `En "${where}", la fuente ${label} dice haberse consultado el ${source.retrieved}, ` +
          `que todavía no ha llegado.`,
      );
    }
  }
}
