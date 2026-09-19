import Image from "next/image";
import Link from "next/link";
import type { MenuModel, MenuSection } from "@/content/menu/model";

/**
 * El contenido del panel del menú: las cinco secciones del sitio y lo que se puede
 * abrir dentro de cada una sin pasar por su índice.
 *
 * ## La composición, y por qué no es exactamente la del diseño
 *
 * El diseño de Figma parte el panel en dos: la fila de fotos a la izquierda y, a la
 * derecha, unas columnas de enlaces que agrupaban taxonomías —métodos por nivel, métodos
 * por familia, cafés por barrio, productores por región—. Esas taxonomías no existen como
 * página y se quedaron fuera, así que la mitad derecha se quedaba con dos listas sueltas
 * y el vínculo entre una lista y su sección pasaba a ser solo que se llaman igual.
 *
 * Aquí **la lista de cada sección va debajo de su propia foto**. Se gana lo obvio —que se
 * vea de quién es cada lista— y se gana una cosa que no lo es tanto: **es la misma
 * composición en los dos anchos**. Las tres secciones con foto son tres columnas en
 * escritorio y tres filas apiladas en el móvil, que es exactamente lo que dibuja el diseño
 * de móvil. Con el reparto izquierda/derecha habría que escribir los enlaces dos veces,
 * una en cada sitio, y esconder la que no tocara.
 *
 * Lo que sí se conserva del diseño es el peso: las fotos juntas a la izquierda ocupando la
 * mayor parte del ancho, y el texto a la derecha.
 *
 * ## Quién sale con foto y quién no
 *
 * No lo decide este componente ni un campo que lo diga: lo decide si la sección tiene
 * fotografía en el registro. El porqué está en `src/content/menu/model.ts`.
 */

/** Las secciones sin foto se anuncian bajo este rótulo, para que el hueco no sorprenda. */
const ROTULO_RESTO = "En construcción";

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-coffee md:hidden"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

/**
 * La foto de una sección, o el bloque de color si el archivo todavía no está.
 *
 * La caja mide lo mismo en los dos casos, que es lo que hace que la página no dé un salto
 * el día que se guarde la foto. Va con `object-contain` porque estas imágenes llevan
 * transparencia y se apoyan directamente sobre el crema, sin caja ni tarjeta: recortarlas
 * para rellenar un rectángulo les comería la silueta, que es justo lo que se mira.
 */
function SectionPhoto({ section }: { section: MenuSection }) {
  const caja = "h-15 w-14 shrink-0 md:h-25 md:w-24";

  if (!section.imagen?.src) {
    return <div className={`${caja} bg-dust`} aria-hidden="true" />;
  }

  return (
    <Image
      src={section.imagen.src}
      alt={section.imagen.alt}
      width={97}
      height={100}
      sizes="(min-width: 768px) 96px, 56px"
      className={`${caja} object-contain`}
    />
  );
}

/**
 * Los enlaces que abren algo dentro de una sección.
 *
 * Van en una lista de verdad y no en una fila de enlaces sueltos: para quien navega con
 * lector de pantalla, «lista de cuatro elementos» es la diferencia entre saber cuánto hay
 * ahí dentro y tener que recorrerlo para averiguarlo.
 */
function SectionLinks({ section }: { section: MenuSection }) {
  if (section.enlaces.length === 0) return null;

  return (
    <ul className="mt-3 space-y-1 border-l border-dust pl-4 md:mt-5 md:border-l-0 md:pl-0">
      {section.enlaces.map((enlace) => (
        <li key={enlace.href}>
          <Link
            href={enlace.href}
            className="block py-1 text-sm text-coffee hover:text-lavender-deep"
          >
            {enlace.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Una sección con foto: la imagen, el nombre y cuánto hay dentro.
 *
 * En móvil es una fila —foto a la izquierda, texto al lado— y en escritorio una columna
 * con la foto arriba. Es lo único que cambia de un ancho a otro, y cambia porque a 375 px
 * tres columnas de foto medirían 109 px cada una.
 */
function FeaturedSection({ section }: { section: MenuSection }) {
  return (
    <div>
      <Link
        href={section.href}
        className="group flex items-center gap-4 md:block"
      >
        <SectionPhoto section={section} />

        <span className="min-w-0 flex-1 md:mt-4 md:block">
          <span className="block font-display text-xl group-hover:text-lavender-deep md:text-2xl">
            {section.nombre}
          </span>
          {/*
            La línea pequeña dice cuánto hay dentro, o que la sección está en proceso. La
            palabra escrita entera y no el círculo hueco de la cabecera: el círculo existe
            allí porque en una navegación de cinco tramos en mono no cabe «EN PROCESO»
            cinco veces, y aquí sí cabe. Donde cabe la palabra, va la palabra.
          */}
          <span className="mt-1 block font-mono text-xs text-coffee">
            {section.cuenta}
          </span>
        </span>

        <ChevronRight />
      </Link>

      <SectionLinks section={section} />
    </div>
  );
}

export function SiteMenuPanel({ menu }: { menu: MenuModel }) {
  return (
    /* El aire de arriba y el de abajo miden lo mismo en móvil: el panel no tiene por qué
       dejar más cola después del último enlace que cabecera antes del primero. */
    <div className="border-t border-dust px-6 py-8 md:px-16 md:pt-11 md:pb-16">
      <div className="md:flex md:gap-16">
        {/*
          Las secciones con foto. En escritorio son columnas de igual ancho y en móvil
          filas apiladas, separadas por un filete finísimo para que las listas de una no
          se lean como el principio de la siguiente.
        */}
        <div className="divide-y divide-dust md:flex md:flex-1 md:gap-8 md:divide-y-0">
          {menu.destacadas.map((section) => (
            <div
              key={section.slug}
              className="py-6 first:pt-0 last:pb-0 md:flex-1 md:py-0"
            >
              <FeaturedSection section={section} />
            </div>
          ))}
        </div>

        {/*
          Las que todavía no tienen nada dentro. Van juntas y bajo su propio rótulo, no
          mezcladas con las demás: así el menú enseña las cinco secciones del sitio sin
          prometer que en las cinco hay algo que leer.

          En móvil las separa del bloque de arriba la misma distancia que separa dos
          secciones con foto entre sí: 24 y 24.
        */}
        {menu.resto.length > 0 ? (
          <div className="mt-6 border-t border-dust pt-6 md:mt-0 md:w-48 md:border-t-0 md:pt-0">
            <h2 className="font-mono text-xs uppercase tracking-widest text-sage-deep">
              {ROTULO_RESTO}
            </h2>

            <ul className="mt-4 space-y-3">
              {menu.resto.map((section) => (
                <li key={section.slug}>
                  {/*
                    Aquí no se repite «En proceso» debajo de cada nombre, aunque sea lo
                    que dice su `cuenta`: el rótulo de arriba ya lo ha dicho para las dos,
                    y escribirlo otra vez en cada línea es decir dos veces lo mismo. En
                    los destacados sí va, porque allí no hay rótulo que lo diga.
                  */}
                  <Link
                    href={section.href}
                    className="block py-1 font-display text-lg hover:text-lavender-deep"
                  >
                    {section.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
