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

/**
 * Un documento al que el contenido remite. Empezó siendo la fuente de un dato de un
 * artículo de /granos y subió aquí al aparecer el segundo uso: las fichas de método
 * también remiten a documentos, aunque por otro motivo —ver `Grounding`—, y una sola
 * definición evita que las dos se separen.
 *
 * `retrieved` no es un adorno: los enlaces se mueren y las cifras se actualizan, así
 * que la fecha dice hasta cuándo se sabe que esto era lo que decía el documento.
 */
export type Source = {
  /** Quién publica, tal y como se cita a la vista: "Organización Internacional del Café". */
  publisher: string;
  title: string;
  url: string;
  /** Fecha ISO (YYYY-MM-DD) en la que se consultó. */
  retrieved: string;
};
