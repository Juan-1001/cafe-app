"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CUTOUT_QUALITY } from "./quality";

/**
 * Lo que la rejilla necesita de cada receta, ya resuelto en el servidor (la foto ya
 * comprobada en disco). Plano porque este componente baja al navegador.
 */
export type RecipeCard = {
  slug: string;
  name: string;
  tagline: string;
  temperature: "caliente" | "fria";
  family: "espresso" | "filtrado" | null;
  /** «Fría · Espresso · 4 min», ya compuesto. */
  meta: string;
  image: { src: string | null; alt: string };
};

type Tone = "dust" | "lavender" | "ink";

/**
 * Contraste del texto pequeño: `coffee` sobre `dust` da 6,8:1; `ink` sobre `lavender`,
 * 4,8:1; `paper` sobre `ink`, 15,3:1. Las tres pasan AA.
 *
 * La de `ink` es una excepción declarada a la regla de no usar fondos oscuros, decidida
 * al pasar este diseño (ver «Antipatrones visuales» en CLAUDE.md).
 */
const TONE_CLASSES: Record<Tone, { card: string; meta: string; title: string; text: string }> = {
  dust: { card: "bg-dust", meta: "text-coffee", title: "text-ink", text: "text-coffee" },
  lavender: { card: "bg-lavender", meta: "text-ink", title: "text-ink", text: "text-ink" },
  ink: { card: "bg-ink", meta: "text-paper", title: "text-paper", text: "text-paper" },
};

/**
 * Dónde cae el recorte de la foto dentro de su casilla, en px: distancia a un borde
 * horizontal —arriba o abajo— y a uno vertical —derecha o izquierda—, según de dónde
 * cuelgue el recorte en el diseño, y ancho. El alto es el de la proporción del archivo y
 * solo sirve para reservar el hueco mientras carga. Un desplazamiento negativo es un
 * recorte que se sale de la casilla y queda cortado por ella, como en el diseño.
 */
type Cutout = { width: number; height: number } & (
  | { top: number; bottom?: never }
  | { bottom: number; top?: never }
) &
  ({ right: number; left?: never } | { left: number; right?: never });

/** Cómo va una receta en una de las dos rejillas compuestas. */
type Slot = {
  tone: Tone;
  /** Título a 48 px, como en la casilla alta y en la fila de abajo del diseño. */
  large?: boolean;
  textAtBottom?: boolean;
  /** Texto centrado en vertical, como el espresso tonic del diseño de móvil. */
  textCentered?: boolean;
  /** Ancho del título cuando el diseño lo parte: «Cold brew» / «con naranja». */
  titleWidth?: number;
  /** Ancho de la entradilla cuando el diseño la estrecha para no pisar el recorte. */
  textWidth?: number;
  /**
   * Margen izquierdo del texto, para la casilla que lleva el recorte a la izquierda (el
   * cortado del diseño de móvil). En porcentaje de la casilla, que es como lo dibuja el
   * diseño: el texto empieza en el 44 % del ancho.
   */
  textInset?: string;
  /** Alto mínimo de la casilla, en las de móvil (ver `MOBILE`). */
  minHeight?: number;
  /** Relleno de la casilla en px, cuando no es el de 8 de las casillas de móvil. */
  padding?: number;
  cutout: Cutout;
};

/**
 * Las siete casillas de la rejilla de escritorio del diseño «Recetas — bento», en orden.
 *
 * Cada casilla lleva su color y su recorte medidos en Figma: el sitio del recorte se
 * calculó con la caja de la imagen en el diseño y el contorno del objeto dentro del
 * PNG, y se redondeó a múltiplos de 4. **Las medidas son de esa foto en esa casilla**:
 * van por posición, igual que el color, así que cambiar el orden de `recipes` o la foto
 * de una receta obliga a medir otra vez. Lo mismo vale para `MOBILE`.
 */
