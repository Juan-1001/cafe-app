import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "./eyebrow";

/**
 * El título de la pestaña. Sin esto se quedaría en «Presunto Café» a secas, que es la
 * reserva del layout y significa otra cosa: «esta página se olvidó de nombrarse». Aquí
 * la página sí sabe quién es.
 */
export const metadata: Metadata = {
  title: "Página no encontrada",
};

/**
 * Los cuatro datos, escritos aquí y no calculados de nada.
 *
 * Son los rótulos que sí existen en una ficha de método —ratio, tiempo total,
 * rendimiento y perfil de taza— abreviados a la palabra que cabe en una columna. El
 * chiste depende de que sean reconocibles, así que si algún día cambian los nombres
 * de la ficha de verdad, estos se cambian a mano detrás.
 *
 * «Sin notas» es el único valor que no es un número, y es a propósito: un perfil de
 * taza no se mide en cifras, así que un «0» ahí sería la broma mal contada.
 */
const NOTHING = [
  { label: "Ratio", value: "0:0" },
  { label: "Tiempo", value: "00:00" },
  { label: "Rendimiento", value: "0 ml" },
  { label: "Perfil", value: "Sin notas" },
] as const;

/**
 * La página que se ve cuando la dirección no existe.
 *
 * La broma es que el sitio se describe a sí mismo con una ficha técnica —ratio,
 * tiempo, rendimiento, perfil— y aquí esa misma ficha sale con todo a cero: la receta
 * no salió porque no había receta. Para que el chiste se entienda, los cuatro datos
 * tienen que leerse como la ficha de un método y no como un adorno.
 *
 * Aun así **no reutilizan la ficha técnica de verdad**, y no por descuido. Aquella no
 * es un componente: es una lista escrita dentro de `src/app/metodos/[slug]/page.tsx`
 * que recorre las claves de `BrewMethod["specs"]` y cuyas casillas pintan `Amounts` y
 * `RatioField`, que leen la calculadora de tazas. Sin un método no hay ni `specs` ni
 * calculadora. Y tampoco son la misma cosa a la vista: la de verdad son dos columnas
 * sobre fondo lavanda con el rótulo en sans, y esta son cuatro sobre crema con el
 * rótulo en mono. Esto es una cita de la ficha técnica, no la ficha técnica.
 *
 * Next la usa para dos cosas a la vez: para las direcciones que no existen y para el
 * `notFound()` que lanza una ficha de método con un slug desconocido. El texto vale
 * para las dos porque no promete de qué sección venías.
 */
