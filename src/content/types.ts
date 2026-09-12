/**
 * Tipos que comparten todas las secciones de contenido. Lo que solo le sirve a una
 * sección vive en el `types.ts` de su carpeta; aquí solo sube lo que ya usan dos.
 */

/**
 * Imagen de contenido. Mientras `src` sea null se pinta un bloque de color de la
 * paleta con la proporción correcta; para publicar la foto real basta con guardar
 * el archivo en /public/images/<sección>/ y poner aquí su ruta.
 *
 * El `src` nullable es deliberado y no un descuido: apuntar a la ruta de un archivo
 * que todavía no existe deja la página rota sin que se note al leer el código.
 */
export type ContentImage = {
  src: string | null;
  alt: string;
};