const BENTO: Slot[] = [
  { tone: "dust", large: true, cutout: { top: 224, right: 28, width: 216, height: 511 } },
  { tone: "dust", cutout: { top: 172, right: -140, width: 364, height: 259 } },
  {
    tone: "dust",
    textAtBottom: true,
    titleWidth: 240,
    textWidth: 312,
    cutout: { top: 28, right: -72, width: 256, height: 294 },
  },
  {
    tone: "lavender",
    textWidth: 416,
    cutout: { top: 164, right: -20, width: 252, height: 202 },
  },
  { tone: "dust", cutout: { top: 184, right: -32, width: 256, height: 229 } },
  {
    tone: "dust",
    large: true,
    textWidth: 348,
    cutout: { top: 80, right: -44, width: 276, height: 259 },
  },
  {
    tone: "ink",
    large: true,
    textWidth: 324,
    cutout: { top: 52, right: 32, width: 212, height: 312 },
  },
];

/**
 * Las mismas siete recetas en la composición del diseño de móvil: el espresso tonic a
 * lo ancho; affogato y cold brew en dos columnas; tinto y cortado a lo ancho y bajos, y
 * perico y moka en dos columnas.
 *
 * Los recortes se midieron sobre una captura del diseño (el conector de Figma no
 * respondía) y se ajustaron mirando la página, así que son menos exactos que los de
 * `BENTO`. Van anclados al lado del que cuelgan en el diseño —derecha o izquierda—
 * porque las casillas del sitio son unos 40 px más estrechas que las del diseño, que
 * dibuja la página con márgenes de 16 y no de 24.
 *
 * `minHeight` es el alto del diseño. Es mínimo y no fijo para que, si el texto no cabe,
 * la casilla crezca en vez de cortar una línea; por eso los recortes que en el diseño
 * asoman por abajo van anclados al borde de abajo, y la casilla les reserva abajo lo
 * que se ve de ellos: si el texto no cabe encima, la casilla crece y el recorte baja
 * con ella en vez de quedarse encima del texto. Hace falta en la moka, cuya entradilla
 * es más larga que la del diseño.
 *
 * El relleno es de 8 px, como en el diseño, salvo en el espresso tonic, que lleva 16.
 */
const MOBILE: (Slot & { wide: boolean })[] = [
  {
    tone: "dust",
    wide: true,
    minHeight: 256,
    textCentered: true,
    padding: 16,
    textWidth: 180,
    cutout: { top: 16, right: 16, width: 96, height: 227 },
  },
  {
    tone: "dust",
    wide: false,
    minHeight: 300,
    cutout: { bottom: -40, left: 40, width: 240, height: 171 },
  },
  {
    tone: "dust",
    wide: false,
    minHeight: 300,
    cutout: { bottom: -36, right: 4, width: 132, height: 151 },
  },
  {
    tone: "lavender",
    wide: true,
    minHeight: 144,
    textWidth: 196,
    cutout: { top: 16, right: -52, width: 148, height: 119 },
  },
  {
    tone: "dust",
    wide: true,
    minHeight: 144,
    textInset: "44%",
    cutout: { bottom: -84, left: -88, width: 208, height: 186 },
  },
  {
    tone: "dust",
    wide: false,
    minHeight: 276,
    cutout: { bottom: -48, left: 60, width: 148, height: 139 },
  },
  {
    tone: "ink",
    wide: false,
    minHeight: 276,
    cutout: { bottom: -28, right: 8, width: 96, height: 141 },
  },
];

/**
 * Una casilla de receta: color de fondo, el texto y el recorte de la foto sin fondo,
 * que se puede salir por los bordes y queda cortado por la casilla.
 *
 * Con `slot` el recorte va donde lo pone el diseño; sin él (la rejilla regular de los
 * anchos intermedios y de los filtros) va abajo a la derecha, en la mitad inferior de
 * la casilla. El texto va por encima del recorte, para que donde se crucen gane la
 * lectura.
 *
 * `compact` son los tamaños del diseño de móvil: relleno de 8 px, etiqueta a 10,
 * título a 24 y entradilla a 13. El diseño dibuja el título a 28; con la Fraunces del
 * sitio, que mide un 15 % más (ver «Pendientes conocidos» en CLAUDE.md), 24 es lo que
 * deja «con naranja» en una línea de la casilla estrecha.
 */
