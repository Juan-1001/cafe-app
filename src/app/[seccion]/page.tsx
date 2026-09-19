import type { Metadata } from "next";
import Link from "next/link";
import {
  getSeccion,
  otrasSecciones,
  rutaDe,
  seccionesEnProceso,
  type Seccion,
} from "@/content/secciones";

/**
 * Las rutas que sirve esta pantalla salen del registro, así que **añadir una sección
 * pendiente es una línea en `src/content/secciones.ts`** y aquí no se toca nada.
 *
 * `dynamicParams = false` es lo que impide que este tramo dinámico se coma el sitio
 * entero. Sin él, `/cualquier-cosa` intentaría pintarse como una sección en proceso y
 * el 404 dejaría de existir para todas las direcciones de un solo tramo. Con él, solo
 * responden los slugs que esta función devuelve y el resto cae en el 404 de siempre.
 *
 * Las rutas que ya existen como carpeta —/granos, /metodos, /sin-conexion— no corren
 * peligro: un tramo escrito gana siempre a uno dinámico, así que este solo recoge lo
 * que no tiene carpeta propia.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return seccionesEnProceso().map((seccion) => ({ seccion: seccion.slug }));
}

/**
 * El nombre de la sección en la pestaña, y la orden de no indexar.
 *
 * `index: false` porque una sección sin contenido no tiene nada que hacer en un
 * buscador: quien la encontrara ahí llegaría esperando recetas y se iría creyendo que
 * el sitio está roto. El día que la sección se complete, cambiar su estado en el
 * registro la saca de aquí y la mete en el sitemap.
 *
 * `follow: true`, y esa es la diferencia con `/sin-conexion`, que lleva `follow: false`:
 * aquella no enlaza a ninguna parte, y esta sí —abajo están las secciones que ya
 * existen—. Queremos que esos enlaces se sigan aunque esta página no se indexe.
 *
 * Lo que NO se hace es bloquear estas rutas en el robots.txt, aunque suene a lo mismo.
 * El porqué está escrito en `src/app/robots.ts`.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[seccion]">): Promise<Metadata> {
  const { seccion: slug } = await params;
  const seccion = getSeccion(slug);

  return {
    title: seccion?.nombre,
    robots: { index: false, follow: true },
  };
}

/**
 * Lo que dice la casilla grande de cada sección.
 *
 * Son las dos únicas palabras de esta pantalla que no vienen ni del diseño ni del
 * registro, así que se dejan juntas y a la vista para poder cambiarlas de una. «Listo»
 * va en masculino invariable, que es como se usa suelto —«ya está, listo»—, porque la
 * alternativa concordada no funciona con los dos géneros de la lista: «Granos: lista»
 * no se sostiene.
 *
 * Se descartó «Abierta» para la sección disponible, que era la primera opción: en
 * `/tiendas` esa palabra va a significar que el local está abierto, y una misma palabra
 * no puede decir dos cosas en el mismo sitio.
 */
const ESTADO_EN_CASILLA = {
  "en-pie": "Listo",
  "en-proceso": "En proceso",
} as const;

/**
 * La pantalla de una sección que está en el alcance del sitio pero todavía no existe.
 *
 * Una sola para las tres —Recetas, Tiendas y Productores—, con la composición del
 * diseño: el rótulo, el titular de dos líneas con una palabra en lavanda, el párrafo
 * angosto y, tras un filete, la fila de casillas en mono.
 *
 * Tres cosas se apartan de lo dibujado, y las tres se decidieron antes de escribir:
 *
 * - **El rótulo lleva el nombre de la sección**, donde el diseño pone «001». Sin eso
 *   las tres rutas serían la misma página carácter por carácter, y quien entra a
 *   /recetas no sabría que lo que está en obras es Recetas.
 * - **Las casillas son las secciones del sitio**, no la broma del café del diseño
 *   —molienda, agua, tiempo, resultado—. Se conserva la forma entera: el filete, las
 *   cuatro columnas, el rótulo pequeño arriba y el dato grande en mono debajo. Lo que
 *   cambia es que ahora el bloque lleva a alguna parte y se mantiene solo.
 * - **No se pinta la franja lavanda del pie.** El pie del sitio va montado en el layout
 *   y sale en todas las páginas, así que habría dos bandas moradas pegadas, `lavender`
 *   sobre `lavender-deep`. Es lo mismo que le pasó al 404 y allí está contado por qué
 *   se quitó: el escalón entre los dos tonos se lee como un fallo de pintado. Con la
 *   franja se van su «Volver al inicio» y su frase.
 */
