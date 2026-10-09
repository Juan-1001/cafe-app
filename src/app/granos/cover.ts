import type { Article } from "@/content/granos";
import { resolveContentImage } from "@/content/image";

/**
 * La foto que representa a un artículo fuera de él: la de su fila en el índice y la de
 * su tarjeta en «Sigue leyendo».
 *
 * Es la primera fotografía del propio artículo. No hay un campo de portada porque no ha
 * hecho falta: la primera foto es la que el artículo ya eligió para enseñarse, y así la
 * portada no puede contradecir lo que hay dentro. Si un día una portada tiene que ser
 * otra foto, ese es el momento de añadir el campo.
 *
 * Si el artículo no tiene ninguna foto, o el archivo de la primera todavía no está en
 * /public, devuelve `src: null` —o nada— y quien la pinta deja el bloque de color.
 */
export function articleCover(article: Article) {
  const first = article.blocks.find((block) => block.kind === "image");
  return first?.kind === "image" ? resolveContentImage(first.image) : null;
}