function Card({
  recipe,
  tone,
  slot,
  compact = false,
}: {
  recipe: RecipeCard;
  tone: Tone;
  slot?: Slot;
  compact?: boolean;
}) {
  const colors = TONE_CLASSES[tone];
  const cutout = slot?.cutout;
  // Lo que se ve de un recorte anclado abajo, más el hueco de 8 hasta el texto. La
  // casilla del cortado no lo necesita: su texto va a un lado del recorte, no encima.
  const reserve =
    cutout?.bottom !== undefined && !slot?.textInset
      ? cutout.height + cutout.bottom + 8
      : undefined;
  const align = slot?.textAtBottom
    ? "justify-end"
    : slot?.textCentered
      ? "justify-center"
      : "";

  return (
    <Link
      href={`/recetas/${recipe.slug}`}
      className={`group relative flex h-full flex-col gap-2 overflow-hidden rounded-[2px] ${
        compact ? "p-2" : "p-4"
      } ${align} ${colors.card}`}
      style={{
        padding: slot?.padding,
        paddingLeft: slot?.textInset,
        paddingBottom: reserve,
        minHeight: slot?.minHeight,
      }}
    >
      {recipe.image.src ? (
        cutout ? (
          <Image
            src={recipe.image.src}
            alt={recipe.image.alt}
            width={cutout.width}
            height={cutout.height}
            sizes={`${cutout.width}px`}
            quality={CUTOUT_QUALITY}
            className="pointer-events-none absolute max-w-none"
            style={{
              top: cutout.top,
              bottom: cutout.bottom,
              left: cutout.left,
              right: cutout.right,
              width: cutout.width,
              height: "auto",
            }}
          />
        ) : (
          <div className="pointer-events-none absolute right-4 bottom-0 h-1/2 w-3/5">
            <Image
              src={recipe.image.src}
              alt={recipe.image.alt}
              fill
              sizes="(min-width: 768px) 25vw, 60vw"
              quality={CUTOUT_QUALITY}
              className="object-contain object-right-bottom"
            />
          </div>
        )
      ) : null}

      <p
        className={`relative font-mono uppercase tracking-[0.08em] ${
          compact ? "text-[10px]" : "text-[11px]"
        } ${colors.meta}`}
      >
        {recipe.meta}
      </p>

      <h3
        className={`relative font-display leading-[1.12] tracking-[-0.01em] group-hover:underline group-hover:underline-offset-4 ${colors.title} ${
          compact ? "text-2xl" : slot?.large ? "text-5xl" : "text-[40px]"
        }`}
        style={slot?.titleWidth ? { maxWidth: slot.titleWidth } : undefined}
      >
        {recipe.name}
      </h3>

      <p
        className={`relative leading-[1.6] ${compact ? "text-[13px]" : "text-[15px]"} ${colors.text}`}
        style={slot?.textWidth ? { maxWidth: slot.textWidth } : undefined}
      >
        {recipe.tagline}
      </p>
    </Link>
  );
}

/** Un botón de filtro, con la forma de las etiquetas del diseño. */
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-[2px] border px-5 py-3 font-mono text-sm uppercase tracking-[0.08em] whitespace-nowrap ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-dust text-coffee hover:border-coffee"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * El mismo filtro en móvil: un desplegable, como en el diseño. Es un `<select>` del
 * navegador, así que el teclado, el lector de pantalla y la lista que abre el teléfono
 * son los suyos y no hay que escribirlos.
 *
 * Lo que se ve no es el `<select>` sino una etiqueta con la opción elegida, y el
 * `<select>` va encima, transparente, recibiendo el toque. Es por el ancho: un
 * `<select>` mide lo que su opción más larga, así que «Todas» ocupaba lo mismo que «A
 * base de filtrados» y empujaba al otro desplegable fuera de la pantalla. La etiqueta
 * mide lo que dice, como en el diseño.
 */
