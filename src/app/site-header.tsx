"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Logo } from "./logo";
import { SiteMenuPanel } from "./site-menu-panel";
import { rutaDe, secciones } from "@/content/secciones";
import type { MenuModel } from "@/content/menu/model";

/**
 * Cabecera del sitio: la barra de siempre y, detrás del botón «Menú», el panel con las
 * cinco secciones y lo que hay dentro de cada una.
 *
 * La navegación **sale del registro de secciones** (`src/content/secciones.ts`) y ya no se
 * escribe aquí: una sección nueva aparece al añadirla allí. Están todas, también las que
 * no tienen contenido, con un círculo hueco al lado y un texto que solo oye quien usa
 * lector de pantalla, porque **un enlace de navegación no puede prometer lo que no hay**.
 *
 * Lo que el menú enseña dentro del panel no se calcula aquí: llega hecho desde
 * `src/content/menu/model.ts`, que corre en el servidor. Este componente es de cliente y
 * ahí no se puede mirar el disco para resolver una foto ni importar las diez fichas de
 * método para contarlas.
 *
 * ## Esto sustituye al parche del `flex-wrap`
 *
 * Hasta ahora los cinco nombres de sección se dejaban envolver en dos filas en móvil,
 * porque sumaban 361 px y en la cabecera caben 327. Aquello estaba anotado como apaño con
 * fecha y **se ha ido entero**: en móvil la navegación ya no está en la barra, está dentro
 * del panel. No queda nada que conservar de aquel reparto en 3 + 2.
 */

/**
 * A partir de qué ancho caben en la barra el logotipo, los cinco nombres y el botón.
 *
 * **El número está medido en el navegador, no calculado.** Con las cinco secciones de hoy
 * la barra necesita **1053 px**: 128 de márgenes, 199 del logotipo, 489 de los cinco
 * nombres, 172 del botón y 64 de las dos separaciones. Por debajo de eso, o desborda o
 * envuelve.
 *
 * Se corta en 1100 y no en 1053 **para que la holgura sea una decisión**: 47 px de sobra,
 * elegidos, en lugar de los 8 que quedarían cortando en el primer múltiplo redondo por
 * encima del mínimo. Esos 8 dependerían de que Space Mono mida exactamente lo mismo
 * siempre, y mientras la tipografía carga no lo mide.
 *
 * No es un punto de corte de Tailwind porque ninguno cae donde hace falta: a `lg`
 * (1024 px) los cinco nombres no caben, y esperar a `xl` (1280) dejaría sin navegación
 * visible a casi todos los portátiles.
 *
 * **Al añadir una sección hay que volver a medirlo**: un nombre más son unos 90 px, y con
 * seis secciones este número se queda corto.
 *
 * Por debajo de este ancho la barra es el logotipo y el botón, y las secciones viven
 * dentro del panel. No se pierde nada: el panel las lleva todas.
 */
const NAV_VISIBLE = "min-[1100px]:flex";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <path d="M4 4l12 12" />
          <path d="M16 4L4 16" />
        </>
      ) : (
        <>
          <path d="M2 5h16" />
          <path d="M2 10h16" />
          <path d="M2 15h16" />
        </>
      )}
    </svg>
  );
}

/**
 * La barra: logotipo, navegación y el botón de la derecha.
 *
 * Se pinta dos veces —una en la página y otra dentro del panel abierto— y por eso es un
 * componente y no dos trozos de JSX parecidos. La razón de que haya dos está en el
 * `<dialog>` de abajo.
 *
 * **El reparto es lo que centra la navegación.** El logotipo y el botón van cada uno en
 * una casilla `flex-1`, o sea que las dos miden exactamente lo mismo pase lo que pase, y
 * los cinco nombres quedan en el medio exacto de la barra. Es a propósito que no dependa
 * de que el botón mida lo mismo que el logotipo: el logotipo mide 199 px a 28 de alto y el
 * botón 172, y si el centrado dependiera de esa coincidencia estaría descentrado 13 px sin
 * que nadie lo hubiera decidido.
 */
