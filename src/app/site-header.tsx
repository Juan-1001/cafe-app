"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Logo } from "./logo";
import { rutaDe, secciones } from "@/content/secciones";

/**
 * Cabecera del sitio. La navegación **sale del registro de secciones** y ya no se
 * escribe aquí: una sección nueva aparece al añadirla a `src/content/secciones.ts`.
 *
 * Están todas, también las que aún no tienen contenido, y eso es un cambio de criterio.
 * Antes solo aparecían las construidas, y el motivo escrito era que «enlazar a /recetas
 * antes de construirla dejaría enlaces a un 404». Desde que existe la pantalla «En
 * proceso» ese 404 no existe: la ruta responde y explica qué se está construyendo. Lo
 * que queda del criterio viejo es su fondo, y es lo que justifica la marca de abajo: un
 * enlace de navegación no puede prometer lo que no hay.
 */

/**
 * Este componente es de cliente por una sola razón: medir su propia altura en el
 * navegador y publicarla en `--site-header-height`, la variable que usa el panel del
 * cronómetro para colocarse justo debajo. La altura no se puede saber desde el
 * servidor —depende de la tipografía ya cargada y del ancho de la ventana—, así que
 * es medida de verdad y no un número copiado en dos sitios que se desincroniza.
 *
 * Se mide con un observador de tamaño en lugar de una sola vez al cargar: así el
 * valor se actualiza también cuando la ventana cambia de ancho y la navegación pasa a
 * dos líneas, o cuando termina de cargar la tipografía y las letras cambian de alto.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const publishHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.getBoundingClientRect().height}px`,
      );
    };

    publishHeight();

    const observer = new ResizeObserver(publishHeight);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  return (
    /*
     * En escritorio la cabecera se queda arriba al hacer scroll y en móvil sube con
     * la página: abajo ya está la barra fija del cronómetro y dos elementos fijos
     * dejarían la pantalla del teléfono sin sitio para leer.
     *
     * Va `sticky` y no `fixed` a propósito. Una cabecera fija se sale del flujo de la
     * página y deja el contenido metido debajo, que hay que compensar con un hueco
     * del alto exacto; una pegajosa conserva su sitio, así que el contenido empieza
     * donde debe sin compensar nada.
     *
     * El fondo `paper` es lo que impide que el contenido se transparente por detrás
     * al pasar, y `z-20` la deja por encima del panel del cronómetro, que va en
     * `z-10`.
     */
    <header
      ref={headerRef}
      className="relative z-20 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 bg-paper px-6 pt-8 pb-4 md:sticky md:top-0 md:px-16 md:pt-10 md:pb-6"
    >
      {/*
        El logotipo es un dibujo, así que no lo puede leer nadie que navegue con lector
        de pantalla: el SVG va oculto para ellos y el nombre del sitio viaja en el texto
        de al lado, que está escondido a la vista pero no al oído. Sin eso, el enlace de
        vuelta a la portada se anunciaría como «enlace» a secas.

        El alto se fija en `h-5` (20 px) y en escritorio sube a `h-7` (28 px); el ancho
        sale solo de la proporción del dibujo. `w-auto` está escrito porque las
        utilidades de Tailwind para SVG no lo dan por hecho.

        En móvil va más bajo que en escritorio por una cuenta de ancho, no por gusto: el
        dibujo es siete veces más ancho que alto, así que cada píxel de alto le cuesta
        siete de ancho. A 24 px de alto mide unos 171, y junto a la navegación no cabe
        en la línea de una pantalla de 375 px: la cabecera pasaría a dos líneas siempre.
        A 20 px mide unos 142 y cabe. La cabecera sabe envolver —de ahí `flex-wrap` y
        `gap-y-2`—, pero eso está para cuando hace falta, no como estado normal.
      */}
      <Link href="/" className="leading-none">
        <Logo className="h-5 w-auto md:h-7" />
        <span className="sr-only">Presunto Café · Volver a la portada</span>
      </Link>

      <nav>
        {/*
          ─────────────────────────────────────────────────────────────────────────
           ESTO ES UN PARCHE CON FECHA. No es la forma final de la cabecera.
          ─────────────────────────────────────────────────────────────────────────

          Lo que va aquí es el menú del diseño: cuando se implemente, **esta cabecera
          desaparece y en móvil pasa a ser un botón**. El `flex-wrap`, el reparto en dos
          filas y la cuenta de holguras de abajo se van enteros con ese cambio; no hay
          que conservarlos ni adaptarlos. Está anotado también en «Pendientes conocidos»
          del CLAUDE.md.

          Mientras tanto la lista envuelve, porque con cinco secciones no hay otra. Está
          medido: los cinco nombres suman 361 px y en la cabecera de una pantalla de 375
          caben 327. **No caben ni pegados sin separación**, así que no hay ajuste que lo
          arregle; o envuelve, o desborda. Se eligió envolver para no entregar el sitio
          con scroll horizontal, que sí es un defecto sin discusión.

          La separación se queda en la misma de escritorio, 32 px, y no se aprieta en
          móvil, porque con ella el corte cae solo donde conviene y con holgura de
          sobra: arriba Granos, Métodos y Recetas —247 px de los 327, sobran 80— y
          abajo Tiendas y Productores —210, sobran 117—. Apretarla a 24 dejaría la
          primera fila en 327 exactos, que es la peor medida posible: envolvería o no
          según el redondeo del navegador.
        */}
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {secciones.map((seccion) => {
            const href = rutaDe(seccion);
            const isCurrentPage = pathname === href;
            const isInSection = pathname.startsWith(`${href}/`);
            const isActive = isCurrentPage || isInSection;
            const enProceso = seccion.estado === "en-proceso";

            return (
              <li key={seccion.slug}>
                <Link
                  href={href}
                  /*
                   * En la página de la propia sección el enlace es la página actual y
                   * va "page". Dentro de una ficha ya no lo es —es la sección que la
                   * contiene—, así que "page" ahí sería falso para quien navega con
                   * lector de pantalla; "true" significa justo eso: el elemento actual
                   * dentro de este grupo.
                   */
                  aria-current={
                    isCurrentPage ? "page" : isInSection ? "true" : undefined
                  }
                  /*
                   * El activo no se distingue solo por el color, que dejaría fuera a
                   * quien no lo percibe: lleva además un filete lavanda debajo. El
                   * inactivo reserva ese mismo filete en transparente para que al
                   * cambiar de sección la navegación no se mueva de sitio.
                   *
                   * El texto activo va en `ink` y no en lavanda porque son 12 px sobre
                   * `paper`, donde el lavanda no llega al contraste mínimo. En el
                   * filete sí vale: es un borde, no texto.
                   */
                  className={`block border-b-2 pb-1 font-mono text-xs uppercase tracking-widest hover:text-lavender-deep ${
                    isActive
                      ? "border-lavender text-ink"
                      : "border-transparent text-coffee"
                  }`}
                >
                  {seccion.nombre}
                  {/*
                    La marca de «en proceso». Es un círculo hueco, y va acompañado de
                    un texto que solo oye quien usa lector de pantalla, porque la marca
                    no puede ser solo una forma ni solo un color: dicho en voz alta, el
                    enlace tiene que sonar «Recetas, en proceso» y no «Recetas» a secas.

                    Un círculo y no un asterisco: el asterisco promete una nota al pie
                    que no existe. Y no la palabra entera escrita, porque en una
                    navegación de cinco tramos en mono y mayúsculas, tres «EN PROCESO»
                    seguidos son más ancho que todos los nombres juntos.

                    Va en `sage-deep`, que es el segundo acento y a 12 px sobre crema da
                    5,3:1: el lavanda queda reservado para el filete de la sección
                    activa, que es otra cosa y no debe confundirse con esta.
                  */}
                  {enProceso && (
                    <>
                      <span
                        aria-hidden="true"
                        className="ml-1 align-super text-[0.7em] text-sage-deep"
                      >
                        ○
                      </span>
                      <span className="sr-only">, en proceso</span>
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
