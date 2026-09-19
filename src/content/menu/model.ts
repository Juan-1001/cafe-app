import { articles } from "../granos";
import { resolveContentImage } from "../image";
import { brewMethods, getBrewMethod } from "../metodos";
import { rutaDe, secciones, type EstadoSeccion } from "../secciones";
import type { ContentImage } from "../types";
import { MENU_METHODS } from "./index";

/**
 * El menú de la cabecera, ya armado y listo para pintar.
 *
 * ## Por qué existe este archivo
 *
 * La cabecera es componente de cliente —necesita saber si el panel está abierto y medirse
 * a sí misma—, y dos de las cosas que el menú enseña no se pueden calcular ahí:
 *
 * 1. **Las fotos.** `resolveContentImage` mira el disco para saber si el archivo existe,
 *    y el disco solo existe en el servidor.
 * 2. **Las cantidades.** Contar los métodos obliga a importar los diez, y eso metería el
 *    texto entero de las diez fichas en el JavaScript que descarga el navegador para
 *    pintar una cabecera.
 *
 * Así que el menú se arma aquí, al generar el sitio, y la cabecera recibe el resultado ya
 * hecho: un puñado de textos y rutas. Quien lo llama es el layout raíz, que sí es
 * componente de servidor.
 *
 * ## Cómo se reparten las secciones
 *
 * No hay ningún campo que diga «esta sección es destacada». Lo decide **si tiene foto o
 * no**, que es lo que declara el registro: con foto sale en grande, con su imagen y
 * cuánto hay dentro; sin foto sale como una línea. Las dos listas juntas son siempre las
 * cinco secciones, ni una repetida ni una fuera, y por eso el menú no puede quedarse sin
 * enseñar una sección nueva: si se añade al registro, sale por un sitio o por el otro.
 */

export type MenuLink = {
  href: string;
  label: string;
};

export type MenuSection = {
  slug: string;
  nombre: string;
  href: string;
  estado: EstadoSeccion;
  /**
   * Qué hay dentro, en dos palabras: «4 artículos», «10 métodos» o «En proceso». Es la
   * línea pequeña que va bajo el nombre.
   */
  cuenta: string;
  /** La foto ya resuelta, o null si esta sección no sale como destacado. */
  imagen: ContentImage | null;
  /**
   * Lo que se puede abrir dentro de la sección sin pasar por su índice. Vacío cuando la
   * sección no tiene nada que listar todavía, y entonces no se pinta ninguna lista.
   */
  enlaces: MenuLink[];
};

export type MenuModel = {
  /** Las secciones con foto, las que salen en grande. */
  destacadas: MenuSection[];
  /** Las secciones sin foto, las que salen como una línea de texto. */
  resto: MenuSection[];
};

/**
 * Cómo se cuenta lo que hay dentro de cada sección que está en pie.
 *
 * El nombre de la unidad vive aquí y no en el registro de secciones porque **solo hace
 * falta cuando la sección tiene contenido que contar**: una sección en proceso no enseña
 * una cifra, enseña que está en proceso. Añadir el campo a las cinco para usarlo en dos
 * sería escribir por adelantado lo que todavía no se sabe —cuando /tiendas exista habrá
 * que decidir si sus elementos son «tiendas», «cafeterías» o «sitios», y esa decisión se
 * toma entonces—.
 *
 * Contar obliga a importar el contenido de la sección, así que esto es también la lista
 * de lo que el menú mete en el paquete del servidor.
 */
const CONTADORES: Record<string, () => string> = {
  granos: () => contar(articles.length, "artículo", "artículos"),
  metodos: () => contar(brewMethods.length, "método", "métodos"),
};

function contar(cuantos: number, singular: string, plural: string): string {
  return `${cuantos} ${cuantos === 1 ? singular : plural}`;
}

/**
 * Los enlaces que el menú abre dentro de cada sección.
 *
 * Granos los lista todos, porque son cuatro y caben; Métodos enseña los cuatro elegidos
 * a mano en `index.ts`, con el criterio escrito allí. Una sección que no esté aquí sale
 * en el menú sin lista, que es lo correcto mientras no tenga nada dentro.
 */
const LISTAS: Record<string, () => MenuLink[]> = {
  granos: () =>
    articles.map((article) => ({
      href: `/granos/${article.slug}`,
      label: article.title,
    })),
  metodos: () =>
    MENU_METHODS.map((slug) => {
      // No puede ser undefined: index.ts revienta al importar si el slug no existe.
      const method = getBrewMethod(slug)!;
      return { href: `/metodos/${method.slug}`, label: method.name };
    }),
};

export function buildMenuModel(): MenuModel {
  const preparadas = secciones.map((seccion): MenuSection => {
    const contador = CONTADORES[seccion.slug];

    /*
     * Una sección en pie sin forma de contarse sería un destacado que no dice cuánto
     * hay dentro, y ese hueco no se vería como un error: se vería como una sección
     * vacía. Mejor que no compile el día que alguien ponga /recetas en pie y se olvide
     * de decir cómo se cuentan sus elementos.
     */
    if (seccion.estado === "en-pie" && !contador) {
      throw new Error(
        `La sección "${seccion.slug}" está en pie y el menú no sabe contar lo que tiene ` +
          `dentro. Añádele un contador en CONTADORES, en src/content/menu/model.ts.`,
      );
    }

    return {
      slug: seccion.slug,
      nombre: seccion.nombre,
      href: rutaDe(seccion),
      estado: seccion.estado,
      cuenta: contador ? contador() : "En proceso",
      imagen: seccion.imagen ? resolveContentImage(seccion.imagen) : null,
      enlaces: LISTAS[seccion.slug]?.() ?? [],
    };
  });

  return {
    destacadas: preparadas.filter((seccion) => seccion.imagen !== null),
    resto: preparadas.filter((seccion) => seccion.imagen === null),
  };
}
