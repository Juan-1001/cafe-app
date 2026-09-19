import { existsSync } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { brewMethods } from "@/content/metodos";
import { articles } from "@/content/granos";
import { rutaDe, seccionesEnPie, secciones } from "@/content/secciones";

/**
 * El mapa del sitio para los buscadores. Next lo convierte en `/sitemap.xml`.
 *
 * Lo que entra son **solo las secciones en pie** y sus páginas. Las que están en
 * proceso se quedan fuera por la misma razón por la que llevan `noindex`: una sección
 * sin contenido no es un resultado de búsqueda útil. Y se quedan fuera solas, porque
 * esto lee el mismo registro que todo lo demás: el día que una se complete, aparece
 * aquí sin que nadie toque este archivo.
 *
 * Tampoco entra `/sin-conexion`, y no hace falta excluirla a mano: no es una sección,
 * así que no está en el registro. Es la ventaja de que la lista sea una sola.
 */
const SITIO = "https://presuntocafe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  assertSeccionesEnPieTienenRuta();

  const paginas: MetadataRoute.Sitemap = [
    { url: SITIO, changeFrequency: "monthly", priority: 1 },
  ];

  for (const seccion of seccionesEnPie()) {
    paginas.push({
      url: `${SITIO}${rutaDe(seccion)}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const article of articles) {
    paginas.push({ url: `${SITIO}/granos/${article.slug}`, priority: 0.6 });
  }

  for (const method of brewMethods) {
    paginas.push({ url: `${SITIO}/metodos/${method.slug}`, priority: 0.6 });
  }

  return paginas;
}

/**
 * Comprueba que cada sección marcada «en pie» tenga de verdad su carpeta de ruta.
 *
 * Es el fallo que el registro hace fácil de cometer: cambiar un `estado` a `"en-pie"`
 * antes de construir la sección. El sitio no se rompería al compilar —simplemente la
 * cabecera enlazaría a un 404 y el sitemap se lo diría a Google—, así que se descubriría
 * pinchando, o no se descubriría.
 *
 * Vive aquí y no en `src/content/secciones.ts` porque necesita `node:fs`, y aquel
 * archivo lo importa la cabecera, que es componente de cliente: un `node:fs` allí
 * rompería la compilación del navegador. Este módulo solo lo evalúa el servidor al
 * generar el sitio, que es exactamente cuando hace falta la comprobación.
 */
function assertSeccionesEnPieTienenRuta(): void {
  for (const seccion of secciones) {
    if (seccion.estado !== "en-pie") continue;

    const carpeta = path.join(process.cwd(), "src", "app", seccion.slug);

    if (!existsSync(carpeta)) {
      throw new Error(
        `La sección "${seccion.nombre}" está marcada como "en-pie" en ` +
          `src/content/secciones.ts y no existe src/app/${seccion.slug}/. La cabecera ` +
          `enlazaría a un 404 y el sitemap se lo daría a los buscadores. Si la sección ` +
          `aún no está construida, su estado es "en-proceso".`,
      );
    }
  }
}
