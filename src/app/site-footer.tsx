/**
 * El cierre del sitio: la franja lavanda que va al final de todas las páginas.
 *
 * No es una zona de enlaces ni un mapa del sitio, y por eso no lleva ninguno. Es un
 * remate editorial: después de leer una guía paso a paso con sus gramos y sus
 * segundos, lo último que dice el sitio es que esa receta era un punto de partida.
 * Mientras no haya nada que enlazar aquí abajo —ni aviso legal, ni contacto, ni
 * secciones que la cabecera no tenga ya—, meter una rejilla de enlaces sería
 * inventarle un trabajo.
 *
 * Al no haber enlaces tampoco hay encabezados: las tres frases son párrafos. Un `h2`
 * con el titular metería «La receta es solo el punto de partida.» en el esquema de
 * encabezados de todas las páginas del sitio, compitiendo con los títulos de verdad
 * del contenido; el `<footer>` ya es una región con nombre para quien navega con
 * lector de pantalla y no necesita un título que lo anuncie.
 *
 * Dos cosas del diseño se salen de lo habitual del sitio y están así a propósito,
 * porque vienen dibujadas del propio diseño:
 *
 * - **El titular no va en Fraunces sino en IBM Plex Sans.** En el resto del sitio los
 *   títulos son Fraunces; aquí las dos tipografías se cambian el papel —la frase
 *   grande en sans muy apretada, la respuesta en Fraunces ligera— y ese contraste es
 *   lo que hace que las dos frases se lean como una réplica y no como dos titulares.
 * - **Todo el texto va en `paper` sobre `lavender-deep`**, que da 4,9:1: pasa el
 *   mínimo AA de texto normal, así que vale también para el rótulo pequeño de arriba.
 *   Es el mismo par, invertido, que ya hace válido al lavanda sobre `ink`.
 */
/**
 * El identificador del pie en el documento. Lo lee el panel del cronómetro
 * (`timed-steps.tsx`) para saber dónde empieza la franja y apartarse antes de pisarla.
 * Se exporta en lugar de escribir la cadena en los dos sitios, igual que `PAGE_TOP_ID`.
 */
export const SITE_FOOTER_ID = "site-footer";

