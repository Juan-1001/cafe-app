/**
 * Una fecha ISO del contenido, escrita como se lee en Colombia: «12 de septiembre de
 * 2026». Vive aquí y no dentro de una página porque la usan dos: las fuentes de un
 * artículo de /granos y el bloque de procedencia de una ficha de método.
 *
 * Se le pega la hora cero para construir la fecha. Sin eso, `new Date("2026-09-12")`
 * se interpreta en UTC y en Bogotá, que va cinco horas por detrás, se leería como el
 * día anterior.
 */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
