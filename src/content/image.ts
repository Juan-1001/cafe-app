import fs from "node:fs";
import path from "node:path";
import type { ContentImage, DeclaredImage } from "./types";

/**
 * Convierte la imagen que declara el contenido en la que la página va a pintar.
 *
 * Las rutas del contenido están escritas por adelantado: dicen dónde va a estar cada
 * foto cuando se guarde. Esto es lo que impide que esa anticipación se convierta en una
 * página rota. Se mira si el archivo está de verdad en /public y, si no, se devuelve
 * `src: null`, que es lo que hace que se pinte el bloque de color.
 *
 * El resultado es que basta con dejar el archivo en su sitio para que la foto salga: no
 * hay que tocar ningún archivo de contenido ni acordarse de quitar un null.
 *
 * Se comprueba mirando el disco y no con una lista escrita a mano de qué fotos existen,
 * porque una lista así hay que acordarse de actualizarla y es justo lo que nadie hace.
 *
 * Esto solo puede correr en el servidor, que es donde se genera el sitio entero. Vive
 * en su propio archivo para que los tipos de contenido se puedan importar desde
 * cualquier parte sin arrastrar `fs` detrás, y quien lo llame tiene que ser un Server
 * Component.
 *
 * Es hermano de `resolveEquipmentImage`, que hace lo mismo para el catálogo de equipo.
 * Son dos porque entran por sitios distintos —allí se parte de una clave del catálogo y
 * aquí de la imagen ya escrita en la ficha o en el bloque del artículo—, pero la regla
 * que aplican es la misma.
 */
export function resolveContentImage(image: DeclaredImage): ContentImage {
  const file = path.join(process.cwd(), "public", image.file);

  return {
    src: fs.existsSync(file) ? image.file : null,
    alt: image.alt,
    credit: image.credit,
  };
}
