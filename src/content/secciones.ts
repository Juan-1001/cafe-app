/**
 * Las secciones del sitio y en qué estado está cada una.
 *
 * Este archivo es la única lista de secciones que existe. De aquí salen la navegación
 * de la cabecera, las rutas que sirve la pantalla «En proceso», el bloque de secciones
 * del final de esa pantalla y el sitemap. **Completar una sección es cambiar su
 * `estado` a `"en-pie"`**, y las cuatro cosas se enteran solas; añadir una sección
 * pendiente es una entrada más aquí y nada más.
 *
 * Existe porque antes la lista estaba escrita a mano en la cabecera, con la regla de
 * que una sección solo se añadía el día que su ruta estuviera en pie. Esa regla tenía
 * un motivo escrito —«enlazar a /recetas antes de construirla dejaría enlaces a un
 * 404»— y la pantalla «En proceso» lo elimina: ahora esas rutas existen y explican lo
 * que pasa. Lo que queda es una lista que se puede recorrer.
 *
 * Cuidado con una cosa al tocarlo: **lo importa la cabecera, que es componente de
 * cliente**. Así que aquí no puede entrar `node:fs` ni nada que solo exista en el
 * servidor. La comprobación que sí necesita el sistema de archivos vive aparte, en
 * `src/app/sitemap.ts`.
 */

export type EstadoSeccion =
  /** Tiene su ruta construida y su contenido. */
  | "en-pie"
  /** Está en el alcance del sitio y su ruta sirve la pantalla «En proceso». */
  | "en-proceso";

export type Seccion = {
  /** El primer tramo de su dirección: "granos" es /granos. */
  slug: string;
  /** Como se nombra en la navegación y en su propia página. */
  nombre: string;
  estado: EstadoSeccion;
  /**
   * Qué va a haber ahí, en una frase.
   *
   * No es un texto de relleno ni una promesa de marketing: es lo que el CLAUDE.md ya
   * declara como contenido de esa sección, resumido. La pantalla «En proceso» lo
   * enseña, porque quien llega a una sección vacía merece saber qué se está
   * construyendo y no solo que no está.
   */
  promesa: string;
};

/**
 * En el orden en que se leen en la cabecera, que es el orden en que se han ido
 * construyendo. Las pendientes van detrás de las que están en pie a propósito: lo que
 * funciona se ofrece primero.
 */
export const secciones: Seccion[] = [
  {
    slug: "granos",
    nombre: "Granos",
    estado: "en-pie",
    promesa:
      "Lo que le pasa al café antes de prepararlo, desde la planta hasta que deja de ser grano.",
  },
  {
    slug: "metodos",
    nombre: "Métodos",
    estado: "en-pie",
    promesa:
      "Guías paso a paso para preparar café en casa, con sus cantidades y sus tiempos.",
  },
  {
    slug: "recetas",
    nombre: "Recetas",
    estado: "en-proceso",
    promesa:
      "Preparaciones concretas, con ingredientes, proporciones y pasos.",
  },
  {
    slug: "tiendas",
    nombre: "Tiendas",
    estado: "en-proceso",
    promesa:
      "Cafeterías recomendadas en Bogotá: el barrio, qué las hace buenas y cómo llegar.",
  },
  {
    /*
     * El contenido de esta sección está bloqueado, y no por falta de tiempo: publicar
     * el contacto de personas reales es tratamiento de datos personales y necesita una
     * revisión legal antes del primer productor. Las tres condiciones están escritas en
     * el CLAUDE.md, en «Productores: la sección bloqueada».
     *
     * La pantalla «En proceso» no toca nada de eso —enseña el nombre de la sección y su
     * promesa, y ni un dato de nadie—, así que la ruta puede existir hoy sin problema.
     */
    slug: "productores",
    nombre: "Productores",
    estado: "en-proceso",
    promesa:
      "Un directorio de productores cafeteros para comprarles directo, sin intermediarios.",
  },
];

/** La ruta de una sección. Se calcula y no se escribe, para que no haya dos verdades. */
export function rutaDe(seccion: Seccion): string {
  return `/${seccion.slug}`;
}

/** Las que ya tienen contenido: las únicas que se enlazan y las únicas del sitemap. */
export function seccionesEnPie(): Seccion[] {
  return secciones.filter((seccion) => seccion.estado === "en-pie");
}

/** Las que sirven la pantalla «En proceso». De aquí salen sus rutas al compilar. */
export function seccionesEnProceso(): Seccion[] {
  return secciones.filter((seccion) => seccion.estado === "en-proceso");
}

export function getSeccion(slug: string): Seccion | undefined {
  return secciones.find((seccion) => seccion.slug === slug);
}

/**
 * Las demás secciones vistas desde una de ellas, que es lo que enseña el bloque del
 * final de la pantalla «En proceso»: dónde sí hay algo que leer y qué más está en
 * camino. Se quita a sí misma, porque ofrecerse a quien ya está ahí no dice nada.
 */
export function otrasSecciones(slug: string): Seccion[] {
  return secciones.filter((seccion) => seccion.slug !== slug);
}

/**
 * Revienta la compilación si dos secciones comparten slug.
 *
 * Con dos iguales, `getSeccion` devolvería siempre la primera y la segunda sería una
 * sección invisible: no saldría en su propia página, seguiría en la cabecera y nadie
 * entendería por qué. Es el tipo de fallo que no se ve mirando la web.
 */
function assertSlugsUnicos(lista: Seccion[]): void {
  const vistos = new Set<string>();

  for (const seccion of lista) {
    if (vistos.has(seccion.slug)) {
      throw new Error(
        `Hay dos secciones con el slug "${seccion.slug}" en src/content/secciones.ts. ` +
          `Los slugs son la dirección de cada una y tienen que ser distintos.`,
      );
    }
    vistos.add(seccion.slug);
  }
}

assertSlugsUnicos(secciones);
