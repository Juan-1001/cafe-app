"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Cabecera del sitio. Solo aparecen las secciones que ya existen: enlazar a
 * /granos, /recetas o /tiendas antes de construirlas dejaría enlaces a un 404.
 * Cada sección nueva se añade a esta lista cuando su ruta esté en pie.
 */
const NAV_LINKS = [{ href: "/metodos", label: "Métodos" }] as const;

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
      <Link href="/" className="font-display text-2xl leading-none">
        Café
      </Link>

      <nav>
        <ul className="flex gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-coffee hover:text-lavender-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