export function SiteFooter() {
  return (
    /*
     * A sangre por los dos lados, como la franja del 404: el ancho entero es lo que lo
     * separa del contenido de la página, que siempre lleva márgenes laterales.
     *
     * No lleva margen por arriba porque todas las páginas terminan con su propio
     * `pb-24 md:pb-36`, que ya deja el aire. Si alguna página futura acaba a ras, el
     * aire lo pone ella y no esta franja: un margen aquí se sumaría al de todas las
     * demás.
     *
     * El relleno del diseño son 100 px en escritorio y 50 en móvil. Los 100 se
     * escriben tal cual (`p-25`) y los 50 bajan a 48 (`pt-12`), que es el múltiplo de
     * 4 de la escala del proyecto; dos píxeles en un relleno de cincuenta no se ven, y
     * salirse de la escala por ellos sí se nota en el código. Entre medias hay un
     * escalón en `md` que el diseño no dibuja: a 768 px, 100 de relleno a cada lado
     * dejarían 568 de contenido para un titular pensado sobre 1240.
     *
     * Por abajo, en móvil, el relleno sube a 80 px y no son 80 porque sí: en la esquina
     * de abajo a la derecha está la pestaña «Volver al inicio», que mide 44 px de alto
     * y se apoya en ese borde. Con los 48 del diseño, la última línea de la franja le
     * pasaba a cuatro píxeles; con 80 quedan 36 de aire. La pestaña es `md:hidden`, así
     * que en escritorio el relleno de abajo vuelve a ser el del diseño.
     */
    <footer
      id={SITE_FOOTER_ID}
      className="bg-lavender-deep px-5 pt-12 pb-20 text-paper md:px-16 md:pt-16 md:pb-16 xl:px-25 xl:pt-25 xl:pb-25"
    >
      {/*
        El rótulo, en mono y mayúsculas como todos los rótulos del sitio, pero mayor
        que ellos: aquí no etiqueta una sección dentro de una página, abre la última
        voz. El espaciado va en `em` (0,12) y no en la utilidad `tracking-widest`
        (0,1) para que se mantenga proporcional al cambiar de tamaño, que es como está
        puesto en el diseño en los dos anchos.
      */}
      <p className="font-mono text-sm uppercase tracking-[0.12em] md:text-lg xl:text-xl">
        Haga su propio parche
      </p>

      {/*
        Las dos frases del centro. La segunda va empujada a la derecha —`items-end`—
        y ahí está la composición: la primera arranca en el margen izquierdo y la
        respuesta cae desplazada, como quien contesta desde el otro lado. En móvil no
        hay hueco para desplazar nada y las dos ocupan el ancho entero, así que la
        alineación no se nota; es el mismo código en los dos casos.
      */}
      <div className="mt-6 flex flex-col items-end gap-4 md:mt-12 md:gap-6">
        <p
          className="w-full font-sans text-5xl font-semibold leading-[0.85] tracking-[-0.1em] md:text-7xl xl:text-8xl"
        >
          {/*
            El corte de la frase está escrito porque las dos mitades no son
            intercambiables: «La receta es solo el» arriba y «punto de partida.»
            abajo. En escritorio cada mitad es un bloque y el corte es fijo; dejarlo
            al ancho de la ventana lo partiría en «…es solo el punto de / partida.» y
            el remate se quedaría solo en la segunda línea.

            En móvil los dos trozos vuelven a ser texto corrido y el corte lo hace el
            ancho, que da el mismo sitio: a 48 px «La receta es solo el» mide unos 328
            px y la palabra siguiente ya no cabe ni en los 400 del diseño ni en los
            335 de una pantalla de 375. Forzarlo también ahí sería empeñarse en un
            corte que se cumple solo.
          */}
          <span className="md:block">La receta es solo el </span>
          <span className="md:block">punto de partida.</span>
        </p>

        {/*
          La respuesta, en Fraunces ligera. El ancho máximo es el del diseño (714 px
          de los 1240 de contenido), y por debajo de ese ancho no hace nada: en las
          pantallas medianas la frase ocupa lo que hay y solo a partir de que sobre
          sitio se convierte en la columna desplazada a la derecha.

          **Se queda en 72 px y no sube a los 96 del diseño**, que es lo que la dejaba
          en tres líneas. Es la discrepancia de la Fraunces anotada en el CLAUDE.md,
          medida aquí: a 96 px «sola forma de hacerse.» ocupa 907 px y la caja mide
          714, así que ni partiendo la frase por donde la parte el diseño cabía. El
          mayor cuerpo que entra en esa caja son 74 px, y se usan 72 —el escalón de la
          escala— porque ahí la segunda línea mide 680 y **la holgura son 34 px
          elegidos**; con 74 quedarían diez, que es una casualidad.

          La otra salida era dejar los 96 y ensanchar la caja hasta 914 px como mínimo,
          y se descartó: la caja estrecha es lo que empuja la respuesta a la derecha, y
          con 960 px la frase arrancaría casi donde la pregunta y se perdería el efecto
          de contestar desde el otro lado. Cede el cuerpo, no la composición.

          Como el cuerpo de `lg` y el de `xl` pasan a ser el mismo, aquí no hay tramo
          `xl`. No es un olvido: es que a partir de 1024 px la frase ya no crece.
        */}
        <p className="max-w-[714px] font-display text-4xl font-light leading-[0.96] tracking-[-0.03em] md:text-6xl lg:text-7xl">
          El <em className="italic">café</em> no tiene una sola forma de hacerse.
        </p>
      </div>

      {/*
        El pie de la franja, que es donde se explica el rótulo de arriba: qué es
        exactamente lo que hay que mover. El corte después de «temperatura...» está
        escrito porque separa la lista de la instrucción; lo de después se parte donde
        quiera el ancho.
      */}
      <p className="mt-6 max-w-[671px] text-xl leading-[0.96] tracking-[-0.025em] md:mt-12 md:text-2xl xl:text-4xl">
        Molienda, agua, tiempo, temperatura...
        <br />
        muévale a todo hasta encontrar ese café que grita:{" "}
        <em className="font-semibold italic">“Qué chimba”</em>.
      </p>

      {/*
        El hueco de la barra del cronómetro. En las fichas de método con pasos
        cronometrados, en móvil, esa barra va fija al borde de abajo de la pantalla y
        tapa los últimos 180 px del documento —que ahora son el final de esta franja y
        no el final del artículo—. `--brew-timer-height` la mide el propio panel en el
        navegador (ver `timed-steps.tsx`) y vale 0 en todo el resto del sitio, así que
        aquí no se abre ningún hueco donde no hay barra que esquivar.

        Va dentro de la franja y no debajo para que lo que crezca sea el lavanda: un
        margen por fuera dejaría una banda de crema asomando por detrás de la barra.
      */}
      <div aria-hidden="true" className="h-(--brew-timer-height) md:hidden" />
    </footer>
  );
}
