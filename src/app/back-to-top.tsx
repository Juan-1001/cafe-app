"use client";

import { useEffect, useState } from "react";

/**
 * Id del destino al que salta el botón. Vive en el layout, pegado al principio del
 * body, y existe solo para recibir el foco. El desplazamiento y el foco son dos cosas
 * distintas: subir la página mueve lo que se ve, pero quien navega con lector de
 * pantalla sigue leyendo por donde estaba. Sin este destino el foco se quedaría en un
 * botón que acaba de desaparecer de la pantalla.
 */
export const PAGE_TOP_ID = "page-top";

/**
 * Cuándo aparece y cuándo se retira, medido en pantallas y no en píxeles: dos
 * pantallas son 1.300 px en un teléfono corto y 1.800 en uno largo, y lo que hace
 * molesto subir a mano no es la distancia recorrida sino cuántos arrastres cuesta
 * deshacerla.
 *
 * Aparece a las dos pantallas. Con una sola no hace falta —se sube con dos arrastres y
 * el botón sería un adorno que tapa texto desde el primer scroll—; a las dos ya son
 * cinco o seis, y a partir de ahí solo empeora.
 *
 * Se retira antes de donde aparece, a pantalla y media, y esa diferencia es
 * deliberada: con un único umbral, quedarse rondando ese punto —que es lo que pasa al
 * leer despacio— lo encendería y lo apagaría a cada gesto.
 */
const SHOW_AFTER_SCREENS = 2;
const HIDE_BEFORE_SCREENS = 1.5;

/**
 * Botón para volver al principio de la página. Solo en móvil: en escritorio la
 * cabecera se queda pegada arriba y el propio teclado sube de un golpe, así que ahí no
 * resuelve nada y solo sería una cosa más flotando.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // El aviso de scroll llega muchas veces por gesto; con esto se lee una sola vez
    // por fotograma y no se toca el estado de React en cada aviso.
    let frame = 0;

    const read = () => {
      frame = 0;

      const screen = window.innerHeight;
      const scrolled = window.scrollY;

      // Aquí está la histéresis: el umbral que se compara depende de si el botón se ve
      // ahora mismo. Visible, aguanta hasta pantalla y media; escondido, no aparece
      // hasta las dos.
      setVisible((shown) =>
        scrolled > screen * (shown ? HIDE_BEFORE_SCREENS : SHOW_AFTER_SCREENS),
      );
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    // Una primera lectura al montar, porque se puede llegar a mitad de página: con el
    // botón de atrás del navegador, o con un enlace a un ancla.
    read();

    window.addEventListener("scroll", schedule, { passive: true });
    // Girar el teléfono cambia el alto de la pantalla, y con él los dos umbrales.
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  function handleClick() {
    // El foco primero y sin desplazar —`preventScroll`—, porque llevarlo al destino
    // haría su propio salto instantáneo y se comería el desplazamiento suave.
    document.getElementById(PAGE_TOP_ID)?.focus({ preventScroll: true });

    window.scrollTo({
      top: 0,
      // Quien ha pedido menos movimiento en su sistema no quiere ver pasar la página
      // entera por delante: se le da el salto seco, que es lo que espera.
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  return (
    /*
      Una pestaña pegada a la esquina de abajo a la derecha, no un círculo flotante con
      sombra: bordes finos, esquinas rectas y los tokens de siempre.

      `bottom` sale de `--brew-timer-height`, que publica el propio panel del cronómetro
      midiéndose en el navegador (ver `timed-steps.tsx`). En las fichas con cronómetro la
      pestaña se apoya en el borde superior de esa barra, como si fuera una lengüeta
      suya; en el resto del sitio la variable vale 0 y se apoya en el borde de la
      pantalla. Es el mismo gesto en los dos casos, y por eso no hay dos elementos
      disputándose el mismo sitio: hay uno solo anclado abajo, con o sin cronómetro.

      Esa variable mide el alto del panel, que en escritorio es una tarjeta arriba a la
      derecha y no una barra abajo. Ahí el número no significaría lo mismo, pero tampoco
      se lee nunca: este botón es `md:hidden`.

      Escondido no se desmonta, para que pueda irse con un fundido, pero `inert` lo saca
      del recorrido del tabulador y del árbol de accesibilidad: un botón invisible al
      que se pudiera llegar con el teclado sería peor que no tenerlo.
    */
    <button
      type="button"
      onClick={handleClick}
      inert={!visible}
      className={`fixed right-0 bottom-(--brew-timer-height) z-10 flex min-h-11 items-center gap-2 border-t border-l border-ink bg-paper px-4 font-mono text-xs uppercase tracking-widest text-ink transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-lavender-deep motion-reduce:transition-none md:hidden ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUpIcon />
      Volver al inicio
    </button>
  );
}

/** Flecha hacia arriba de trazo fino, del mismo grosor que el resto de los iconos. */
function ArrowUpIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M8 13V3" />
      <path d="M3.5 7.5 8 3l4.5 4.5" />
    </svg>
  );
}