function HeaderBar({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-x-8 px-6 py-2 md:px-16 md:py-5">
      <div className="flex flex-1 justify-start">
        {/*
          El logotipo es un dibujo, así que no lo lee ningún lector de pantalla: el SVG va
          oculto para ellos y el nombre del sitio viaja en el texto de al lado, escondido a
          la vista pero no al oído. El alto va a 20 px en móvil y 28 en escritorio porque
          el dibujo es siete veces más ancho que alto y cada píxel de alto le cuesta siete
          de ancho.
        */}
        <Link href="/" className="leading-none">
          <Logo className="h-5 w-auto md:h-7" />
          <span className="sr-only">Presunto Café · Volver a la portada</span>
        </Link>
      </div>

      <nav className={`hidden ${NAV_VISIBLE}`}>
        <ul className="flex gap-x-8">
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
                   * En la página de la propia sección el enlace es la página actual y va
                   * "page". Dentro de una ficha ya no lo es —es la sección que la
                   * contiene—, así que "page" ahí sería falso para quien navega con lector
                   * de pantalla; "true" significa el elemento actual dentro del grupo.
                   */
                  aria-current={
                    isCurrentPage ? "page" : isInSection ? "true" : undefined
                  }
                  /*
                   * El activo no se distingue solo por el color, que dejaría fuera a quien
                   * no lo percibe: lleva además un filete lavanda debajo. El inactivo
                   * reserva ese mismo filete en transparente para que al cambiar de sección
                   * la navegación no se mueva de sitio.
                   *
                   * El texto activo va en `ink` y no en lavanda porque son 12 px sobre
                   * `paper`, donde el lavanda no llega al contraste mínimo. En el filete sí
                   * vale: es un borde, no texto.
                   */
                  className={`block border-b-2 pb-1 font-mono text-xs uppercase tracking-widest hover:text-lavender-deep ${
                    isActive
                      ? "border-lavender text-ink"
                      : "border-transparent text-coffee"
                  }`}
                >
                  {seccion.nombre}
                  {/*
                    La marca de «en proceso». Un círculo hueco con un texto que solo se
                    oye, porque la marca no puede ser solo una forma ni solo un color:
                    dicho en voz alta, el enlace tiene que sonar «Recetas, en proceso».

                    Un círculo y no un asterisco, que prometería una nota al pie que no
                    existe. Y no la palabra entera, porque tres «EN PROCESO» en mono y
                    mayúsculas miden más que todos los nombres juntos. Va en `sage-deep`,
                    que a 12 px sobre crema da 5,3:1, y deja el lavanda para el filete de
                    la sección activa, que dice otra cosa.
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

      <div className="flex flex-1 justify-end">{children}</div>
    </div>
  );
}

/**
 * El botón que abre y cierra el panel.
 *
 * En móvil es el icono solo, con su nombre en un texto que únicamente se oye; desde `md`
 * se le añade la palabra y el borde, y mide 172 × 44. Ese ancho es el del hueco que dejó
 * el campo de búsqueda del diseño, que no se implementó: con quince piezas de contenido un
 * buscador no se justifica, y un campo que no busca nada es peor que no tenerlo.
 */
function MenuButton({
  open,
  controls,
  onClick,
  buttonRef,
}: {
  open: boolean;
  controls: string;
  onClick: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      className="flex h-11 w-11 items-center justify-center text-ink hover:text-lavender-deep md:w-43 md:gap-3 md:border md:border-ink md:hover:border-lavender-deep"
    >
      <MenuIcon open={open} />
      <span className="hidden font-mono text-xs uppercase tracking-widest md:inline">
        {open ? "Cerrar" : "Menú"}
      </span>
      <span className="sr-only md:hidden">
        {open ? "Cerrar el menú" : "Abrir el menú"}
      </span>
    </button>
  );
}

/**
 * Este componente es de cliente por dos razones.
 *
 * La primera es la de siempre: **mide su propia altura** y la publica en
 * `--site-header-height`, la variable que usa el panel del cronómetro para colocarse justo
 * debajo. No se puede saber desde el servidor —depende de la tipografía ya cargada y del
 * ancho de la ventana—, así que es medida de verdad y no un número copiado en dos sitios
 * que se desincroniza. Se mide con un observador de tamaño y no una sola vez al cargar,
 * para que el valor se actualice también al cambiar el ancho o al terminar de cargar la
 * letra.
 *
 * La segunda es el panel, que se abre y se cierra.
 */
export function SiteHeader({ menu }: { menu: MenuModel }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /*
   * Si al cerrar hay que devolver el foco al botón que abrió. Se cierra de cuatro
   * maneras y solo tres piden devolverlo: con Escape, con el botón de cerrar y pulsando
   * fuera, el foco vuelve al botón porque quien navega con teclado tiene que seguir donde
   * estaba. Al irse por un enlace, no: ahí el foco es de la página nueva, y devolverlo a
   * una cabecera que ya es de otra página sería dejar a esa persona en el sitio anterior.
   */
  const devolverFoco = useRef(true);
  const [open, setOpen] = useState(false);
  const panelId = useId();

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

  /*
   * Abrir con `showModal()` y no enseñando un div es lo que resuelve, sin escribir ni una
   * línea, tres de las cuatro cosas que pide un panel que se abre encima de la página: el
   * tabulador no sale de dentro, Escape lo cierra, y **todo lo que queda fuera deja de ser
   * alcanzable y deja de anunciarse al lector de pantalla**. Un atrapador de foco escrito a
   * mano acierta el caso normal y falla los raros.
   *
   * La cuarta —devolver el foco al botón— no la hace el navegador y está más abajo.
   *
   * Y el navegador no bloquea el desplazamiento de la página de detrás, así que eso se
   * hace aquí: sin ello, en el móvil se arrastra el menú y se mueve el contenido de abajo.
   */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      /*
       * El foco entra en el botón de cerrar y no en el logotipo, que es lo que elegiría el
       * navegador por ser lo primero: quien abre un menú con el teclado quiere poder
       * cerrarlo sin recorrerlo entero.
       */
      closeRef.current?.focus();
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }

    if (dialog.open) dialog.close();
  }, [open]);

  /*
   * Cerrar al cambiar de página. Hace falta porque la cabecera no se vuelve a montar al
   * navegar dentro del sitio: sin esto, al pulsar un enlace del panel la página de debajo
   * cambiaría y el menú seguiría abierto encima. Cubre también el botón de atrás del
   * navegador, que no pasa por ningún enlace nuestro.
   */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;

    /*
     * Se cierra el diálogo y no se toca el estado directamente: cerrarlo dispara su
     * propio `onClose`, que es quien apunta que ya no está abierto. Es además lo que pide
     * React —un efecto habla con el navegador, no se cambia el estado a sí mismo—, y aquí
     * coincide con lo correcto: el navegador es quien manda sobre si un diálogo modal
     * está abierto.
     */
    devolverFoco.current = false;
    dialog.close();
  }, [pathname]);

  /** Lo dispara Escape y también nuestro propio `dialog.close()`. */
  const handleClose = useCallback(() => {
    setOpen(false);
    if (devolverFoco.current) triggerRef.current?.focus();
    devolverFoco.current = true;
  }, []);

  /*
   * Pulsar fuera del menú lo cierra. El `<dialog>` ocupa la pantalla entera y el menú es
   * un hijo suyo, así que «fuera» es exactamente que el clic haya caído en el propio
   * diálogo y no en nada de dentro.
   */
  const handleBackdrop = useCallback((event: React.MouseEvent) => {
    if (event.target === dialogRef.current) dialogRef.current?.close();
  }, []);

  return (
    <>
      {/*
        En escritorio la cabecera se queda arriba al hacer scroll y en móvil sube con la
        página: abajo ya está la barra fija del cronómetro y dos elementos fijos dejarían
        la pantalla del teléfono sin sitio para leer.

        Va `sticky` y no `fixed` a propósito. Una cabecera fija se sale del flujo y deja el
        contenido metido debajo, que hay que compensar con un hueco del alto exacto; una
        pegajosa conserva su sitio. El fondo `paper` impide que el contenido se transparente
        por detrás, y `z-20` la deja por encima del panel del cronómetro, que va en `z-10`.
      */}
      <header
        ref={headerRef}
        className="relative z-20 bg-paper md:sticky md:top-0"
      >
        <HeaderBar pathname={pathname}>
          <MenuButton
            open={open}
            controls={panelId}
            onClick={() => setOpen(true)}
            buttonRef={triggerRef}
          />
        </HeaderBar>
      </header>

      {/*
        El panel.

        **Lleva su propia barra, y esa es la consecuencia de abrirlo como modal.** Al estar
        en la capa superior, la barra de la página que queda detrás deja de poder pulsarse
        —es lo que hace que el resto no sea navegable—, y el botón de cerrar está
        justamente ahí. Así que la barra se pinta otra vez dentro, con la misma medida, y
        cae exactamente encima de la de abajo: quien mira no ve que haya dos. Para el
        lector de pantalla tampoco las hay, porque lo de fuera está callado mientras esto
        esté abierto.

        El fondo de detrás no se oscurece. Sigue cerrando al pulsarlo, pero oscurecer la
        página chocaría con la regla del sitio de que aquí no hay fondos oscuros salvo en
        /sin-conexion, donde el fondo es el mensaje.
      */}
      <dialog
        ref={dialogRef}
        id={panelId}
        data-site-menu=""
        aria-label="Menú del sitio"
        onClose={handleClose}
        onClick={handleBackdrop}
        className="m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-transparent p-0 text-ink backdrop:bg-transparent"
      >
        {/*
          En móvil ocupa la pantalla entera; en escritorio, solo lo que mide.

          El filete de abajo solo existe en escritorio, y hace falta: ahí el panel acaba a
          media pantalla y debajo se sigue viendo la página, que es del mismo crema. Sin
          una línea que diga dónde termina el menú, las dos cosas se leen como una sola y
          el contenido de detrás aparece cortado por la mitad sin motivo aparente. Se
          resuelve con un borde fino y no oscureciendo el fondo, que es lo que haría
          cualquier otro sitio: aquí los fondos oscuros están descartados salvo en
          /sin-conexion, donde el fondo es el mensaje.
        */}
        <div className="min-h-full bg-paper md:min-h-0 md:border-b md:border-dust">
          <HeaderBar pathname={pathname}>
            <MenuButton
              open
              controls={panelId}
              onClick={() => dialogRef.current?.close()}
              buttonRef={closeRef}
            />
          </HeaderBar>

          <SiteMenuPanel menu={menu} />
        </div>
      </dialog>
    </>
  );
}