export default async function SeccionEnProceso({
  params,
}: PageProps<"/[seccion]">) {
  const { seccion: slug } = await params;
  const seccion = getSeccion(slug);

  /*
   * Con `dynamicParams = false` esto no puede pasar al servir la página: solo llegan
   * aquí los slugs que `generateStaticParams` devolvió, y salen del mismo registro.
   * Está para que TypeScript sepa que a partir de aquí hay sección, y para que si
   * alguien desacopla las dos funciones el fallo se lea en vez de reventar en un
   * `undefined.nombre`.
   */
  if (!seccion) {
    throw new Error(
      `La ruta /${slug} se pintó como sección en proceso y ese slug no está en ` +
        `src/content/secciones.ts.`,
    );
  }

  const otras = otrasSecciones(seccion.slug);

  return (
    /*
      `flex-1` con el body en columna y `justify-center`: el bloque se queda a media
      altura de la pantalla, que es donde cae en el diseño, y el crema llega abajo del
      todo aunque el contenido no dé para tanto.

      Los 46 px de separación del diseño se redondean a 48 —`gap-12`—, que es el
      múltiplo de 4 de la escala del proyecto; dos píxeles ahí no se ven.

      El margen lateral sube por tramos hasta los 100 px dibujados, igual que hace el
      pie del sitio con los suyos: el diseño viene solo a 1440 y 100 px de margen a cada
      lado en una pantalla de 768 dejarían 568 de contenido para una fila de cuatro
      columnas.
    */
    <main className="flex flex-1 flex-col justify-center gap-12 px-6 py-16 md:px-16 md:py-20 xl:px-25">
      {/*
        El rótulo y el titular van dentro del mismo `h1` aunque el diseño los dibuje
        como dos bloques sueltos. A la vista no cambia nada —el margen de en medio son
        los mismos 48 px que separan todo lo demás—, y a cambio el encabezado de la
        página nombra la sección: leído en voz alta suena «En construcción, Recetas.
        Estamos tostando algo». Con el titular solo, las tres pantallas tendrían el
        mismo encabezado y ninguna diría de qué sección habla.
      */}
      <h1>
        {/*
          16 px y no los 12 de los rótulos del resto del sitio, como pide el diseño.
          Es la misma licencia que se tomó el pie: aquí el rótulo no etiqueta una
          sección dentro de una página, abre la página entera.

          **Va en `lavender-deep` y el diseño lo pinta en `lavender`.** No es una
          preferencia: a 16 px sobre crema el lavanda claro da 3,2:1 y el mínimo AA de
          texto normal es 4,5. El profundo da 4,9. Es la misma corrección que lleva
          escrita el componente `Eyebrow` para sus dos tonos.
        */}
        <span className="block font-mono text-base tracking-wide text-lavender-deep uppercase">
          En construcción · {seccion.nombre}
        </span>

        {/*
          El salto de línea está escrito porque las dos mitades no son intercambiables:
          «Estamos» arriba y «tostando algo.» abajo es el remate, con la palabra en
          lavanda abriendo la segunda línea.

          Los 72 px del diseño se quedan arriba del todo y bajan por tramos. Abajo se
          para en 48, que es el mismo cuerpo con el que el 404 y `/sin-conexion` abren a
          375 px: son las tres páginas sueltas del sitio y deben leerse igual de grandes.

          Está medido, y el corte es limpio: «tostando algo.» pide 303 px de los 327 que
          quedan en esa pantalla —**24 px de holgura**— y al siguiente escalón, 52, se
          pasa por un píxel. No hay margen para subir, y bajar a 36 dejaría el titular a
          la mitad que el de sus dos hermanas sin ninguna razón.
        */}
        <span className="mt-12 block font-display text-5xl leading-none tracking-[-0.02em] text-ink md:text-6xl xl:text-7xl">
          Estamos
          <br />
          <span className="text-lavender-deep">tostando</span> algo.
        </span>
      </h1>

      {/*
        El párrafo, en la caja angosta de 507 px del diseño. El salto de línea escrito
        separa las dos frases, que es como está dibujado; en pantallas estrechas el
        ancho manda y el salto solo adelanta el que iba a hacer de todos modos.
      */}
      <p className="max-w-[507px] text-lg leading-relaxed text-coffee">
        Esta página todavía está agarrando cuerpo.
        <br />
        Estamos ajustando la molienda, probando el agua y dejando que las cosas tomen
        su tiempo.
      </p>

      {/*
        Las casillas. Recorren el registro y se quitan a sí mismas, así que no hay nada
        que mantener: el día que Recetas se termine, ese cambio de estado la convierte
        aquí en enlace vivo sin que nadie toque esta página.

        **Son cuatro porque hoy el sitio tiene cinco secciones y una es la actual.** Esa
        cuenta es la que sostiene la fila de cuatro columnas del diseño; con una sección
        más serían cinco casillas y la fila habría que repensarla, no estirarla.

        Va como `nav` con nombre pero sin encabezado visible, porque el diseño no dibuja
        ninguno: el filete es todo lo que separa este bloque del anterior.
      */}
      <nav aria-label="Las demás secciones del sitio">
        {/*
          El filete del diseño. Es un borde y no un `hr` con margen: así el hueco de 36
          px que lo separa de las casillas lo pone la rejilla y no se suma dos veces.
        */}
        {/*
          La fila de cuatro del diseño no llega hasta 1024 px, y está medido: a 768 cada
          columna mide 136 px y «En proceso» pide unos 144 a ese cuerpo, así que se
          partía en dos líneas mientras «Listo» se quedaba en una y la fila salía
          despareja. En el diseño las cuatro casillas son de una línea. Hasta ahí, dos
          columnas; desde 1024 las cuatro, con 56 px de holgura en la casilla más ancha.
        */}
        <ul className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-dust pt-9 lg:grid-cols-4">
          {otras.map((otra) => (
            <li key={otra.slug}>
              <CasillaDeSeccion seccion={otra} />
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}

/**
 * Una casilla: el nombre de la sección arriba en pequeño y su estado debajo en grande,
 * que es la gramática de la fila del diseño —la cosa, y qué le pasa a la cosa—.
 *
 * La disponible es enlace entera y la pendiente es texto. **No se distinguen por el
 * color**: las dos llevan el mismo `ink` en el dato y el mismo `coffee` en el rótulo, y
 * lo que cambia es la palabra —«Listo» frente a «En proceso»— más la flecha de salida
 * que el sitio ya usa en sus enlaces. Quien no perciba el tono lee lo mismo.
 *
 * Los dos casos comparten rejilla y alto para que la fila no se descoloque cuando una
 * sección se complete: lo que cambia es qué se puede hacer con la casilla, no dónde
 * está.
 */
function CasillaDeSeccion({ seccion }: { seccion: Seccion }) {
  const disponible = seccion.estado === "en-pie";

  /*
   * Los 32 px del dato grande son los del diseño y se quedan para el ancho donde está
   * dibujado. Bajan en pantallas estrechas porque ahí la fila de cuatro se parte en dos
   * columnas: «En proceso» en mono a 32 px mide más que media pantalla de 375 px.
   */
  const dato = "font-mono text-xl text-ink md:text-2xl xl:text-[32px]";
  const rotulo = "font-mono text-base tracking-wide text-coffee uppercase";

  if (!disponible) {
    return (
      <div>
        <span className={`block ${rotulo}`}>{seccion.nombre}</span>
        <span className={`mt-2 block ${dato}`}>
          {ESTADO_EN_CASILLA[seccion.estado]}
        </span>
      </div>
    );
  }

  return (
    <Link
      href={rutaDe(seccion)}
      className="group block hover:text-lavender-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender-deep"
    >
      <span className={`block ${rotulo} group-hover:text-lavender-deep`}>
        {seccion.nombre}
      </span>
      <span className={`mt-2 block ${dato} group-hover:text-lavender-deep`}>
        {ESTADO_EN_CASILLA[seccion.estado]}{" "}
        {/* La flecha dice «esto te saca de aquí» a la vista; leída en voz alta sería
            «flecha nordeste» detrás del nombre de la sección, que no añade nada. */}
        <span aria-hidden="true">↗</span>
      </span>
    </Link>
  );
}
