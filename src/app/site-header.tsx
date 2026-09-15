"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Logo } from "./logo";

/**
 * Cabecera del sitio. Solo aparecen las secciones que ya existen: enlazar a
 * /granos, /recetas o /tiendas antes de construirlas dejaría enlaces a un 404.
 * Cada sección nueva se añade a esta lista cuando su ruta esté en pie.
 */
const NAV_LINKS = [
  { href: "/granos", label: "Granos" },
  { href: "/metodos", label: "Métodos" },
] as const;

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
        <ul className="flex gap-8">
          {NAV_LINKS.map((link) => {
            const isCurrentPage = pathname === link.href;
            const isInSection = pathname.startsWith(`${link.href}/`);
            const isActive = isCurrentPage || isInSection;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
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
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