export default function NotFound() {
  return (
    /*
      `flex-1` con el body en columna: lo que hace es que el pie del sitio se apoye en
      el borde de abajo de la pantalla cuando esta es más alta que el contenido. Esta
      es la única página del sitio lo bastante corta para que eso pase, y sin esto
      terminaría a media altura y dejaría un palmo de crema vacío debajo del pie.
    */
    <main className="flex-1">
      {/* El relleno de abajo es el mismo que el de las demás páginas: es el aire que
          separa el final del contenido del pie del sitio, y tiene que medir lo mismo
          aquí que en un artículo. */}
      <div className="px-6 pt-12 pb-24 md:px-16 md:pt-20 md:pb-36">
        {/*
          El titular a la izquierda y la explicación a la derecha, como en el diseño:
          el titular es lo que se lee de lejos y el párrafo lo que se lee después. En
          pantallas estrechas se apilan en ese mismo orden.

          Las dos columnas no empiezan a los 768 px sino a los 1024, y esa es la
          corrección que pedía el diseño por venir dibujado solo a 1440. A 768 el
          contenido mide 640 px: quitando la columna del párrafo y el espacio entre
          las dos, al titular le quedaban unos 120 y «Esta receta no salió» se partía
          en cuatro líneas de una palabra cada una. Hasta los 1024 px, entonces, una
          sola columna.

          Los anchos van en porcentaje y no en píxeles porque el diseño los da en
          proporción: el titular ocupa el 64 % del ancho útil de la página y el
          párrafo el 36 %. Un ancho fijo de 460 px es lo que desbordaba la pantalla a
          768, porque a esa altura ya no cabe.

          `items-start` y el desplazamiento del párrafo en escritorio lo dejan
          arrancando a la altura de la primera línea del titular y no la del rótulo,
          que es donde caía en el diseño.
        */}
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-12">
          <div className="lg:w-[58%] lg:shrink-0">
            <Eyebrow tone="lavender">Error 404</Eyebrow>

            {/*
              El salto de línea está escrito porque las dos mitades de la frase no son
              intercambiables: «Esta receta» arriba y «no salió» abajo es el remate, y
              dejar que caiga donde quiera el ancho de la ventana lo desarma.

              Por eso el tamaño baja por tramos hasta que «Esta receta» cabe en una
              línea en cada ancho, en vez de dejar que se parta: 48 px a 375, 72 desde
              640, 96 cuando el párrafo se pone al lado y 128 —los 118 del diseño— a
              partir de 1280, que es el primer ancho donde la columna del titular da
              para tanto. A 1024 con 128 px la frase mide 630 y la columna 520: se
              partiría en tres.
            */}
            <h1 className="mt-6 font-display text-5xl leading-none tracking-tight sm:text-7xl md:mt-8 lg:text-8xl xl:text-9xl">
              Esta <em>receta</em>
              <br />
              no salió.
            </h1>
          </div>

          <div className="mt-10 max-w-prose text-lg text-coffee lg:mt-14 lg:w-[36%] lg:shrink-0">
            <p>La página que buscabas no está por aquí.</p>
            <p className="mt-6">
              Puede que haya cambiado, que se haya perdido o que simplemente nunca
              la hayamos preparado.
            </p>
          </div>
        </div>

        {/*
          Los cuatro datos. A 375 px no caben en fila —«Sin notas» en mono a 34 px
          mide unos 184 px, más de la mitad de esa pantalla—, así que van de dos en
          dos. Desde 768 recuperan la fila de cuatro del diseño, y lo que se ajusta
          por tramos es el tamaño del valor y el espacio entre columnas: con los 34 px
          del diseño puestos ya a 768, «Sin notas» volvería a partirse en dos líneas.
        */}
        <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-dust pt-9 md:mt-40 md:grid-cols-4 md:gap-x-8 md:gap-y-0 xl:gap-x-16 md:pt-10">
          {NOTHING.map(({ label, value }) => (
            <div key={label}>
              <dt className="font-mono text-xs uppercase tracking-widest text-coffee">
                {label}
              </dt>
              <dd className="mt-3 font-mono text-2xl text-ink lg:text-3xl xl:text-4xl">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {/*
          La salida. Fue una franja lavanda a sangre hasta que el pie del sitio pasó a
          cerrar todas las páginas: eran dos franjas moradas pegadas —`lavender` encima
          de `lavender-deep`—, y el escalón entre los dos tonos se leía como un fallo de
          pintado y no como una decisión. Ahora el color lo pone el pie, que es de
          quien es, y aquí queda lo único que esta página necesita tener y las demás
          no: la puerta de vuelta.

          Se queda con la forma de los demás enlaces de vuelta del sitio —mono,
          mayúsculas y `lavender-deep`, como el «Todos los artículos» de un grano— en
          lugar de inventarse una: lo que distingue a esta página ya es todo lo de
          arriba.

          `min-h-11` son 44 px, el alto mínimo con el que un dedo acierta.
        */}
        <div className="mt-16 border-t border-dust pt-6 md:mt-24 md:flex md:items-baseline md:gap-16">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-3 font-mono text-xs uppercase tracking-widest text-lavender-deep hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender-deep"
          >
            Volver al inicio
            {/* La flecha dice «esto te saca de aquí» a la vista; leída en voz alta
                sería «flecha nordeste» detrás del texto del enlace, que no añade
                nada. */}
            <span aria-hidden="true">↗</span>
          </Link>

          <p className="mt-2 text-base text-coffee md:mt-0">
            Tal vez estaba buena. Tal vez no. Nunca lo sabremos.
          </p>
        </div>
      </div>
    </main>
  );
}
