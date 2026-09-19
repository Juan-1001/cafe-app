import type { MetadataRoute } from "next";

/**
 * El `robots.txt`, que Next genera de aquí.
 *
 * Deja pasar a todo el mundo y apunta al mapa del sitio. Es todo lo que tiene que
 * hacer, y lo que importa es lo que **no** hace.
 *
 * **No bloquea las secciones en proceso, aunque parezca lo lógico.** Un `Disallow` de
 * /recetas no dice «no la indexes»: dice «no la leas». Y si el buscador no puede
 * leerla, tampoco puede ver el `noindex` que esa página lleva escrito, así que la orden
 * de no indexar nunca le llega. Una dirección bloqueada que alguien enlace desde fuera
 * puede acabar apareciendo igual en los resultados, sin descripción y sin que haya forma
 * de quitarla. Las dos herramientas se estorban: **el `noindex` necesita que la página
 * se pueda leer para poder obedecerse**, y por eso el bloqueo vive en el metadato de
 * cada página y no aquí.
 *
 * Lo mismo vale para `/sin-conexion`, que también lleva su `noindex` propio.
 */
const SITIO = "https://presuntocafe.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITIO}/sitemap.xml`,
  };
}