function Dropdown<T>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  const selected = options.findIndex((option) => option.value === value);

  return (
    <div className="relative flex items-center gap-3 rounded-[2px] bg-ink py-3 pr-4 pl-4 font-mono text-sm uppercase tracking-[0.08em] whitespace-nowrap text-paper focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-lavender-deep">
      <span aria-hidden="true">{options[selected].label}</span>
      <select
        aria-label={label}
        value={selected}
        onChange={(event) => onChange(options[Number(event.target.value)].value)}
        className="absolute inset-0 cursor-pointer appearance-none opacity-0"
      >
        {options.map((option, index) => (
          <option key={option.label} value={index}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none size-4 shrink-0"
      >
        <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

type Temperature = "caliente" | "fria" | null;
type Family = "espresso" | "filtrado" | null;

const TEMPERATURES: { value: Temperature; label: string }[] = [
  { value: null, label: "Caliente y frío" },
  { value: "caliente", label: "Calientes" },
  { value: "fria", label: "Frías" },
];

const FAMILIES: { value: Family; label: string }[] = [
  { value: null, label: "Todas" },
  { value: "espresso", label: "A base de espresso" },
  { value: "filtrado", label: "A base de filtrados" },
];

/**
 * Los filtros, el recuento y la rejilla.
 *
 * Sin filtros, la rejilla es la del diseño, una en escritorio y otra en móvil. Esas
 * composiciones están pensadas para siete recetas en su orden; con un filtro puesto ya
 * no se pueden respetar —quedarían casillas vacías con su hueco—, así que las que
 * quedan van en una rejilla regular. El color de cada receta va con ella en todas: la
 * que vive en la casilla lavanda sigue siendo lavanda al filtrar, para que el color no
 * cambie de dueño al pulsar un botón.
 *
 * Qué rejilla se ve, según el ancho y sin filtro:
 *
 * - **Hasta 767 px, la de móvil.** Es la del diseño de móvil, que se dibujó a 400.
 * - **De 768 a 1439, la regular** en dos o tres columnas. Ninguno de los dos diseños
 *   aguanta ahí: el de móvil estira a 640 px casillas pensadas para 371 y las tumba, y
 *   el de escritorio mete los recortes bajo el texto (ver más abajo).
 * - **Desde 1440, la de escritorio.**
 *
 * Las tres se alternan con `hidden`, que las saca del árbol de accesibilidad: el lector
 * de pantalla solo encuentra una.
 */
export function RecipeIndex({ recipes }: { recipes: RecipeCard[] }) {
  const [temperature, setTemperature] = useState<Temperature>(null);
  const [family, setFamily] = useState<Family>(null);

  const toneOf = (recipe: RecipeCard) =>
    BENTO[recipes.indexOf(recipe) % BENTO.length].tone;

  const visible = recipes.filter(
    (recipe) =>
      (temperature === null || recipe.temperature === temperature) &&
      (family === null || recipe.family === family),
  );
  const unfiltered = temperature === null && family === null;
  const composed = unfiltered && recipes.length === BENTO.length;

  const bento = (index: number) => (
    <Card recipe={recipes[index]} tone={BENTO[index].tone} slot={BENTO[index]} />
  );

  return (
    <>
      {/* Móvil: los dos desplegables del diseño, la base a la izquierda. */}
      <div className="flex items-center justify-between gap-4 md:hidden">
        <Dropdown
          label="Filtrar por base"
          options={FAMILIES}
          value={family}
          onChange={setFamily}
        />
        <Dropdown
          label="Filtrar por temperatura"
          options={TEMPERATURES}
          value={temperature}
          onChange={setTemperature}
        />
      </div>

      {/* Desde 768: las etiquetas. En una fila desde 1280, que es cuando caben las seis. */}
      <div className="hidden flex-col gap-4 md:flex xl:flex-row xl:items-center xl:justify-between">
        <div role="group" aria-label="Filtrar por base" className="flex flex-wrap gap-2">
          {FAMILIES.map((option) => (
            <Chip
              key={option.label}
              active={family === option.value}
              onClick={() => setFamily(option.value)}
            >
              {option.label}
            </Chip>
          ))}
        </div>

        <div
          role="group"
          aria-label="Filtrar por temperatura"
          className="flex flex-wrap gap-2"
        >
          {TEMPERATURES.map((option) => (
            <Chip
              key={option.label}
              active={temperature === option.value}
              onClick={() => setTemperature(option.value)}
            >
              {option.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-end justify-between gap-6">
        <h2 className="font-display text-2xl leading-[0.96] tracking-[-0.025em] text-ink md:text-4xl">
          Escoge una receta
        </h2>

        {/* El recuento se anuncia al cambiar de filtro: es la única señal, para quien
            no ve la rejilla, de que el filtro ha hecho algo. */}
        <p aria-live="polite" className="flex items-end font-mono text-coffee">
          <span className="text-2xl leading-none tracking-[0.1em] md:text-[40px]">
            {String(visible.length).padStart(2, "0")}
          </span>
          <span className="pb-1 text-[11px] uppercase tracking-[0.1em] md:text-xs">
            {visible.length === 1 ? "receta" : "recetas"}
          </span>
        </p>
      </div>

      {composed ? (
        <ul className="mt-12 grid grid-cols-2 gap-4 md:hidden">
          {recipes.map((recipe, index) => {
            const slot = MOBILE[index];
            return (
              <li key={recipe.slug} className={slot.wide ? "col-span-2" : undefined}>
                <Card recipe={recipe} tone={slot.tone} slot={slot} compact />
              </li>
            );
          })}
        </ul>
      ) : null}

      {/*
        La rejilla de escritorio empieza en 1440 px, el ancho del diseño: los recortes
        están medidos para casillas de ese tamaño. Medido a 1280, las casillas anchas se
        estrechan unos 135 px, los recortes se meten bajo el texto y la entradilla del
        cold brew queda escrita encima de la naranja. Las columnas son las de Figma:
        tres iguales, la alta ocupa una y el bloque de la derecha dos; dentro, las
        casillas cuadradas miden 328 (330 en el diseño) y las anchas se llevan el resto.
      */}
      {composed ? (
        <div className="mt-12 hidden flex-col gap-4 min-[1440px]:flex">
          <div className="grid h-169 grid-cols-3 gap-4">
            {bento(0)}

            <div className="col-span-2 grid grid-rows-2 gap-4">
              <div className="grid grid-cols-[328px_minmax(0,1fr)] gap-4">
                {bento(1)}
                {bento(2)}
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_328px] gap-4">
                {bento(3)}
                {bento(4)}
              </div>
            </div>
          </div>

          <div className="grid h-76 grid-cols-2 gap-4">
            {bento(5)}
            {bento(6)}
          </div>
        </div>
      ) : null}

      {visible.length > 0 ? (
        // Sin filtro, esta rejilla solo existe entre 768 y 1439. Se esconde el
        // contenedor y no la lista, y con dos `hidden` y no con `hidden md:block`,
        // porque `min-[1440px]:hidden` pierde contra cualquier `md:` que muestre:
        // Tailwind ordena antes las variantes de ancho escritas a mano que las de
        // nombre, y gana la que va después.
        <div
          className={
            composed ? "max-md:hidden min-[1440px]:hidden" : undefined
          }
        >
          <ul className="mt-12 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {visible.map((recipe) => (
              <li key={recipe.slug} className="h-105">
                <Card recipe={recipe} tone={toneOf(recipe)} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-12 max-w-[52ch] border-t border-dust pt-6 text-base text-coffee">
          Todavía no hay ninguna receta con esa combinación. Prueba a quitar uno de los
          dos filtros.
        </p>
      )}
    </>
  );
}
